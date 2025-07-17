'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function RecentEvaluationsChart({ data }) {
    const categories = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez",
    ];

    const options = {
        colors: ['#6366F1', '#10B981'],
        chart: {
            fontFamily: "Outfit, sans-serif",
            height: 310,
            type: "area",
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: [2, 2],
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
            },
        },
        markers: {
            size: 0,
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: { size: 6 },
        },
        grid: {
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
        },
        dataLabels: {
            enabled: true,
            y: {
                formatter: (val) => `${val.toFixed(1)} s`
            }
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: (val) => `${val?.toFixed(1)}s`,
            },
        },
        xaxis: {
            type: "category",
            categories,
            axisBorder: { show: false },
            axisTicks: { show: false },
            tooltip: { enabled: false },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: "12px",
                    colors: ["#6B7280"],
                },
            },
            title: {
                text: "",
                style: {
                    fontSize: "0px",
                },
            },
        },
        legend: { show: true, position: "top", horizontalAlign: "left" },
    };

    const series = [
        {
            name: "Média 5TSTS",
            data: data?.fiveTsts || Array(12).fill(null),
        },
        {
            name: "Média TUG",
            data: data?.tug || Array(12).fill(null),
        },
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                <div className="w-full">
                    <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">Média Mensal das Avaliações</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">TUG e 5TSTS em segundos</p>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-[1000px] xl:min-w-full">
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="area"
                        height={310}
                    />
                </div>
            </div>
        </div>
    );
}
