import {
    Home,
    User,
    Users,
    BarChart3,
    ListCheck,
    Hospital
} from 'lucide-react';
import {useSession} from "next-auth/react";

export function useFilteredMenu() {
    const { data: session } = useSession();

    const profile = session?.user?.profile || "researcher"; // Default to 'researcher' if profile is not set
    console.log('Profile:', session);

    const navItems = [
        {
            icon: <Home size={18} />,
            name: 'Home',
            path: '/home',
            roles: ['healthProfessional', 'patient', 'researcher'],
        },
        {
            icon: <Users size={18} />,
            name: 'Usuários',
            path: '/users',
            roles: ['healthProfessional', 'researcher'],
        },
        {
            icon: <User size={18} />,
            name: 'Perfil',
            path: '/users/profile/me',
            roles: ['healthProfessional', 'researcher'],
        },
        {
            icon: <ListCheck size={18} />,
            name: 'Avaliações',
            path: '/evaluations',
            roles: ['researcher', 'patient', 'researcher'],
        },
        {
            icon: <Hospital size={18} />,
            name: 'Unidade(s) de saúde',
            path: '/healthUnit',
            roles: ['researcher'],
        },
        {
            icon: <BarChart3 size={18} />,
            name: 'Análise da População',
            path: '/population-analysis',
            roles: ['researcher'],
        }

    ];

    const othersItems = [
        {
            icon: <BarChart3 size={18} />,
            name: 'Exemplo',
            roles: ['admin'],
            subItems: [
                { name: 'Exemplo sub menu', path: '/exemplo-1', pro: false },
                { name: 'Exemplo sub menu 2', path: '/exemplo-2', pro: false },
            ],
        },
    ];

    const filteredNavItems = navItems.filter(item =>
        item.roles.includes(profile)
    );
    const filteredOtherItems = othersItems.filter(item =>
        item.roles.includes(profile)
    );

    return { filteredNavItems, filteredOtherItems };
}