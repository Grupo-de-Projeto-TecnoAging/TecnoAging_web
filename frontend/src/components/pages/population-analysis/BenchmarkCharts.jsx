'use client';

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { api } from '@/services/apiEvaluations';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

export default function PopulationAnalysisPage() {
    const [evaluations, setEvaluations] = useState([]);
    const [sensorDataByEval, setSensorDataByEval] = useState({});
    const [loading, setLoading] = useState(true);

    const groupedBySex = useMemo(() => groupBy(evaluations, e => e.patient?.gender || 'Indefinido'), [evaluations]);

    const sexKeys = Object.keys(groupedBySex);
    const sexColors = { F: '#e74c3c', M: '#3498db' };
    const [labelColor, setLabelColor] = useState('#000');

    const radarIndicatorsByType = {
        '5TSTS': [
            { name: 'Tempo', max: 60 },
            { name: 'Potência', max: 20 },
            { name: 'Fadiga', max: 10 },
            { name: 'Simetria', max: 10 },
        ],
        'TUG': [
            { name: 'Velocidade da marcha', max: 2 },
            { name: 'Cadência', max: 150 },
            { name: 'Equilíbrio', max: 10 },
            { name: 'Transição', max: 20 },
        ],
    };

    const updateLabelColor = () => {
        const isDark = document.documentElement.classList.contains('dark');
        setLabelColor(isDark ? '#fff' : '#000');
    };

    useEffect(() => {
        updateLabelColor();
        const observer = new MutationObserver(updateLabelColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const allEvaluations = await api.getEvaluations();
                setEvaluations(allEvaluations);

                const sensorMap = Object.fromEntries(allEvaluations.map(e => [e.id, e.sensorData]));
                setSensorDataByEval(sensorMap);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    function getAverageTime(evals, sensorData, type) {
        const filtered = type ? evals.filter(e => e.type === type) : evals;
        let total = 0;
        let count = 0;
        for (const e of filtered) {
            if (!sensorData[e.id] || !e.totalTime) continue;
            const parts = e.totalTime.split(':').map(Number);
            const seconds = parts?.[1] ?? 0;
            total += seconds;
            count++;
        }
        return count ? parseFloat((total / count).toFixed(2)) : 0;
    }

    function buildBarDataBySex(type) {
        return sexKeys.map(sex => ({
            value: getAverageTime(groupedBySex[sex] ?? [], sensorDataByEval, type),
            itemStyle: { color: sexColors[sex] || '#95a5a6' },
        }));
    }

    function getRadarDataByType(type) {
        const grouped = groupBy(
            evaluations.filter(e => e.type === type),
            e => {
                const birth = e.patient?.dateOfBirth;
                if (!birth) return 'Indefinido';
                return getAgeGroup(getAgeFromBirth(birth));
            }
        );

        return Object.entries(grouped).map(([group, evals]) => {
            const resultados = evals.map(e => calcularIndicadores(sensorDataByEval[e.id], type)).filter(Boolean);
            if (!resultados.length) return { name: group, value: radarIndicatorsByType[type].map(() => 0) };

            const soma = {};
            resultados.forEach(radar => {
                radar.forEach(({ name, value }) => {
                    soma[name] = (soma[name] || 0) + value;
                });
            });

            const media = radarIndicatorsByType[type].map(({ name }) =>
                parseFloat((soma[name] / resultados.length).toFixed(2))
            );

            return { name: group, value: media };
        });
    }

    function calcularIndicadores(sensorData, tipo = '5TSTS') {
        if (!sensorData || sensorData.length === 0) return null;

        if (!Array.isArray(sensorData) || sensorData.length < 2) return null;

        sensorData.sort((a, b) => new Date(a.time) - new Date(b.time));

        const t0 = new Date(sensorData[0].time).getTime();
        const tN = new Date(sensorData[sensorData.length - 1].time).getTime();

        if (isNaN(t0) || isNaN(tN)) {
            console.warn('Timestamp inválido:', sensorData[0].time, sensorData[sensorData.length - 1].time);
            return null;
        }

        const tempo = (tN - t0) / 1000;
        if (tempo < 0) {
            console.warn('Tempo negativo:', tempo, 'sensorData:', sensorData);
            return null;
        }

        const accelNorm = sensorData.map(d =>
            Math.sqrt(d.accel_x ** 2 + d.accel_y ** 2 + d.accel_z ** 2)
        );

        const media = accelNorm.reduce((sum, v) => sum + v, 0) / accelNorm.length;
        const potencia = Math.sqrt(
            accelNorm.reduce((sum, v) => sum + v ** 2, 0) / accelNorm.length
        );
        const fadiga = Math.sqrt(
            accelNorm.reduce((sum, v) => sum + (v - media) ** 2, 0) / accelNorm.length
        );

        if (tipo === '5TSTS') {
            const ladoPositivo = sensorData.filter(d => d.accel_x >= 0).length;
            const ladoNegativo = sensorData.filter(d => d.accel_x < 0).length;
            const simetria = Math.abs(ladoPositivo - ladoNegativo) / sensorData.length;

            return [
                { name: 'Tempo', value: Number(tempo.toFixed(2)) },
                { name: 'Potência', value: Number(potencia.toFixed(2)) },
                { name: 'Fadiga', value: Number(fadiga.toFixed(2)) },
                { name: 'Simetria', value: Number((simetria * 10).toFixed(2)) },
            ];
        }

        if (tipo === 'TUG') {
            if (tempo <= 0.5) return null;

            const distancia = 3;
            const velocidade = distancia / tempo;

            let passos = 0;
            let lastStepTime = t0;
            for (let i = 1; i < accelNorm.length - 1; i++) {
                const v = accelNorm[i];
                const t = new Date(sensorData[i].time).getTime();
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

            const cadencia = Math.min((passos / tempo) * 60, 200);
            const equilibrio = 10 - Math.min(10, sensorData.reduce((acc, d) => acc + Math.abs(d.gyro_z), 0) / sensorData.length * 10);
            const transicao = Math.min(Math.max(...sensorData.map(d => Math.abs(d.accel_z))), 20);

            return [
                { name: 'Velocidade da marcha', value: Number(velocidade.toFixed(2)) },
                { name: 'Cadência', value: Number(cadencia.toFixed(2)) },
                { name: 'Equilíbrio', value: Number(equilibrio.toFixed(1)) },
                { name: 'Transição', value: Number(transicao.toFixed(2)) },
            ];
        }

        return null;
    }

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

    function getAgeGroup(age) {
        if (age < 20) return '0-19';
        if (age < 40) return '20-39';
        if (age < 60) return '40-59';
        return '60+';
    }

    function groupBy(arr, keyGetter) {
        return arr.reduce((acc, item) => {
            const key = typeof keyGetter === 'function' ? keyGetter(item) : item[keyGetter];
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
    }

    const optionBar5TSTS = {
        title: { text: 'Tempo médio por sexo – 5TSTS', left: 'center', textStyle: { color: labelColor }},
        tooltip: {},
        xAxis: {
            type: 'category', data: sexKeys ,
            axisLabel: { color: labelColor },
        },
        yAxis: {
            type: 'value',
            axisLabel: { color: labelColor },
        },
        series: [{ name: 'Tempo médio (s)', type: 'bar', data: buildBarDataBySex('5TSTS') }],
        textStyle: { color: labelColor },
    };

    const optionBarTUG = {
        title: {
            text: 'Tempo médio por sexo – TUG',
            left: 'center',
            textStyle: { color: labelColor }
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: sexKeys,
            axisLabel: { color: labelColor }
        },
        yAxis: {
            type: 'value',
            axisLabel: { color: labelColor }
        },
        series: [
            {
                name: 'Tempo médio (s)',
                type: 'bar',
                data: buildBarDataBySex('TUG')
            }
        ],
        textStyle: { color: labelColor }
    };

    const optionRadar5TSTS = {
        title: {
            text: 'Indicadores por faixa etária - 5TSTS',
            left: 'center',
            top: 0,
            textStyle: { color: labelColor }
        },
        tooltip: {},
        legend: {
            data: getRadarDataByType('5TSTS').map(d => d.name),
            top: 100,
            textStyle: { color: labelColor }
        },
        radar: {
            indicator: radarIndicatorsByType['5TSTS'],
            name: {
                textStyle: { color: labelColor }
            }
        },
        series: [
            {
                type: 'radar',
                data: getRadarDataByType('5TSTS')
            }
        ],
        textStyle: { color: labelColor }
    };

    const optionRadarTUG = {
        title: {
            text: 'Indicadores por faixa etária - TUG',
            left: 'center',
            top: 0,
            textStyle: { color: labelColor }
        },
        tooltip: {},
        legend: {
            data: getRadarDataByType('TUG').map(d => d.name),
            top: 100,
            textStyle: { color: labelColor }
        },
        radar: {
            indicator: radarIndicatorsByType['TUG'],
            name: {
                textStyle: { color: labelColor }
            }
        },
        series: [
            {
                type: 'radar',
                data: getRadarDataByType('TUG')
            }
        ],
        textStyle: { color: labelColor }
    };

    if (loading) {
        return <div className="p-4">Carregando análise da população...</div>;
    }

    return (
        <div className="p-4 space-y-6">
            <div className="rounded-xl bg-white dark:bg-white/[0.02] p-4 border border-gray-200 dark:border-gray-800">
                <ReactECharts option={optionBar5TSTS} style={{ height: 400 }} />
            </div>
            <div className="rounded-xl bg-white dark:bg-white/[0.02] p-4 border border-gray-200 dark:border-gray-800">
                <ReactECharts option={optionBarTUG} style={{ height: 400 }} />
            </div>
            <div className="rounded-xl bg-white dark:bg-white/[0.02] p-4 border border-gray-200 dark:border-gray-800">
                <ReactECharts option={optionRadar5TSTS} style={{ height: 400 }} />
                <ReactECharts option={optionRadarTUG} style={{ height: 400 }} />
            </div>
        </div>
    );
}
