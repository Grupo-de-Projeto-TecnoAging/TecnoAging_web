'use client';

import {useParams, useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';
import UserMetaCard from '@/components/pages/users/user-profile/UserMetaCard';
import UserAddressCard from '@/components/pages/users/user-profile/UserAddressCard';
import {Skeleton} from "@mui/material";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ArrowLeft} from "lucide-react";
import { useSession } from "next-auth/react";
import { api } from "@/services/apiPerson";
import useSWR, { mutate } from 'swr';

export default function ProfilePage() {
    const { id } = useParams();
    const [hasTriedFetch, setHasTriedFetch] = useState(false);
    const router = useRouter();
    const {data: session, status} = useSession();

    const fetchUser = async (cpf) => {
        const response = await api.getPersonByCpf(cpf);
        let perfilEndpoint = '';
        const onlyDigits = response.phone?.replace(/\D/g, '') ?? '';

        if (onlyDigits.length < 11 && onlyDigits != "") {
            response.phone = onlyDigits.padEnd(11, '0');
        } else {
            response.phone = onlyDigits;
        }

        switch (response.profile) {
            case 'researcher':
                perfilEndpoint = `researcher/${response.cpf}`;
                break;
            case 'healthProfessional':
                perfilEndpoint = `healthProfessional/${response.cpf}`;
                break;
            case 'patient':
                perfilEndpoint = `patient/${response.cpf}`;
                break;
            default:
                return response;
        }

        const perfilData = await api.getPerfilByCpf(perfilEndpoint);
        return { ...response, perfilData };
    };

    const cpfToFetch = id !== "me" ? id : session?.user?.id;

    const { data: user, error, loading } = useSWR(
        cpfToFetch ? ['user', cpfToFetch] : null,
        ([, cpf]) => fetchUser(cpf),
        {
            onSuccess: () => {
                setHasTriedFetch(true);
            },
            onError: () => {
                setHasTriedFetch(true);
            }
        }
    );

    if (loading || status === "loading") {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 xl:p-7.5">
                <Skeleton className="w-1/3 h-6 mb-6" />
                <div className="space-y-6">
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (hasTriedFetch && !user) {
        return <p className="text-center py-10">Usuário não encontrado</p>;
    }

    return (
        <div>
            <PageBreadcrumb
                items={
                    id !== "me"
                        ? [
                            { label: "Home", href: "/home" },
                            { label: "Usuários", href: "/users" },
                            { label: "Visualizar perfil" },
                        ]
                        : [
                            { label: "Home", href: "/home" },
                            { label: "Meu perfil" },
                        ]
                }
            />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 xl:p-7.5">
                {id !== 'me' && (
                    <a
                        href="/users"
                        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                    </a>
                )}

                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Dados do usuário
                </h3>

                <div className="space-y-6">
                    <UserMetaCard
                        user={user}
                        onUserUpdated={async (updatedData) => {
                            await mutate(['user', cpfToFetch], {
                                ...user,
                                ...updatedData,
                                perfilData: {
                                    ...user.perfilData,
                                    ...updatedData,
                                }
                            }, false);
                        }}
                    />
                    <UserAddressCard user={user}/>
                </div>
            </div>
        </div>
    );
}

