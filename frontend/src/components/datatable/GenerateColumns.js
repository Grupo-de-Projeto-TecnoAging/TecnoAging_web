import { ArrowUp, ArrowDown } from 'lucide-react';

function SortableHeader({ column, title }) {
    const isSorted = column.getIsSorted();

    return (
        <button
            onClick={() => column.toggleSorting(isSorted === 'asc')}
            className="flex items-center gap-1"
        >
            <span>{title}</span>
            <div className="flex items-center ml-1 space-x-0.5">
                <ArrowUp
                    className={`w-3 h-3 transition-transform ${
                        isSorted === 'asc' ? 'text-blue-500' : 'text-gray-400'
                    }`}
                    style={{ transform: 'scaleY(1.5)' }}
                />
                <ArrowDown
                    className={`w-3 h-3 transition-transform ${
                        isSorted === 'desc' ? 'text-blue-500' : 'text-gray-400'
                    }`}
                    style={{ transform: 'scaleY(1.5)' }}
                />
            </div>
        </button>
    );
}

export function generateColumns(config) {
    return config.map(col => ({
        accessorKey: col.accessorKey,
        enableSorting: !!col.enableSorting,
        size: col.size || undefined,
        header: col.enableSorting
            ? ({ column }) => <SortableHeader column={column} title={col.title} />
            : col.title,
        ...(col.cell && { cell: col.cell }),
    }));
}
