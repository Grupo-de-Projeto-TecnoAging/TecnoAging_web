import {useMemo} from "react";
import ReactECharts from "echarts-for-react";

export function RadarChart({ indicators, labelColor }) {
    const option = useMemo(() => ({
        title: { text: 'Indicadores do Paciente', left: 'left', textStyle: { color: labelColor } },
        tooltip: {},
        legend: { textStyle: { color: labelColor }, top: 30 },
        radar: {
            indicator: indicators.map(i => ({ name: i.name, max: i.maxValue })),
            axisName: { color: labelColor },
            splitLine: { lineStyle: { color: labelColor === '#fff' ? '#555' : '#ccc' } },
        },
        series: [{
            type: 'radar',
            data: [
                {
                    name: 'Atuação',
                    value: indicators.map(i => i.value),
                    areaStyle: { opacity: 0.3 },
                }
            ],
            lineStyle: { color: 'purple' },
            symbol: 'circle'
        }],
        textStyle: { color: labelColor },
    }), [indicators, labelColor]);

    return <ReactECharts option={option} style={{ height: 300 }} />;
}
