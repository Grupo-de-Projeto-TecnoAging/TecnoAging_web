import React, { useEffect, useState } from "react";
import { generateColumns } from "@/components/datatable/GenerateColumns";
import DataTable from "@/components/datatable/DataTable";
import {Pencil, Search, Trash} from "lucide-react";
import AlertModal from "@/components/modal/AlertModal";
import {useModal} from "@/hooks/useModal";
import {toast} from "sonner";
import {api} from "@/services/apiEvaluations";

export default function EvaluationsTable({ refreshKey, filterType, filterApplicator, filterDate, filterCpf }) {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState(null);
    const [sortDir, setSortDir] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const columns = generateColumns([
        { accessorKey: 'type', title: 'Tipo de Teste' },
        {
            accessorKey: 'healthProfessional.name',
            title: 'Aplicador',
            cell: ({ row }) => {
                const cpf = row.original.healthProfessional.name;
                return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
            },
        },
        {
            accessorKey: 'pacient.name',
            title: 'Paciente',
            cell: ({ row }) => {
                const cpf = row.original.patient.name;
                return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
            },
        },
        {
            accessorKey: 'date',
            title: 'Criado em',
            cell: ({ row }) => {
                const date = new Date(row.original.date);
                return date.toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                });
            },
        },
        {
            accessorKey: 'totalTime',
            title: 'Tempo total',
        },
        {
            accessorKey: 'actions',
            title: 'Ações',
            size: '80px',
            cell: ({ row }) => {
                const id = row.original.id;

                return (
                    <div className="flex gap-2">
                        <a
                            href={`/evaluations/data/${id}`}
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]">
                            <Search size={14} />
                        </a>
                    </div>
                );
            },
        },
    ]);

    const confirmDelete = async () => {
        try {
            setData(prev => prev.filter(item => item.id !== selectedId));
            toast.success("Sucesso ao remover avaliação.");
        } catch (error) {
            toast.error("Oops! Erro ao deletar avaliação.");
        } finally {
            setSelectedId(null);
            closeModal();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let result = [];

                if (filterCpf) {
                    result = await api.getEvaluationsByPersonCpf(filterCpf);
                } else {
                    result = await api.getEvaluations({
                        limit: pageSize,
                        skip: pageIndex * pageSize,
                        search,
                        sortBy,
                        sortDir,
                    });
                }


                let filtradas = result;
                if (search) {
                    const searchLower = search.toLowerCase();
                    filtradas = filtradas.filter((evaluation) =>
                        evaluation.healthProfessional.name.toLowerCase().includes(searchLower) ||
                        evaluation.patient.name.toLowerCase().includes(searchLower) ||
                        evaluation.type.toLowerCase().includes(searchLower)
                    );
                }

                if (filterType) {
                    filtradas = filtradas.filter((evaluation) =>
                        evaluation.type.toLowerCase() === filterType.toLowerCase()
                    );
                }

                if (filterApplicator) {
                    const applicatorLower = filterApplicator.toLowerCase();
                    filtradas = filtradas.filter((evaluation) =>
                        evaluation.healthProfessional.name.toLowerCase().includes(applicatorLower)
                    );
                }

                if (filterDate) {
                    filtradas = filtradas.filter((evaluation) =>
                        evaluation.date?.startsWith(filterDate)
                    );
                }

                if (sortBy) {
                    filtradas.sort((a, b) => {
                        const aValue = a[sortBy];
                        const bValue = b[sortBy];
                        if (aValue < bValue) return sortDir === 'asc' ? -1 : 1;
                        if (aValue > bValue) return sortDir === 'asc' ? 1 : -1;
                        return 0;
                    });
                }

                const start = pageIndex * pageSize;
                const paginadas = filtradas.slice(start, start + pageSize);

                setData(paginadas);
                setTotal(filtradas.length);
            } catch (error) {
                console.error('Erro ao buscar avaliações:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pageIndex, pageSize, search, sortBy, sortDir, refreshKey, filterType, filterApplicator, filterDate]);

    return (
        <>
            <DataTable
                data={data}
                columns={columns}
                total={total}
                pageIndex={pageIndex}
                pageSize={pageSize}
                onPageChange={setPageIndex}
                loading={loading}
                onPageSizeChange={size => {
                    setPageSize(size);
                    setPageIndex(0);
                }}
                onSearch={value => {
                    setSearch(value);
                    setPageIndex(0);
                }}
                sortBy={sortBy}
                sortDir={sortDir}
                onSortChange={(field, direction) => {
                    setSortBy(field);
                    setSortDir(direction);
                }}
            />

            <AlertModal
                isOpen={isOpen}
                onClose={closeModal}
                type="danger"
                title="Tem certeza que deseja excluir?"
                description="Essa ação não poderá ser desfeita."
                onConfirm={confirmDelete}
            />
        </>
    );
}
