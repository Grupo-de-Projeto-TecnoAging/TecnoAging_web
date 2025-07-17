'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { api } from '@/services/apiEvaluations';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { Users } from 'lucide-react';
import BenchmarkCharts from '@/components/pages/population-analysis/BenchmarkCharts';
import {Skeleton} from "@mui/material";

export default function PopulationAnalysisPage() {
    const [evaluations, setEvaluations] = useState([]);
    const [sensorDataByEval, setSensorDataByEval] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const allEvaluations = await api.getEvaluations();
                setEvaluations(allEvaluations);

                const sensorMap = Object.fromEntries(
                    allEvaluations.map(e => [e.id, e.sensorData])
                );

                setSensorDataByEval(sensorMap);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    function getAgeFromBirth(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function classifyAgeGroup(age) {
        if (age < 60) return '40–59';
        if (age < 70) return '60–69';
        if (age < 80) return '70–79';
        return '80+';
    }

    function agruparPorSexo(evaluations) {
        const grupos = { M: [], F: [] };
        for (const e of evaluations) {
            if (e.patient?.gender && grupos[e.patient.gender]) {
                grupos[e.patient.gender].push(e);
            }
        }
        return grupos;
    }

    function agruparPorFaixaEtaria(evaluations) {
        const grupos = {};
        for (const e of evaluations) {
            const idade = getAgeFromBirth(e.patient.dateOfBirth);
            const faixa = classifyAgeGroup(idade);
            if (!grupos[faixa]) grupos[faixa] = [];
            grupos[faixa].push(e);
        }
        return grupos;
    }

    function calcularIndicadoresPorTipo(tipo) {
        let total = {
            tempo: 0,
            potencia: 0,
            fadiga: 0,
            velocidade: 0,
            cadencia: 0,
        };
        let count = 0;

        evaluations.forEach((e) => {
            if (e.type !== tipo) return;

            const data = sensorDataByEval?.[e.id];
            if (!Array.isArray(data) || data.length === 0) return;


            const tempo = Number(e.totalTime.split(':')[1] || 0);
            const accelNorm = data?.map(d => Math.sqrt(d.accel_x ** 2 + d.accel_y ** 2 + d.accel_z ** 2)) || [];
            if (accelNorm.length === 0) return;

            const media = accelNorm.reduce((sum, v) => sum + v, 0) / accelNorm.length;
            const potencia = Math.sqrt(accelNorm.reduce((sum, v) => sum + v ** 2, 0) / accelNorm.length);
            const fadiga = Math.sqrt(accelNorm.reduce((sum, v) => sum + (v - media) ** 2, 0) / accelNorm.length);

            let velocidade = 0;
            let cadencia = 0;

            if (tipo === 'TUG') {
                const distancia = 3;
                velocidade = distancia / tempo;

                let passos = 0;
                let lastStepTime = new Date(data[0].time).getTime();
                for (let i = 1; i < accelNorm.length - 1; i++) {
                    const v = accelNorm[i];
                    const t = new Date(data[i].time).getTime();
                    if (
                        v > accelNorm[i - 1] &&
                        v > accelNorm[i + 1] &&
                        v > media * 1.1 &&
                        (t - lastStepTime) > 300
                    ) {
                        passos++;
                        lastStepTime = t;
                    }
                }

                cadencia = (passos / tempo) * 60;
            }

            total.tempo += tempo;
            total.potencia += potencia;
            total.fadiga += fadiga;
            total.velocidade += velocidade;
            total.cadencia += cadencia;
            count++;
        });

        return count > 0 ? {
            tempo: (total.tempo / count).toFixed(2),
            potencia: (total.potencia / count).toFixed(2),
            fadiga: (total.fadiga / count).toFixed(2),
            velocidade: (total.velocidade / count).toFixed(2),
            cadencia: (total.cadencia / count).toFixed(2),
        } : null;
    }

    const indicadoresTUG = useMemo(() => calcularIndicadoresPorTipo('TUG'), [evaluations, sensorDataByEval]);
    const indicadores5TSTS = useMemo(() => calcularIndicadoresPorTipo('5TSTS'), [evaluations, sensorDataByEval]);

    const gruposSexo = useMemo(() => agruparPorSexo(evaluations), [evaluations]);
    const gruposIdade = useMemo(() => agruparPorFaixaEtaria(evaluations), [evaluations]);

    if (loading) {
        return (
            <div className="p-2 space-y-4 animate-pulse">
                <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="px-5 py-4 sm:px-6 sm:py-5">
                        <div className="h-5 w-40 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="px-5 py-4 sm:px-6 sm:py-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="border-t border-gray-100 dark:border-gray-800 p-5 sm:p-6 space-y-4">
                        <div className="h-5 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
                        <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6">
            <PageBreadcrumb
                items={[{ label: 'Home', href: '/home' }, { label: 'Análise da População' }]}
            />

            <IndicadoresMedios titulo="Análise da População - TUG" indicadores={indicadoresTUG} />
            <IndicadoresMedios titulo="Análise da População - 5TSTS" indicadores={indicadores5TSTS} is5TSTS />

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2 mb-4">
                    <Users className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Benchmarking Entre Grupos</h2>
                </div>
                <BenchmarkCharts
                    gruposSexo={gruposSexo}
                    gruposIdade={gruposIdade}
                    sensorDataByEval={sensorDataByEval}
                />
            </div>
        </div>
    );
}

function IndicadoresMedios({ titulo, indicadores, is5TSTS }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2 mb-4">
                <Users className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{titulo}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <IndicadorCard label="Tempo médio do teste" valor={indicadores?.tempo + ' s'} />
                <IndicadorCard label="Potência relativa média" valor={indicadores?.potencia} />
                <IndicadorCard label="Fadiga média" valor={indicadores?.fadiga} />
                {!is5TSTS && (
                    <>
                        <IndicadorCard label="Velocidade de marcha média" valor={indicadores?.velocidade + ' m/s'} />
                        <IndicadorCard label="Cadência média" valor={indicadores?.cadencia + ' passos/min'} />
                    </>
                )}
            </div>
        </div>
    );
}

function IndicadorCard({ label, valor }) {
    return (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.02]">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
            <p className="text-lg font-bold text-gray-800 dark:text-white">{valor}</p>
        </div>
    );
}
