import { useState } from "react";
import HeaderCards from "./HeaderCards";
import MonthlyEvaluationsChart from "../home/MonthlyEvaluationsChart";
import DataExport from "./DataExport";
import StatisticsChart from "../home/StatisticsChart";
import Button from "@/components/ui/button/Button";
import { ToggleGroup } from "@/components/ui/toggleButton/ToggleGroup";
import { ToggleOption } from "@/components/ui/toggleButton/ToggleOption";

function HomeResearchContent() {

    const [filter, setFilter] = useState("all");

    const [totalPacients, setTotalPacients] = useState(0);
    const [totalEvaluations, setTotalEvaluations] = useState(0);
    const [monthEvaluations, setMonthEvaluations] = useState(0);

    return (
        <div className="p-6 text-black dark:text-gray-300 flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Painel do Pesquisador</h1>
                <Button> Exportar Dados</Button>
            </div>
            <div>
                <ToggleGroup value={filter} onValueChange={setFilter} className="mb-6">
                    <ToggleOption value="all">Todos</ToggleOption>
                    <ToggleOption value="tug">TUG</ToggleOption>
                    <ToggleOption value="5tsts">5TSTS</ToggleOption>
                </ToggleGroup>
            </div>
            <HeaderCards
                monthEvaluations={monthEvaluations}
                totalEvaluations={totalEvaluations}
                totalPacients={totalPacients}
            />
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-4">
                    <MonthlyEvaluationsChart data={[]} />
                </div>
                <div className="col-span-1">
                    <DataExport />
                </div>
            </div>
            <StatisticsChart />
        </div>
    );
}

export default HomeResearchContent;