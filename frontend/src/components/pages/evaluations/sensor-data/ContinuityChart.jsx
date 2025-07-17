import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

export default function ContinuityChart({ idadePaciente, tempoPaciente, tipo = 'TUG', labelColor = '#000' }) {
    const option = useMemo(() => {
        const referencias = {
            TUG: [
                { idade: 20, media: 6.0, desvio: 0.9 },
                { idade: 30, media: 6.2, desvio: 1.0 },
                { idade: 40, media: 6.5, desvio: 1.1 },
                { idade: 50, media: 6.7, desvio: 1.2 },
                { idade: 60, media: 8.5, desvio: 1.2 },
                { idade: 70, media: 9.8, desvio: 1.4 },
                { idade: 80, media: 11.5, desvio: 2.0 },
            ],
            '5TSTS': [
                { idade: 20, media: 8.5, desvio: 1.1 },
                { idade: 30, media: 9.1, desvio: 1.2 },
                { idade: 40, media: 9.9, desvio: 1.5 },
                { idade: 50, media: 10.7, desvio: 1.6 },
                { idade: 60, media: 11.4, desvio: 2.1 },
                { idade: 70, media: 13.6, desvio: 2.4 },
                { idade: 80, media: 15.9, desvio: 3.0 },
            ],
        };

        const dados = referencias[tipo] || referencias['TUG'];
        const ideal = dados.map(d => [d.idade, d.media]);
        const ruim = dados.map(d => [d.idade, d.media + 5]);

        return {
            title: {
                text: `Gráfico de continuidade - ${tipo}`,
                left: 'left',
                textStyle: { color: labelColor },
            },
            tooltip: { trigger: 'axis' },
            legend: {
                top: 30,
                textStyle: { color: labelColor },
                data: ['Tempo Ideal', 'Tempo Ruim', 'Paciente'],
            },
            xAxis: {
                type: 'value',
                name: 'Idade',
                nameLocation: 'middle',
                nameGap: 30,
                min: 20,
                max: 90,
                interval: 10,
                axisLabel: { color: labelColor },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#ccc',
                    },
                },
            },
            yAxis: {
                type: 'value',
                name: 'Tempo (segundos)',
                nameLocation: 'middle',
                nameGap: 50,
                axisLabel: { color: labelColor },
            },
            textStyle: { color: labelColor },
            series: [
                {
                    name: 'Tempo Ideal',
                    type: 'line',
                    data: ideal,
                    smooth: true,
                    lineStyle: { color: 'green', width: 2 },
                },
                {
                    name: 'Tempo Ruim',
                    type: 'line',
                    data: ruim,
                    smooth: true,
                    lineStyle: { color: 'red', width: 2 },
                },
                {
                    name: 'Paciente',
                    type: 'scatter',
                    data: [[idadePaciente, tempoPaciente]],
                    symbol: 'circle',
                    symbolSize: 12,
                    itemStyle: {
                        color: 'orange',
                    },
                    label: {
                        show: true,
                        formatter: `Paciente: ${tempoPaciente.toFixed(1)}s`,
                        position: 'top',
                        color: 'orange',
                        fontWeight: 'bold',
                    }
                }
            ],
        };
    }, [idadePaciente, tempoPaciente, tipo, labelColor]);

    return <ReactECharts option={option} style={{ height: 400 }} />;
}
