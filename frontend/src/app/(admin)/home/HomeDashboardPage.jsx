'use client'
import {useSession} from "next-auth/react";
import HomePacientContent from "@/components/pages/homePacient/HomePacientContent";
import HomeContent from "@/components/pages/home/HomeContent";
import HomeResearchContent from "@/components/pages/homeResearch/HomeResearchContent";

export default function HomeDashboardPage() {
    
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div className="p-6 text-gray-500 dark:text-gray-300">Carregando...</div>;
    }


    if (!session) {
        return <div className="p-6 text-red-500">Usuário não autenticado</div>;
    }

    const tipo = session?.user?.profile || 'researcher';

    return tipo === 'patient' ? <HomePacientContent /> : tipo === 'researcher' ? <HomeResearchContent /> : <HomeContent />;
}
