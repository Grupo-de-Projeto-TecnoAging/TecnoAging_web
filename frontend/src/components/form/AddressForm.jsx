import { useEffect } from "react";
import { InputMask } from '@react-input/mask';
import { Controller } from 'react-hook-form';

export default function AddressForm({ register, errors, setValue, watch, control }) {
    const watchCep = watch("address_cep");

    useEffect(() => {
        const cleanedCep = watchCep?.replace(/\D/g, '');
        if (cleanedCep?.length === 8) {
            fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`)
                .then((res) => res.json())
                .then((data) => {
                    if (!data.erro) {
                        setValue('street', data.logradouro || '');
                        setValue('neighborhood', data.bairro || '');
                        setValue('city', data.localidade || '');
                        setValue('state', data.uf || '');
                    }
                })
                .catch((err) => console.error("Erro ao buscar CEP:", err));
        }
    }, [watchCep, setValue]);

    function formatCep(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 9);
    }

    return (
        <div>
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">Endereço</h5>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        CEP <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="address_cep"
                        control={control}
                        render={({ field }) => {
                            let safeValue = field.value ?? '';
                            if (safeValue && safeValue.replace(/\D/g, '').length === 8) {
                                safeValue = formatCep(safeValue);
                            }
                            return (
                                <InputMask
                                    {...field}
                                    value={safeValue}
                                    mask="_____-___"
                                    replacement={{ _: /\d/ }}
                                    placeholder="CEP"
                                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                            />
                        );
                        }}
                    />
                    {errors.address_cep && (
                        <span className="text-red-500 text-sm">{errors.address_cep.message}</span>
                    )}
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Número <span className="text-red-500">*</span>
                    </label>
                    <input {...register("number")} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800" placeholder="Número" />
                    {errors.number && <span className="text-red-500 text-sm">{errors.number.message}</span>}
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Rua <span className="text-red-500">*</span>
                    </label>
                    <input {...register("street")} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800" placeholder="Rua" />
                    {errors.street && <span className="text-red-500 text-sm">{errors.street.message}</span>}
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Complemento
                    </label>
                    <input {...register("complement")} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800" placeholder="Complemento" />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Bairro <span className="text-red-500">*</span>
                    </label>
                    <input {...register("neighborhood")} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800" placeholder="Bairro" />
                    {errors.neighborhood && <span className="text-red-500 text-sm">{errors.neighborhood.message}</span>}
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Cidade <span className="text-red-500">*</span>
                    </label>
                    <input {...register("city")} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800" placeholder="Cidade" />
                    {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Estado (UF) <span className="text-red-500">*</span>
                    </label>
                    <input {...register("state")} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800" placeholder="Estado" />
                    {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
                </div>
            </div>
        </div>
    );
}
