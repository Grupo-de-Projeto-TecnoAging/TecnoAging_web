import { ClipboardCheck, Users, Timer, Activity } from "lucide-react";

export default function TopInfoCards({
                                         total,
                                         tempoTotal,
                                         mediaDuracao,
                                         classificacao,
                                         variacaoTotal = 0,
                                         variacaoTempo = 0,
                                         variacaoDuracao = 0,
                                         variacaoTextoClassificacao = "sem mudanças"
                                     }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
            {/* Total de Avaliações */}
            <Card
                icon={<ClipboardCheck className="w-4 h-4" />}
                label="Avaliações Realizadas"
                value={total}
                variacao={variacaoTotal}
                variacaoLabel="este mês"
            />

            {/* Tempo Total Avaliado */}
            <Card
                icon={<Timer className="w-4 h-4" />}
                label="Tempo Avaliado"
                value={tempoTotal}
                variacao={variacaoTempo}
                variacaoLabel="comparado ao mês anterior"
            />

            {/* Classificação Geral */}
            <Card
                icon={<Users className="w-4 h-4" />}
                label="Classificação Geral"
                value={classificacao}
                variacao="↔"
                variacaoLabel={variacaoTextoClassificacao}
                valueColor={getColorClass(classificacao)}
                badgeColor={getBgColorClass(classificacao)}
            />

            {/* Duração Média dos Testes */}
            <Card
                icon={<Activity className="w-4 h-4" />}
                label="Duração Média dos Testes"
                value={`${mediaDuracao}`}
                variacao={`${variacaoDuracao > 0 ? '-' : '+'}${Math.abs(variacaoDuracao)}s`}
                variacaoLabel={variacaoDuracao > 0 ? "mais rápido" : "mais lento"}
            />
        </div>
    );
}

// Card Component
function Card({ icon, label, value, variacao, variacaoLabel, valueColor = "text-gray-800", badgeColor = "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500" }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-gray-500 text-theme-sm dark:text-gray-400 flex items-center gap-2">{icon} {label}</p>
            <div className="flex items-end justify-between mt-3">
                <h4 className={`text-2xl font-bold ${valueColor} dark:text-white/90`}>{value}</h4>
                <div className="flex items-center gap-1">
          <span className={`inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-sm ${badgeColor}`}>
            <span className="text-xs">{typeof variacao === 'string' ? variacao : `${variacao >= 0 ? '+' : ''}${variacao ?? 0}%`}</span>
          </span>
                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">{variacaoLabel}</span>
                </div>
            </div>
        </div>
    );
}

// Helpers
function getColorClass(label) {
    switch (label) {
        case 'Excelente': return 'text-green-600';
        case 'Bom': return 'text-blue-600';
        case 'Regular': return 'text-yellow-600';
        case 'Ruim': return 'text-orange-600';
        case 'Crítico': return 'text-red-600';
        default: return 'text-gray-600';
    }
}

function getBgColorClass(label) {
    switch (label) {
        case 'Excelente': return 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-400';
        case 'Bom': return 'bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-400';
        case 'Regular': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-400';
        case 'Ruim': return 'bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-400';
        case 'Crítico': return 'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-500/15 dark:text-gray-300';
    }
}
