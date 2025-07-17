'use client';

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

export function FadigaAreaChart({ potencias, labelColor = '#333' }) {
    const Pmax = Math.max(...potencias);

    const dadosFadiga = potencias.map((p, i) => {
        const fadiga = ((Pmax - p) / Pmax) * 100;
        return {
            repeticao: i + 1,
            fadigaAcumulada: parseFloat(fadiga.toFixed(2)),
        };
    });

    const option = useMemo(() => ({
        title: {
            text: 'Fadiga Acumulada',
            left: 'left',
            textStyle: { color: labelColor },
        },
        tooltip: {
            trigger: 'axis',
            formatter: params => {
                const { dataIndex, value } = params[0];
                return `
                    Repetição ${dataIndex + 1}<br/>
                    Fadiga acumulada: <b>${value.toFixed(2)}%</b>
                  `;
            }
        },
        xAxis: {
            type: 'category',
            data: dadosFadiga.map(d => `R${d.repeticao}`),
            axisLabel: { color: labelColor },
            name: 'Repetição',
        },
        yAxis: {
            type: 'value',
            name: 'Fadiga (%)',
            axisLabel: { color: labelColor },
            min: 0,
        },
        series: [
            {
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: dadosFadiga.map(d => ({
                    value: d.fadigaAcumulada,
                    repeticao: d.repeticao,
                })),
                lineStyle: {
                    color: '#ff7300',
                    width: 2,
                },
                areaStyle: {
                    color: 'rgba(255, 115, 0, 0.3)',
                },
            },
        ],
        grid: {
            left: '8%',
            right: '8%',
            bottom: '12%',
            containLabel: true,
        },
        legend: {
            data: ['Fadiga acumulada (%)'],
            top: 10,
            textStyle: { color: labelColor },
        },
        textStyle: { color: labelColor },
    }), [dadosFadiga, labelColor]);

    return (
        <ReactECharts
            option={option}
            style={{ height: 300 }}
        />
    );
}
