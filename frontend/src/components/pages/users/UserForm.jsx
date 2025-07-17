'use client';

import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Radio from '@/components/form/input/Radio';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidationSchema } from './ValidationSchema';
import Button from '@/components/ui/button/Button';
import AddressForm from "@/components/form/AddressForm";
import InputField from "@/components/pages/users/components/InputField";
import { Pessoa } from "@/models/Pessoa";
import { api } from "@/services/apiPerson";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InputMask, format } from '@react-input/mask';

export default function UserForm({ onSuccess, initialData = {}, mode = 'create' }) {
    const [profile, setProfile] = useState(initialData.profile || 'pesquisador');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        control,
        register,
        setValue,
        watch,
        reset,
        getValues,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(getValidationSchema(mode)),
        mode: 'onChange',
        defaultValues: {
            profile: mode === 'create' ? 'pesquisador' : initialData.profile,
            ...initialData
        }
    });

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            const perfilData = initialData.perfilData || {};
            const profileMapped = mapProfile(initialData.profile);

            reset({
                ...initialData,
                ...perfilData,
                password: '',
                cpf: formatCpf(initialData.cpf),
                phone: formatPhone(initialData.phone),
                address_cep: formatCep(perfilData.cep),
                profile: profileMapped
            });

            setProfile(profileMapped);
        }
    }, [initialData, reset]);

    function mapProfile(apiProfile) {
        if (apiProfile === 'researcher') return 'pesquisador';
        if (apiProfile === 'healthProfessional') return 'profissional';
        return 'paciente';
    }

    const calcularIdade = (dateOfBirth) => {
        if (!dateOfBirth) return null;
        const hoje = new Date();
        const nascimento = new Date(dateOfBirth);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = getValues();

        try {
            const pessoa = new Pessoa(formData, profile);

            let pessoaPayload = {
                ...pessoa.toJSON(),
            };

            if (profile === 'paciente') {
                const [year, month, day] = formData.dateOfBirth.split('-');
                const passwordNascimento = `${day}${month}${year}`;
                 setValue('password', passwordNascimento);
                formData.password = passwordNascimento;
                pessoaPayload = {
                    ...pessoaPayload,
                    dateOfBirth: formData.dateOfBirth,
                    educationLevel: formData.educationLevel,
                    socioeconomicStatus: formData.socioeconomicStatus,
                    cep: formData.address_cep,
                    street: formData.street,
                    number: formData.number,
                    neighborhood: formData.neighborhood,
                    city: formData.city,
                    state: formData.state,
                    weight: formData.weight ? parseFloat(formData.weight) : null,
                    height: formData.height ? parseFloat(formData.height) : null,
                    age: formData.dateOfBirth ? calcularIdade(formData.dateOfBirth) : null,
                    downFall: formData.downFall ? formData.downFall === true : false,
                    password: passwordNascimento,
                };
            }

            if (profile === 'pesquisador') {
                pessoaPayload = {
                    ...pessoaPayload,
                    institution: formData.institution,
                    fieldOfStudy: formData.fieldOfStudy,
                    expertise: formData.expertise,
                    email: formData.email,
                };
            }

            if (profile === 'profissional') {
                pessoaPayload = {
                    ...pessoaPayload,
                    expertise: formData.expertise,
                    email: formData.email,
                };
            }

            const isValid = await trigger();

            if (!isValid) {
                toast.error('Por favor, preencha todos os campos obrigatórios corretamente.');
                setLoading(false);
                return;
            }

            if (mode === 'create') {
                await api.createPerson(pessoaPayload);
                toast.success('Usuário cadastrado com sucesso!');
            } else {
                await api.updatePerson(pessoa.cpf, pessoaPayload);
                toast.success('Usuário atualizado com sucesso!');
            }

            reset();

            if (onSuccess) {
                onSuccess(pessoaPayload);
            } else {
                router.push('/users');
            }
        } catch (error) {
            toast.error(`Erro ao ${mode === 'create' ? 'cadastrar' : 'atualizar'} usuário: ${error}`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Utils
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
        let digits = value.replace(/\D/g, '');


        if (digits.length < 11) {
            digits = digits.padEnd(11, '0');
        }


        return digits
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
    }

    function formatCep(value) {
        if (!value) return '';
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2');
    }

    return (
        <form onSubmit={handleSubmitForm} className="space-y-6">
            {/* Profile */}
            <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Tipo de Usuário <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 justify-evenly">
                    {['pesquisador', 'profissional', 'paciente'].map((tipo) => (
                        <Radio
                            key={tipo}
                            name="profile"
                            value={tipo}
                            label={tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                            checked={profile === tipo}
                            disabled={mode === 'edit'}
                            onChange={() => {
                                setProfile(tipo);
                                setValue('profile', tipo);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Common Data */}
            <div className="grid md:grid-cols-2 gap-6">
                <InputField name="name" label="Nome" required register={register} errors={errors} />
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        CPF <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="cpf"
                        control={control}
                        render={({ field }) => {
                            let safeValue = field.value ?? '';
                            if (safeValue && safeValue.length === 11) {
                                safeValue = formatCpf(safeValue);
                            }
                            return (
                                <InputMask
                                    {...field}
                                    mask="___.___.___-__"
                                    replacement={{ _: /\d/ }}
                                    value={safeValue}
                                    placeholder="CPF"
                                    readOnly={mode === 'edit'}
                                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700"
                                />
                            );
                        }}
                    />
                    {errors.cpf && <span className="text-red-500 text-sm">{errors.cpf.message}</span>}
                </div>
                {profile !== 'paciente' && (
                    <InputField
                        name="password"
                        type="password"
                        label="Senha"
                        required={mode === 'create' && profile !== 'paciente'}
                        register={register}
                        errors={errors}
                    />
                )}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Telefone</label>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => {
                            let safeValue = field.value ?? '';
                            if (safeValue && safeValue.length === 11) {
                                safeValue = formatPhone(safeValue);
                            }
                            return (
                                <InputMask
                                    {...field}
                                    mask="(__) _____-____?"
                                    replacement={{ _: /\d/ }}
                                    value={safeValue}
                                    placeholder="Telefone"
                                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700"
                                />
                            );
                        }}
                    />

                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Sexo <span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                        <Radio name="gender" value="M" label="Masculino" checked={watch("gender") === "M"} onChange={() => setValue("gender", "M")} />
                        <Radio name="gender" value="F" label="Feminino" checked={watch("gender") === "F"} onChange={() => setValue("gender", "F")} />
                    </div>
                    {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
                </div>
            </div>

            {/* Specific Data */}
            {profile === 'pesquisador' && (
                <div className="grid md:grid-cols-2 gap-6">
                    <InputField name="email" label="Email" required register={register} errors={errors} />
                    <InputField name="expertise" label="Especialidade" required register={register} errors={errors} />
                    <InputField name="institution" label="Instituição" required register={register} errors={errors} />
                    <InputField name="fieldOfStudy" label="Área" required register={register} errors={errors} />
                </div>
            )}

            {profile === 'profissional' && (
                <div className="grid md:grid-cols-2 gap-6">
                    <InputField name="email" label="Email" required register={register} errors={errors} />
                    <InputField name="expertise" label="Especialidade" required register={register} errors={errors} />
                </div>
            )}

            {profile === 'paciente' && (
                <>
                    <div className="grid md:grid-cols-2 gap-6">
                        <InputField name="dateOfBirth" type="date" label="Data de Nascimento" required register={register} errors={errors} />
                        <InputField name="educationLevel" label="Escolaridade" required register={register} errors={errors} />
                        <InputField name="socioeconomicStatus" label="Nível Socioeconômico" required register={register} errors={errors} />
                        <InputField name="weight" type="number" step="0.01" label="Peso (kg)" required register={register} errors={errors} />
                        <InputField name="height" type="number" step="0.01" label="Altura (m)" required register={register} errors={errors} />
                        <div>
                            <label className="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Histórico de Queda <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-4">
                                <Radio
                                    name="downFall"
                                    value="false"
                                    label="Não"
                                    checked={watch('downFall') === false}
                                    onChange={() => setValue('downFall', false)}
                                />
                                <Radio
                                    name="downFall"
                                    value="true"
                                    label="Sim"
                                    checked={watch('downFall') === true}
                                    onChange={() => setValue('downFall', true)}
                                />
                            </div>
                            {errors.downFall && <span className="text-red-500 text-sm">{errors.downFall.message}</span>}
                        </div>
                    </div>

                    <AddressForm
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                        control={control}
                    />
                </>
            )}

            <div className="flex justify-end">
                <Button type="submit" className="w-full sm:w-auto">
                    {mode === 'create' ? 'Cadastrar' : 'Salvar alterações'}
                </Button>
            </div>
        </form>
    );
}
