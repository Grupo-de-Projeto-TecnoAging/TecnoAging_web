'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';

export function BarChart({ evaluations, currentId, labelColor = '#000' }) {
    if (!evaluations || evaluations.length === 0) return null;

    // Corrige interpretação de tempo
    const parseTimeInSeconds = (totalTime) => {
        const parts = totalTime.split(':').map(Number);
        return parts[1] || 0; // considera apenas MM como segundos, ex: "00:11:00" → 11s
    };

    const sorted = evaluations
        .filter(e => e.totalTime)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);

    const labels = sorted.map(e =>
        new Date(e.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    );

    const times = sorted.map(e => parseTimeInSeconds(e.totalTime));

    const option = {
        title: {
            text: 'Tempo de Testes do Paciente',
            left: 'left',
            textStyle: { color: labelColor },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params) => {
                const { name, value } = params[0];
                return `Data: ${name}<br/>Tempo: <b>${value}s</b>`;
            },
        },
        xAxis: {
            type: 'category',
            data: labels,
            axisLabel: { color: labelColor },
        },
        yAxis: {
            type: 'value',
            axisLabel: { color: labelColor },
        },
        series: [
            {
                type: 'bar',
                data: times,
                itemStyle: {
                    color: '#3498db', // azul fixo
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}s',
                    color: labelColor,
                },
            },
        ],
    };

    return <ReactECharts option={option} style={{ height: 400 }} />;
}
