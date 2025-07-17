import * as yup from 'yup';

export const getValidationSchema = (mode) =>
 yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    cpf: yup
        .string()
        .transform((value) => (value ? value.replace(/\D/g, '') : ''))
        .required('CPF é obrigatório')
        .matches(/^\d{11}$/, 'CPF deve conter 11 dígitos'),
     password: yup
         .string()
         .nullable()
         .when([], {
             is: () => mode === 'create',
             then: (schema) =>
                 schema.required('Senha é obrigatória').min(6, 'A senha deve ter no mínimo 6 caracteres'),
             otherwise: (schema) =>
                 schema.notRequired().test(
                     'min-if-filled',
                     'A senha deve ter no mínimo 6 caracteres',
                     (value) => {
                         if (!value) return true;  // <- está vazio? Ok.
                         return value.length >= 6; // <- só testa se preencheu.
                     }
                 ),
         }),
    phone: yup.string().nullable(),
    gender: yup.string().required('Sexo é obrigatório'),
    profile: yup.string().required('Perfil é obrigatório'),
    email: yup.string().when('profile', {
        is: (profile) => profile === 'pesquisador' || profile === 'profissional',
        then: () =>
        yup.string().required('E-mail é obrigatório'),
        otherwise: () => yup.string().nullable(),
    }),
    expertise: yup.string().when('profile', {
        is: (profile) => profile === 'pesquisador' || profile === 'profissional',
        then: () =>
            yup.string().required('Especialidade é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    institution: yup.string().when('profile', {
        is: 'pesquisador',
        then: () =>
            yup.string().required('Instituição é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    fieldOfStudy: yup.string().when('profile', {
        is: 'pesquisador',
        then: () =>
            yup.string().required('Área é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    dateOfBirth: yup.string().when('profile', {
        is: 'paciente',
        then: () =>
            yup.string().required('Data de nascimento é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    educationLevel: yup.string().when('profile', {
        is: 'paciente',
        then: () =>
            yup.string().required('Escolaridade é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    socioeconomicStatus: yup.string().when('profile', {
        is: 'paciente',
        then: () =>
            yup.string().required('Nível Socioeconômico é obrigatório'),
        otherwise: () => yup.string().nullable(),
    }),
    weight: yup.mixed().when('profile', {
        is: 'paciente',
        then: () =>
            yup
                .number()
                .transform((value, originalValue) =>
                    originalValue === '' ? null : Number(originalValue)
                )
                .required('Peso é obrigatório')
                .min(0, 'Peso deve ser positivo'),
        otherwise: () => yup.mixed().nullable(),
    }),
    height: yup.mixed().when('profile', {
        is: 'paciente',
        then: () =>
            yup
                .number()
                .transform((value, originalValue) =>
                    originalValue === '' ? null : Number(originalValue)
                )
                .required('Altura é obrigatória')
                .min(0, 'Altura deve ser positiva'),
        otherwise: () => yup.mixed().nullable(),
    }),
    downFall: yup.string().when('profile', {
        is: 'paciente',
        then: () => yup.string().required('Histórico de queda é obrigatório'),
        otherwise: () => yup.string().nullable(),
    }),
    address_cep: yup.string().when('profile', {
        is: 'paciente',
        then: () => yup.string()
            .transform((value) => (value ? value.replace(/\D/g, '') : ''))
            .required('CEP é obrigatório')
            .length(8, 'CEP deve ter 8 dígitos'),
        otherwise: () => yup.string().nullable(),
    }),
    number: yup.string().when('profile', {
        is: 'paciente',
        then: () => yup.string().required('Número é obrigatório'),
        otherwise: () => yup.string().nullable(),
    }),
    street: yup.string().when('profile', {
        is: 'paciente',
        then: () => yup.string().required('Rua é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    neighborhood: yup.string().when('profile', {
        is: 'paciente',
        then: () => yup.string().required('Bairro é obrigatório'),
        otherwise: () => yup.string().nullable(),
    }),
    city: yup.string().when('profile', {
        is: 'paciente',
        then: () => yup.string().required('Cidade é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    state: yup.string().when('profile', {
        is: 'paciente',
        then: () => yup.string().required('Estado é obrigatório').length(2, 'Estado deve ter 2 letras'),
        otherwise: () => yup.string().nullable(),
    }),
});
