'use client';

import { useEffect, useState } from "react";
import { TotalUserAndEvaluations } from "@/components/pages/home/TotalUserAndEvaluations";
import MonthlyTarget from "@/components/pages/home/MontlyTarget";
import MonthlyEvaluationsChart from "@/components/pages/home/MonthlyEvaluationsChart";
import StatisticsChart from "@/components/pages/home/StatisticsChart";
import RankingPage from "@/components/pages/home/RankingPage";
import { api } from "@/services/apiPerson";
import { api as evaluationApi } from "@/services/apiEvaluations";

export default function HomeContent() {
    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalEvaluations, setTotalEvaluations] = useState(0);
    const [evaluations, setEvaluations] = useState([]);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const todayStr = now.toISOString().split("T")[0];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const people = await api.getAllPersons();
                const evaluationsData = await evaluationApi.getEvaluations();

                setTotalUsers(people.length);
                setTotalEvaluations(evaluationsData.length);
                setEvaluations(evaluationsData);
            } catch (err) {
                console.error("Erro ao carregar dados da home:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const monthlyEvaluations = evaluations.filter(ev => {
        const date = new Date(ev.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const todaysEvaluations = evaluations.filter(ev =>
        ev.date.startsWith(todayStr)
    );

    const atual = monthlyEvaluations.length;
    const hoje = todaysEvaluations.length;

    const evaluationsByMonth = Array(12).fill(0);
    const average5sts = Array.from({ length: 12 }, () => []);
    const averageTug = Array.from({ length: 12 }, () => []);

    evaluations.forEach(ev => {
        const date = new Date(ev.date);
        const month = date.getMonth();
        const seconds = convertToRealSeconds(ev.totalTime);

        evaluationsByMonth[month] += 1;

        if (ev.type === "5TSTS") average5sts[month].push(seconds);
        if (ev.type === "TUG") averageTug[month].push(seconds);
    });

    const normalize = arr => arr.map(v => v ? Number(v.toFixed(1)) : 0.0);
    const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

    const average5stsByMonth = normalize(
        average5sts.map(group => group.length ? average(group) : null)
    );

    const averageTugByMonth = normalize(
        averageTug.map(group => group.length ? average(group) : null)
    );

    const top5sts = getTopRanking(evaluations, "5TSTS");
    const topTug = getTopRanking(evaluations, "TUG");

    if (loading) {
        return (
            <div className="grid grid-cols-12 gap-4 md:gap-6 p-6 animate-pulse">
                <div className="col-span-12 xl:col-span-7 space-y-6">
                    <div className="h-24 rounded-xl bg-gray-200 w-full" />
                    <div className="h-[280px] rounded-xl bg-gray-200 w-full" />
                </div>
                <div className="col-span-12 xl:col-span-5">
                    <div className="h-[370px] rounded-xl bg-gray-200 w-full" />
                </div>
                <div className="col-span-12">
                    <div className="h-[320px] rounded-xl bg-gray-200 w-full" />
                </div>
                <div className="col-span-12">
                    <div className="h-[400px] rounded-xl bg-gray-200 w-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6 xl:col-span-7">
                <TotalUserAndEvaluations
                    totalUser={totalUsers}
                    totalEvaluations={totalEvaluations}
                />
                <MonthlyEvaluationsChart data={evaluationsByMonth} />
            </div>

            <div className="col-span-12 xl:col-span-5">
                <MonthlyTarget total={100} atual={atual} hoje={hoje} />
            </div>

            <div className="col-span-12">
                <StatisticsChart
                    data={{
                        fiveTSTS: average5stsByMonth,
                        tug: averageTugByMonth,
                    }}
                />
            </div>

            <div className="col-span-12">
                <RankingPage data={{ fiveTSTS: top5sts, tug: topTug }} />
            </div>
        </div>
    );
}

function convertToRealSeconds(timeStr) {
    const [, minutes] = timeStr.split(":").map(Number);
    return minutes;
}

function average(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function getTopRanking(data, type) {
    return data
        .filter(ev => ev.type === type)
        .map(ev => ({
            name: ev.cpfPatient,
            time: convertToRealSeconds(ev.totalTime),
            date: ev.date,
        }))
        .sort((a, b) => a.time - b.time)
        .slice(0, 5);
}
