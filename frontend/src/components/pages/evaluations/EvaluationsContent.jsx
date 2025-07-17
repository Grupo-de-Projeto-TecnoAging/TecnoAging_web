'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Filter, List } from "lucide-react";
import EvaluationsTable from "@/components/pages/evaluations/EvaluationsTable";
import DatePicker from "@/components/form/input/DatePicker";
import {useSession} from "next-auth/react";

export default function EvaluationsContent() {
    const [refreshKey, setRefreshKey] = useState(0);

    const [filterType, setFilterType] = useState('');
    const [filterApplicator, setFilterApplicator] = useState('');
    const [filterDate, setFilterDate] = useState('');

    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    if (status === "loading") {
        return (
            <div className="p-2 space-y-4 animate-pulse">
                <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="px-5 py-4 sm:px-6 sm:py-5">
                        <div className="h-5 w-40 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
                                    <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 p-5 sm:p-6 space-y-4">
                        <div className="h-5 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
                        <div className="h-100 bg-gray-200 dark:bg-gray-800 rounded" />
                    </div>
                </div>
            </div>
        );
    }
    const profile = session?.user?.profile;
    const cpfFromSession = session?.user?.cpf;
    const cpfFromUrl = profile === "patient" ? cpfFromSession || '' : searchParams.get("cpf") || '';

    return (
        <div className="p-2 space-y-4">
            <PageBreadcrumb
                items={[
                    { label: "Home", href: "/home" },
                    { label: "Avaliações" },
                ]}
            />

            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-base font-medium text-gray-800 dark:text-white/90">
                            <Filter className="w-5 h-5" />
                            Filtros
                        </h3>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Tipo de Teste
                            </label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="block w-full rounded-lg border px-3 py-2 text-sm shadow-theme-xs dark:bg-gray-900 dark:text-white/90 dark:border-gray-700 border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                            >
                                <option value="">Todos</option>
                                <option value="TUG">TUG</option>
                                <option value="5TSTS">5TSTS</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Aplicador
                            </label>
                            <input
                                type="text"
                                placeholder="Digite o nome do aplicador"
                                value={filterApplicator}
                                onChange={(e) => setFilterApplicator(e.target.value)}
                                className="block w-full rounded-lg border px-3 py-2 text-sm shadow-theme-xs dark:bg-gray-900 dark:text-white/90 dark:border-gray-700 border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Data da Avaliação
                            </label>
                            <DatePicker
                                id="filtro-data"
                                placeholder="Selecionar data"
                                onChange={(selectedDates) => {
                                    const data = selectedDates?.[0];
                                    setFilterDate(data?.toISOString().split('T')[0] || '');
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="flex items-center gap-2 text-base font-medium text-gray-800 dark:text-white/90">
                            <List className="w-5 h-5" />
                            Listagem de avaliações
                        </h3>
                    </div>

                    <EvaluationsTable
                        refreshKey={refreshKey}
                        filterType={filterType}
                        filterApplicator={filterApplicator}
                        filterDate={filterDate}
                        filterCpf={cpfFromUrl}
                    />
                </div>
            </div>
        </div>
    );
}
