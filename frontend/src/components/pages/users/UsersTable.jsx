import React, {useEffect, useState} from "react";
import {generateColumns} from "@/components/datatable/GenerateColumns";
import DataTable from "@/components/datatable/DataTable";
import {Pencil, Search, Trash, ListChecks} from "lucide-react";
import {api} from "@/services/apiPerson";
import AlertModal from "@/components/modal/AlertModal";
import {useModal} from "@/hooks/useModal";
import {toast} from "sonner";
import { useSession } from "next-auth/react";

export default function UsersTable({ refreshKey }) {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState(null); // ex: 'name'
    const [sortDir, setSortDir] = useState(null); // 'asc' ou 'desc'
    const [selectedId, setSelectedId] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();
    const columns = generateColumns([
            {
                accessorKey: 'cpf',
                title: 'CPF',
                enableSorting: true,
                cell: ({ row }) => {
                    const cpf = row.original.cpf;
                    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
                },
            },
            {
                accessorKey: 'name',
                title: 'Nome',
                enableSorting: true,
            },
            {
                accessorKey: 'phone',
                title: 'Telefone',
            },
            {
                accessorKey: 'gender',
                title: 'Sexo',
                cell: ({ row }) => {
                    const gender = row.original.gender;
                    return gender === 'M' ? 'Masculino' : gender === 'F' ? 'Feminino' : gender;
                },
            },
            {
                accessorKey: 'profile',
                title: 'Perfil',
                enableSorting: true,
                cell: ({ row }) => {
                    const perfil = row.original.profile;
                    if (perfil === 'patient') return 'Paciente';
                    if (perfil === 'researcher') return 'Pesquisador';
                    if (perfil === 'healthProfessional') return 'Profissional de Saúde';
                    return perfil;
                },
            },
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
                    const id = row.original.cpf;
                    const profile = row.original.profile;
                    const { data: session } = useSession();

                    return (
                        <div className="flex gap-2">
                            <a
                                href={`/users/profile/${id}`}
                                className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]">
                                <Search size={14} />
                            </a>
                            {profile !== "researcher" && (
                                <a
                                    href={`/evaluations?cpf=${id}`}
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]">
                                    <ListChecks size={14} />
                                </a>
                            )}
                            {id !== session?.user?.id && (
                                <button
                                    onClick={() => {
                                        setSelectedId(id);
                                        openModal();
                                    }}
                                    className="inline-flex items-center gap-1.5 rounded-md bg-red-100 px-3 py-2 text-xs font-medium text-red-400 shadow-sm ring-1 ring-red-300 transition hover:bg-red-200 dark:bg-red-900 dark:text-white dark:ring-red-700 dark:hover:bg-red-800">
                                    <Trash size={14} />
                                </button>
                            )}
                        </div>
                    );
                },
            }
        ]
    );

    const confirmDelete = async () => {
        try {
            await api.deletePerson(selectedId);
            setData(prev => prev.filter(item => item.cpf !== selectedId));
            toast.success("Sucesso ao remover usuário.");
        } catch (error) {
            toast.error("Oops! Erro ao deletar usuário.");
        } finally {
            setSelectedId(null);
            closeModal();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const pessoas = await api.getAllPersons();

                let filtradas = pessoas;
                if (search) {
                    const searchLower = search.toLowerCase();
                    filtradas = pessoas.filter((pessoa) =>
                        pessoa.name.toLowerCase().includes(searchLower) ||
                        pessoa.cpf.toLowerCase().includes(searchLower) ||
                        pessoa.profile.toLowerCase().includes(searchLower)
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
                console.error('Erro ao buscar dados:', error);
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