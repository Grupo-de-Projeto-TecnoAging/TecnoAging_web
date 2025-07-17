'use client';

import { Activity, LineChart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Indicators({ countTUG = 0, count5TSTS = 0 }) {
    const router = useRouter();

    return (
        <div className="flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Testes Mais Realizados
                </h3>
                <Activity className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>

            <div className="my-6 space-y-4 flex-grow">
                <div className="flex justify-between border-b pb-2 border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-300">TUG (Timed Up and Go)</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-white/90">{countTUG}</span>
                </div>
                <div className="flex justify-between border-b pb-2 border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-300">5TSTS</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-white/90">{count5TSTS}</span>
                </div>
            </div>

            <button
                onClick={() => router.push('/evaluations')}
                className="mt-auto w-full flex justify-center gap-2 rounded-lg border border-gray-300 bg-white p-2.5 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
                Ver Relatório de Testes
                <LineChart className="w-4 h-4" />
            </button>
        </div>
    );
}
