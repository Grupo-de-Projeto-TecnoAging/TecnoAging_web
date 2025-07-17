'use client';

import UserForm from '@/components/pages/users/UserForm';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Users, UserPlus } from 'lucide-react';

export default function RegisterPage() {
    return (
        <div className="p-2 space-y-2">
            <PageBreadcrumb
                items={[
                    { label: "Home", href: "/home" },
                    { label: "Usuários", href: "/users" },
                    { label: "Cadastro" },
                ]}
            />
            
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-base font-medium text-gray-800 dark:text-white/90">
                            <UserPlus className="w-5 h-5"/>
                            Cadastro de Usuário
                        </h3>
                    </div>
                </div>
                <div className="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
                    <UserForm />
                </div>
            </div>
        </div>
    );
} 