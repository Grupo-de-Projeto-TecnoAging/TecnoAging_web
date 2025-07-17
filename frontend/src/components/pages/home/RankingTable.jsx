export default function RankingTable({ title, data }) {
    const getBadgeColor = (index) => {
        if (index === 0) return "bg-green-100 text-green-600";
        if (index === 1) return "bg-green-50 text-green-500";
        if (index === 2) return "bg-warning-100 text-yellow-600";
        return "bg-red-100 text-red-600";
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-5 pt-5 mb-4 sm:px-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    {title}
                </h3>
            </div>

            <div className="overflow-hidden">
                <div className="max-w-full overflow-x-auto px-5 sm:px-6">
                    <table className="min-w-full text-sm">
                        <thead className="border-y border-gray-200 dark:border-gray-800">
                        <tr>
                            <th className="py-3 text-left font-medium text-gray-500 dark:text-gray-400">Posição</th>
                            <th className="py-3 text-left font-medium text-gray-500 dark:text-gray-400">Nome</th>
                            <th className="py-3 text-left font-medium text-gray-500 dark:text-gray-400">Data</th>
                            <th className="py-3 text-left font-medium text-gray-500 dark:text-gray-400">Tempo</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td className="py-3">
                    <span
                        className={`inline-block px-5 py-4 rounded-full font-medium text-sm ${getBadgeColor(idx)}`}
                    >
                      {idx + 1}º
                    </span>
                                </td>
                                <td className="py-3 text-gray-800 dark:text-white/90">{item.name}</td>
                                <td className="py-3 text-gray-600 dark:text-gray-400">{formatDate(item.date)}</td>
                                <td className="py-3 text-gray-800 dark:text-white/90">{item.time.toFixed(2)}s</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("pt-BR");
}
