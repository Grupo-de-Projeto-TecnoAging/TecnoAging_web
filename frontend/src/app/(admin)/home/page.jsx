import HomeContent from "@/components/pages/home/HomeContent";
import HomePacientContent from "@/components/pages/homePacient/HomePacientContent";
import HomeDashboardPage from "@/app/(admin)/home/HomeDashboardPage";

export const metadata = {
    title: 'Home | Equilibrium',
};

export default function HomePage() {
    return <HomeDashboardPage />;
}