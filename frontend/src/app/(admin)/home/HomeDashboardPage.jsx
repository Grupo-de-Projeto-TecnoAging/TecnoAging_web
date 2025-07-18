'use client'
import {useSession} from "next-auth/react";
import HomePacientContent from "@/components/pages/homePacient/HomePacientContent";
import HomeResearchContent from "@/components/pages/homeResearch/HomeResearchContent";
import HomeHealth from "@/components/pages/homeHealth/HomeContent";

export default function HomeDashboardPage() {
    
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div className="p-6 text-gray-500 dark:text-gray-300">Carregando...</div>;
    }


    if (!session) {
        return <div className="p-6 text-red-500">Usuário não autenticado</div>;
    }

    const tipo = session?.user?.profile || 'researcher';

    return tipo === 'patient' ? <HomePacientContent /> : tipo === 'researcher' ? <HomeResearchContent /> : <HomeHealth />;
}
