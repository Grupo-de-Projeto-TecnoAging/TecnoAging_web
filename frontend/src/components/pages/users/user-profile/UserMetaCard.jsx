"use client";
import React from "react";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";
import { Pencil } from "lucide-react";
import UserFormModal from "@/components/pages/users/UserFormModal";

const InfoItem = ({ label, value }) => (
    <div>
      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">{value ?? "Sem informações"}</p>
    </div>
);

export default function UserMetaCard({ user, onUserUpdated }) {
  const { isOpen, openModal, closeModal } = useModal();
  const perfilData = user?.perfilData || {};

  const handleSave = () => {
    console.log("Alterações salvas!");
    closeModal();
  };

  function formatCpf(value) {
    if (!value) return '';
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function formatPhone(value) {
    if (!value) return '';
    const digits = value.replace(/\D/g, '').padEnd(11, '0');

    return digits
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
  }

    const renderFields = () => {
    switch (user?.profile) {
      case "healthProfessional":
        return (
            <>
              <InfoItem label="CPF" value={formatCpf(user?.cpf)} />
              <InfoItem label="Sexo" value={user?.gender === 'M' ? 'Masculino' : 'Feminino'} />
              <InfoItem label="Telefone" value={formatPhone(user?.phone)} />
              <InfoItem label="E-mail" value={perfilData?.email} />
              <InfoItem label="Especialidade" value={perfilData?.expertise} />
            </>
        );

      case "researcher":
        return (
            <>
              <InfoItem label="CPF" value={formatCpf(user?.cpf)} />
              <InfoItem label="Sexo" value={user?.gender === 'M' ? 'Masculino' : 'Feminino'} />
              <InfoItem label="Telefone" value={formatPhone(user?.phone)} />
              <InfoItem label="Email" value={perfilData?.email} />
              <InfoItem label="Instituição" value={perfilData?.institution} />
              <InfoItem label="Área de Atuação" value={perfilData?.fieldOfStudy} />
              <InfoItem label="Especialidade" value={perfilData?.expertise} />
            </>
        );

      case "patient":
        return (
            <>
              <InfoItem label="CPF" value={formatCpf(user?.cpf)} />
              <InfoItem label="Sexo" value={user?.gender === 'M' ? 'Masculino' : 'Feminino'} />
              <InfoItem label="Telefone" value={formatPhone(user?.phone)} />
              <InfoItem label="Data de Nascimento" value={perfilData?.dateOfBirth} />
              <InfoItem label="Idade" value={perfilData?.age} />
              <InfoItem label="Escolaridade" value={perfilData?.educationLevel} />
              <InfoItem label="Nível Socioeconômico" value={perfilData?.socioeconomicStatus} />
              <InfoItem label="Peso" value={perfilData?.weight ? `${perfilData?.weight} kg` : null} />
              <InfoItem label="Altura" value={perfilData?.height ? `${perfilData?.height} cm` : null} />
              <InfoItem label="Histórico de Queda" value={perfilData?.downFall ? 'Sim' : 'Não'} />
            </>
        );

      default:
        return <p>Perfil desconhecido</p>;
    }
  };

  return (
      <>
        <div className="border border-gray-200 rounded-2xl dark:border-gray-800">
          <div className="p-5 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between lg:p-6">
            <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
              <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                <Image
                    width={80}
                    height={80}
                    src={"/images/user/profile-pic.jpg"}
                    alt="Foto de perfil"
                />
              </div>
              <div className="order-3 xl:order-2">
                <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                  {user?.name}
                </h4>
                <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.profile === "healthProfessional"
                        ? "Profissional da Saúde"
                        : user?.profile === "researcher"
                            ? "Pesquisador"
                            : "Paciente"}
                  </p>
                </div>
              </div>
            </div>
            <button
                onClick={openModal}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <Pencil className="w-4 h-4"/>
              Editar
            </button>
          </div>
          <div className="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Informações Pessoais
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              {renderFields()}
            </div>
          </div>
        </div>

        <UserFormModal
          isOpen={isOpen}
          onClose={closeModal}
          userData={user}
          onSuccess={(updatedData) => {
              closeModal();
              if (updatedData) {
                  // Atualiza os dados no UserMetaCard:
                  onUserUpdated?.(updatedData);
              }
          }}
        />
    </>
  );
}
