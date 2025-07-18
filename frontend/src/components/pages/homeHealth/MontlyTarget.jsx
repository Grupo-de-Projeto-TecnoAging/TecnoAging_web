'use client';

import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

export default function MonthlyTarget({ total = 100, atual = 73, hoje = 8 }) {
    const progresso = Math.min(((atual / total) * 100).toFixed(2), 100);

    const series = [Number(progresso)];

    const options = {
        colors: ["#465FFF"],
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "radialBar",
            height: 330,
            sparkline: {
                enabled: true,
            },
        },
        plotOptions: {
            radialBar: {
                startAngle: -85,
                endAngle: 85,
                hollow: { size: "80%" },
                track: {
                    background: "#E4E7EC",
                    strokeWidth: "100%",
                    margin: 5,
                },
                dataLabels: {
                    name: { show: false },
                    value: {
                        fontSize: "36px",
                        fontWeight: 600,
                        offsetY: -40,
                        color: "#1D2939",
                        formatter: (val) => val + "%",
                    },
                },
            },
        },
        fill: {
            type: "solid",
            colors: ["#465FFF"],
        },
        stroke: {
            lineCap: "round",
        },
        labels: ["Progresso"],
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Avaliação Mensal
                        </h3>
                        <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
                            Progresso da meta de avaliações do mês
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <div className="max-h-[330px]">
                        <ReactApexChart
                            options={options}
                            series={series}
                            type="radialBar"
                            height={330}
                        />
                    </div>

                    <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
            +10% desde o mês passado
          </span>
                </div>

                <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
                    {atual} pacientes já foram avaliados. Ótimo progresso este mês!
                </p>
            </div>

            <div className="flex items-center justify-center gap-5 px-6 py-4 sm:gap-8 sm:py-5">
                <div>
                    <p className="mb-1 text-center text-gray-500 text-xs sm:text-sm">Meta</p>
                    <p className="text-center text-base font-semibold text-gray-800 dark:text-white/90">
                        {total} pacientes
                    </p>
                </div>

                <div className="w-px bg-gray-200 h-7 dark:bg-gray-800" />

                <div>
                    <p className="mb-1 text-center text-gray-500 text-xs sm:text-sm">Avaliados</p>
                    <p className="text-center text-base font-semibold text-gray-800 dark:text-white/90">
                        {atual}
                    </p>
                </div>

                <div className="w-px bg-gray-200 h-7 dark:bg-gray-800" />

                <div>
                    <p className="mb-1 text-center text-gray-500 text-xs sm:text-sm">Hoje</p>
                    <p className="text-center text-base font-semibold text-gray-800 dark:text-white/90">
                        {hoje}
                    </p>
                </div>
            </div>
        </div>
    );
}
