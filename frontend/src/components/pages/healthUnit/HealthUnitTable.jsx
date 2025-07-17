import React, { useEffect, useState } from "react";
import { generateColumns } from "@/components/datatable/GenerateColumns";
import DataTable from "@/components/datatable/DataTable";
import { useRouter } from "next/navigation";
import {Pencil, Trash} from "lucide-react";
import { api } from '@/services/apiHealthUnit';
import AlertModal from "@/components/modal/AlertModal";
import {useModal} from "@/hooks/useModal";
import {toast} from "sonner";

export default function HealthUnitTable({refreshKey, onEdit}) {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState(null);
    const [sortDir, setSortDir] = useState(null);
    const router = useRouter();
    const [selectedId, setSelectedId] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const columns = generateColumns([
        { accessorKey: 'name', title: 'Nome', enableSorting: true },
        { accessorKey: 'street', title: 'Rua' },
        { accessorKey: 'number', title: 'Número' },
        { accessorKey: 'neighborhood', title: 'Bairro' },
        { accessorKey: 'city', title: 'Cidade' },
        { accessorKey: 'state', title: 'Estado' },
        {
            accessorKey: 'createdAt',
            title: 'Criado em',
            cell: ({ row }) => {
                const date = new Date(row.original.createdAt);
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
            accessorKey: 'actions',
            title: 'Ações',
            size: '80px',
            cell: ({ row }) => {
                const id = row.original.id;
                return (
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(row.original)}
                            className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]">
                            <Pencil size={14} />
                        </button>
                        <button
                            onClick={() => {
                                setSelectedId(id);
                                openModal();
                            }}
                            className="inline-flex items-center gap-1.5 rounded-md bg-red-100 px-3 py-2 text-xs font-medium text-red-400 shadow-sm ring-1 ring-red-300 transition hover:bg-red-200 dark:bg-red-900 dark:text-white dark:ring-red-700 dark:hover:bg-red-800">
                            <Trash size={14} />
                        </button>
                    </div>
                );
            },
        },
    ]);


    const confirmDelete = async () => {
        try {
            await api.deleteHealthUnit(selectedId);
            setData(prev => prev.filter(item => item.id !== selectedId));
            toast.success("Sucesso ao remover unidade de saúde.");
        } catch (error) {
            toast.error("Oops! Erro ao deletar unidade de saúde.");
        } finally {
            setSelectedId(null);
            closeModal();
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await api.getHealthUnits({
                    limit: pageSize,
                    skip: pageIndex * pageSize,
                    search,
                    sortBy,
                    sortDir,
                });
                setData(result.data || result);
                setTotal(result.total || result.length || 0);
            } catch (error) {
                console.error('Erro ao buscar unidades de saúde:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pageIndex, pageSize, search, sortBy, sortDir, refreshKey]);

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