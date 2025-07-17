'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function PatientBarChart({ data = [] }) {
    const chartOptions = {
        colors: ["#465fff"],
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "bar",
            height: 180,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "39%",
                borderRadius: 5,
                borderRadiusApplication: "end",
            },
        },
        dataLabels: { enabled: false },
        stroke: {
            show: true,
            width: 4,
            colors: ["transparent"],
        },
        xaxis: {
            categories: [
                "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
                "Jul", "Ago", "Set", "Out", "Nov", "Dez",
            ],
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        legend: {
            show: true,
            position: "top",
            horizontalAlign: "left",
            fontFamily: "Outfit",
        },
        grid: {
            yaxis: {
                lines: { show: true },
            },
        },
        fill: { opacity: 1 },
        tooltip: {
            x: { show: false },
            y: {
                formatter: (val) => `${val} avaliações`,
            },
        },
    };

    const chartSeries = [
        {
            name: 'Avaliações',
            data: data.length === 12 ? data : new Array(12).fill(0),
        },
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Avaliações Mensais</h4>
            <Chart options={chartOptions} series={chartSeries} type="bar" height={300} />
        </div>
    );
}
