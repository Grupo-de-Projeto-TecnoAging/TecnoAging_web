'use client';

import React, { useEffect, useState } from 'react';
import TopInfoCards from "@/components/pages/homePacient/TopInfoCards";
import PatientBarChart from "@/components/pages/homePacient/PatientBarChart";
import Indicators from "@/components/pages/homePacient/Indicators";
import EvaluationActivityCard from "@/components/pages/homePacient/EvaluationActivityCard";
import { useSession } from "next-auth/react";
import { api } from "@/services/apiEvaluations";
import { api as apiPerson } from "@/services/apiPerson";

export default function HomePacientContent() {
    const { data: session } = useSession();
    const [evaluations, setEvaluations] = useState([]);
    const [evaluationsByMonth, setEvaluationsByMonth] = useState(Array(12).fill(0));
    const [tempoTotal, setTempoTotal] = useState('0s');
    const [mediaDuracao, setMediaDuracao] = useState('0s');
    const [classificacaoGeral, setClassificacaoGeral] = useState('N/A');
    const [variacaoAvaliacoes, setVariacaoAvaliacoes] = useState(0);
    const [variacaoTempo, setVariacaoTempo] = useState(0);
    const [countTUG, setCountTUG] = useState(0);
    const [count5TSTS, setCount5TSTS] = useState(0);
    const [recentSeries, setRecentSeries] = useState({ tug: [], fiveTsts: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const cpf = session?.user?.cpf;
            if (!cpf) return;

            try {
                const [evals, person] = await Promise.all([
                    api.getEvaluationsByPersonCpf(cpf),
                    apiPerson.getPerfilByCpf(`patient/${cpf}`),
                ]);

                let tug = 0, five = 0;
                evals.forEach(ev => {
                    if (ev.type === 'TUG') tug++;
                    if (ev.type === '5TSTS') five++;
                });
                setCountTUG(tug);
                setCount5TSTS(five);
                setEvaluations(evals);

                const mediaTug = calcularMediaMensalPorTipo(evals, 'TUG');
                const media5sts = calcularMediaMensalPorTipo(evals, '5TSTS');
                setRecentSeries({ tug: mediaTug, fiveTsts: media5sts });

                const counts = Array(12).fill(0);
                let totalSegundos = 0;
                const classificacoes = [];
                const now = new Date();

                evals.forEach(ev => {
                    const date = new Date(ev.date);
                    const month = date.getMonth();
                    counts[month]++;
                    const tempo = tempoStringParaSegundos(ev.totalTime);
                    totalSegundos += tempo;

                    const idade = calcularIdadeAnos(person.dateOfBirth, ev.date);
                    const classificacao = classificarTempoPorIdade(tempo, idade, ev.type);
                    classificacoes.push({ mes: month, classificacao });
                });

                setEvaluationsByMonth(counts);

                const tempoFormatado = totalSegundos >= 60
                    ? `${Math.round(totalSegundos / 60)} min`
                    : `${totalSegundos} s`;
                setTempoTotal(tempoFormatado);

                const mediaSegundos = evals.length ? totalSegundos / evals.length : 0;
                setMediaDuracao(`${mediaSegundos.toFixed(1)}s`);

                // Classificação do último mês
                const mesAtual = now.getMonth();
                const classificacoesMes = classificacoes.filter(c => c.mes === mesAtual);

                const classificacaoFinal = classificarDesempenhoGeral(classificacoesMes.map(c => c.classificacao));
                setClassificacaoGeral(classificacaoFinal);

                // Cálculo de variações
                const avaliacoesMesAtual = counts[mesAtual];
                const avaliacoesMesAnterior = counts[mesAtual - 1] || 0;
                const variacaoAval = avaliacoesMesAnterior > 0
                    ? (((avaliacoesMesAtual - avaliacoesMesAnterior) / avaliacoesMesAnterior) * 100).toFixed(0)
                    : 0;
                setVariacaoAvaliacoes(Number(variacaoAval));

                const tempoMesAtual = evals.filter(ev => new Date(ev.date).getMonth() === mesAtual)
                    .reduce((acc, ev) => acc + tempoStringParaSegundos(ev.totalTime), 0);
                const tempoMesAnterior = evals.filter(ev => new Date(ev.date).getMonth() === (mesAtual - 1))
                    .reduce((acc, ev) => acc + tempoStringParaSegundos(ev.totalTime), 0);
                const variacaoTempoCalc = tempoMesAnterior > 0
                    ? (((tempoMesAtual - tempoMesAnterior) / tempoMesAnterior) * 100).toFixed(0)
                    : 0;
                setVariacaoTempo(Number(variacaoTempoCalc));

                setLoading(false);
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                setLoading(false);
            }
        }

        fetchData();
    }, [session?.user?.cpf]);

    function calcularMediaMensalPorTipo(evals, tipo) {
        const soma = Array(12).fill(0);
        const cont = Array(12).fill(0);

        evals.forEach(ev => {
            if (ev.type === tipo) {
                const mes = new Date(ev.date).getMonth();
                soma[mes] += tempoStringParaSegundos(ev.totalTime);
                cont[mes]++;
            }
        });

        return soma.map((total, i) => cont[i] ? parseFloat((total / cont[i]).toFixed(1)) : 0);
    }

    // === Funções auxiliares ===
    function tempoStringParaSegundos(tempoStr) {
        const parts = tempoStr.split(':').map(Number);
        if (parts.length === 3) {
            const [h, m, s] = parts;
            if (h === 0 && s === 0) return m;
            return h * 3600 + m * 60 + s;
        }
        return 0;
    }

    function calcularIdadeAnos(nascimento, dataRef) {
        const nasc = new Date(nascimento);
        const ref = new Date(dataRef);
        let idade = ref.getFullYear() - nasc.getFullYear();
        const m = ref.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && ref.getDate() < nasc.getDate())) idade--;
        return idade;
    }

    function classificarTempoPorIdade(tempo, idade, tipo) {
        const tabela = [
            { faixa: [20, 29], TUG: [6.0, 0.9], T5STS: [8.5, 1.1] },
            { faixa: [30, 39], TUG: [6.2, 1.0], T5STS: [9.1, 1.2] },
            { faixa: [40, 49], TUG: [6.5, 1.1], T5STS: [9.9, 1.5] },
            { faixa: [50, 59], TUG: [6.7, 1.2], T5STS: [10.7, 1.6] },
            { faixa: [60, 69], TUG: [8.5, 1.2], T5STS: [11.4, 2.1] },
            { faixa: [70, 79], TUG: [9.8, 1.4], T5STS: [13.6, 2.4] },
            { faixa: [80, 200], TUG: [11.5, 2.0], T5STS: [15.9, 3.0] }
        ];

        const ref = tabela.find(r => idade >= r.faixa[0] && idade <= r.faixa[1]);
        if (!ref) return 'Desconhecido';

        const [media, desvio] = tipo === 'TUG' ? ref.TUG : ref.T5STS;

        if (tempo <= media - desvio) return 'Excelente';
        if (tempo <= media + desvio) return 'Bom';
        if (tempo <= media + 2 * desvio) return 'Regular';
        return 'Crítico';
    }

    function classificarDesempenhoGeral(lista) {
        const pesos = {
            'Excelente': 5,
            'Bom': 4,
            'Regular': 3,
            'Ruim': 2,
            'Crítico': 1
        };

        if (!lista.length) return 'N/A';

        const media = lista.reduce((acc, item) => acc + (pesos[item] || 0), 0) / lista.length;

        if (media >= 4.6) return 'Excelente';
        if (media >= 3.6) return 'Bom';
        if (media >= 2.6) return 'Regular';
        if (media >= 1.6) return 'Ruim';
        return 'Crítico';
    }

    if (loading)
        return (
            <div className="grid grid-cols-12 gap-4 md:gap-6 animate-pulse">
                <div className="col-span-12 space-y-6 xl:col-span-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-24 rounded-xl bg-gray-200 dark:bg-gray-700" />
                        ))}
                    </div>
                </div>

                <div className="col-span-12 xl:col-span-12">
                    <div className="h-100 rounded-xl bg-gray-200 dark:bg-gray-700" />
                </div>

                <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-80 rounded-xl bg-gray-200 dark:bg-gray-700" />
                    <div className="h-80 rounded-xl bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>
        );


    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-12 xl:col-span-12">
                <TopInfoCards
                    total={evaluations.length}
                    tempoTotal={tempoTotal}
                    mediaDuracao={mediaDuracao}
                    classificacao={classificacaoGeral}
                    variacaoDuracao={variacaoAvaliacoes}
                    variacaoTempo={variacaoTempo}
                />
            </div>

            <div className="col-span-12 xl:col-span-12">
                <PatientBarChart data={evaluationsByMonth} />
            </div>

            <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Indicators countTUG={countTUG} count5TSTS={count5TSTS} />
                <EvaluationActivityCard data={recentSeries}/>
            </div>
        </div>
    );
}
