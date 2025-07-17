'use client';

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {Hospital, Plus} from "lucide-react";
import HealthUnitTable from "@/components/pages/healthUnit/HealthUnitTable";
import HealthUnitFormModal from "@/components/pages/healthUnit/HealthUnitFormModal";
import { useModal } from "@/hooks/useModal";

export default function HealthUnitContent() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [editingUnit, setEditingUnit] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const handleSuccess = () => {
        setRefreshKey(prev => prev + 1);
        closeModal();
        setEditingUnit(null);
    };

    const handleEdit = (unit) => {
        setEditingUnit(unit);
        openModal();
    };

    const handleAdd = () => {
        setEditingUnit(null);
        openModal();
    };

    return (
        <div className="p-2 space-y-2">
            <PageBreadcrumb
                items={[
                    { label: "Home", href: "/home" },
                    { label: "Unidade(s) de sáude" },
                ]}
            />

            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-base font-medium text-gray-800 dark:text-white/90">
                            <Hospital className="w-5 h-5" />
                            Listagem de unidade(s) de saúde
                        </h3>
                        <button
                            onClick={handleAdd}
                            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                        >
                            <Plus className="w-4 h-4" />
                            Adicionar
                        </button>
                    </div>
                </div>
                <div className="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
                    <HealthUnitTable onEdit={handleEdit} refreshKey={refreshKey} />
                </div>
            </div>

            <HealthUnitFormModal
                isOpen={isOpen}
                onClose={closeModal}
                onSuccess={handleSuccess}
                initialData={editingUnit}
            />
        </div>
    );
}
