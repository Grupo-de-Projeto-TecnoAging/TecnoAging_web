import Card from "@/components/card";
import { CalendarClock, ClipboardCheck, Users } from "lucide-react";

function HeaderCards({ totalPacients, totalEvaluations, monthEvaluations}) {
    return (
        <div className="w-full flex flex-row gap-4 justify-between">
            {/* Pacientes */}
            <Card.Root className="relative overflow-hidden flex-1 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <Card.BackgroundIcon className="absolute right-4 bottom-4 opacity-10 text-blue-400 dark:text-blue-600">
                    <Users size={80} />
                </Card.BackgroundIcon>
                <Card.Icon className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 z-10">
                    <Users size={22} />
                </Card.Icon>
                <Card.Content
                    title="Pacientes"
                    content={totalPacients || 0}
                    className="z-10 relative mt-3"
                />
            </Card.Root>

            {/* Avaliações */}
            <Card.Root className="relative overflow-hidden flex-1 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <Card.BackgroundIcon className="absolute right-4 bottom-4 opacity-10 text-green-400 dark:text-green-600">
                    <ClipboardCheck size={80} />
                </Card.BackgroundIcon>
                <Card.Icon className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 z-10">
                    <ClipboardCheck size={22} />
                </Card.Icon>
                <Card.Content
                    title="Avaliações"
                    content={totalEvaluations || 0}
                    className="z-10 relative mt-3"
                />
            </Card.Root>

            {/* Avaliações do mês */}
            <Card.Root className="relative overflow-hidden flex-1 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <Card.BackgroundIcon className="absolute right-4 bottom-4 opacity-10 text-yellow-400 dark:text-yellow-600">
                    <CalendarClock size={80} />
                </Card.BackgroundIcon>
                <Card.Icon className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 z-10">
                    <CalendarClock size={22} />
                </Card.Icon>
                <Card.Content
                    title="Avaliações do Mês"
                    content={monthEvaluations || 0}
                    className="z-10 relative mt-3"
                />
            </Card.Root>
        </div>
    );
}

export default HeaderCards;