import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

export default function TUGChart({ tempoPaciente, labelColor = '#000' }) {
    const option = useMemo(() => {
        if (!tempoPaciente || isNaN(tempoPaciente)) return {};

        return {
            title: {
                text: 'TUG - Classificação por Tempo',
                left: 'center',
                textStyle: { color: labelColor },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                backgroundColor: labelColor === '#fff' ? '#333' : '#fff',
                textStyle: { color: labelColor },
            },
            xAxis: {
                type: 'value',
                min: 0,
                max: 40,
                axisLabel: { color: labelColor },
                axisLine: { lineStyle: { color: labelColor } },
                name: 'Tempo (segundos)',
                nameLocation: 'middle',
                nameGap: 30,
            },
            yAxis: {
                type: 'category',
                data: ['Risco'],
                axisLabel: { color: labelColor },
                axisLine: { lineStyle: { color: labelColor } },
            },
            series: [
                {
                    name: 'Normal',
                    type: 'bar',
                    stack: 'total',
                    data: [10],
                    itemStyle: { color: '#4caf50' },
                },
                {
                    name: 'Idoso Frágil',
                    type: 'bar',
                    stack: 'total',
                    data: [10],
                    itemStyle: { color: '#2196f3' },
                },
                {
                    name: 'Risco Moderado',
                    type: 'bar',
                    stack: 'total',
                    data: [9],
                    itemStyle: { color: '#ff9800' },
                },
                {
                    name: 'Risco Alto',
                    type: 'bar',
                    stack: 'total',
                    data: [11],
                    itemStyle: { color: '#f44336' },
                },
                {
                    name: 'Paciente',
                    type: 'line',
                    data: [],
                    markLine: {
                        silent: true,
                        symbol: 'none',
                        lineStyle: {
                            color: 'orange',
                            width: 2,
                            type: 'solid',
                        },
                        label: {
                            show: true,
                            formatter: `Tempo do paciente: ${Number(tempoPaciente).toFixed(1)}s`,
                            position: 'insideEndTop',
                            color: 'orange',
                            fontWeight: 'bold',
                        },
                        data: [
                            { xAxis: Number(tempoPaciente) },
                        ],
                    },
                },
            ],
            grid: {
                top: 70,
                bottom: 50,
                left: 60,
                right: 40,
            },
            toolbox: {
                feature: { restore: { title: 'Resetar', show: true } },
                top: 10,
                right: 20,
            },
            textStyle: { color: labelColor },
        };
    }, [tempoPaciente, labelColor]);

    return <ReactECharts option={option} style={{ height: 200 }} />;
}
