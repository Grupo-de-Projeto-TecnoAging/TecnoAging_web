"use client";
import React from "react";

export default function UserAddressCard({ user }) {
  if (user?.profile !== 'patient') {
    return null;
  }

  const perfilData = user?.perfilData || {};

  return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Endereço
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  Rua
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {perfilData.street || "Sem informações"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  Número
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {perfilData.number || "Sem informações"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  Bairro
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {perfilData.neighborhood || "Sem informações"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  Cidade/Estado
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {perfilData.city || "Sem informações"}, {perfilData.state || "Sem informações"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  CEP
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {perfilData.cep || "Sem informações"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
