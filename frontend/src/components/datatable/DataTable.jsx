'use client';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import React from 'react';
import {
    Search,
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from 'lucide-react';

function getPaginationRange(currentPage, totalPages, maxVisible = 5) {
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(0, currentPage - half);
    let end = start + maxVisible - 1;

    if (end >= totalPages) {
        end = totalPages - 1;
        start = Math.max(0, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
}

export default function DataTable({
                                      data,
                                      columns,
                                      total,
                                      pageIndex,
                                      pageSize,
                                      onPageChange,
                                      onPageSizeChange,
                                      onSearch,
                                      loading,
                                      sortBy,
                                      sortDir,
                                      onSortChange,
                                  }) {
    const table = useReactTable({
        data,
        columns,
        manualPagination: true,
        manualSorting: true,
        pageCount: Math.ceil(total / pageSize),
        onSortingChange: (updater) => {
            const sorting = typeof updater === 'function' ? updater([{ id: sortBy, desc: sortDir === 'desc' }]) : updater;
            const { id, desc } = sorting[0] || {};
            onSortChange?.(id, desc ? 'desc' : 'asc');
        },
        state: {
            pagination: { pageIndex, pageSize },
            sorting: sortBy && sortDir ? [{ id: sortBy, desc: sortDir === 'desc' }] : [],
        },
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: updater => {
            const newState = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
            if (newState.pageIndex !== pageIndex) onPageChange(newState.pageIndex);
            if (newState.pageSize !== pageSize) onPageSizeChange(newState.pageSize);
        },
    });

    const totalPages = Math.ceil(total / pageSize);
    const visiblePages = getPaginationRange(pageIndex, totalPages);
    const navButtonClass =
        'flex items-center justify-center h-9 w-9 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]';

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            {/* Top */}
            <div className="flex flex-col justify-between gap-4 px-6 pb-4 pt-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Mostrar</span>
                    <select
                        value={pageSize}
                        onChange={e => onPageSizeChange(Number(e.target.value))}
                        className="h-9 rounded-md border border-gray-300 bg-transparent px-2 text-sm text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                    >
                        {[5, 10, 20, 50].map(size => (
                            <option key={size} value={size} className="dark:bg-gray-900 dark:text-gray-400">
                                {size}
                            </option>
                        ))}
                    </select>
                    <span className="text-sm text-gray-500 dark:text-gray-400">registros</span>
                </div>

                {onSearch && (
                    <div className="relative w-full sm:w-64">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                          <Search className="h-4 w-4"/>
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            onChange={e => onSearch(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-10 pr-4 text-sm text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/30"
                        />
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="max-w-full overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="border-b px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400"
                                    style={{ width: header.column.columnDef.size }}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {loading ? (
                        [...Array(pageSize)].map((_, rowIndex) => (
                            <tr key={rowIndex} className="animate-pulse">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"/>
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                            >
                                Nenhum registro encontrado
                            </td>
                        </tr>
                    ) : (
                        data.map((_, rowIndex) => {
                            const row = table.getRowModel().rows[rowIndex];
                            return (
                                <tr
                                    key={row?.id || rowIndex}
                                    className="hover:bg-gray-50 dark:hover:bg-white/[0.05]"
                                >
                                    {row?.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="whitespace-nowrap px-6 py-4 text-gray-700 dark:text-gray-300"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>
            {/* Footer */}
            <div
                className="flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-6 py-4 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400 sm:flex-row">
                {loading ? (
                    <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700"/>
                ) : (
                    <p>
                        Mostrando <span className="font-medium">{pageIndex * pageSize + 1}</span> a{' '}
                        <span className="font-medium">{Math.min((pageIndex + 1) * pageSize, total)}</span> de{' '}
                        <span className="font-medium">{total}</span> registros
                    </p>
                )}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onPageChange(0)}
                        disabled={pageIndex === 0}
                        className={navButtonClass}
                        title="Primeira página"
                    ><ChevronsLeft className="h-4 w-4"/>
                    </button>
                    <button
                        onClick={() => onPageChange(pageIndex - 1)}
                        disabled={pageIndex === 0}
                        className={navButtonClass}
                        title="Página anterior"
                    ><ChevronLeft className="h-4 w-4"/>
                    </button>
                    {loading ? (
                        [...Array(5)].map((_, i) => (
                            <div key={i} className="h-9 w-9 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"/>
                        ))
                    ) : (
                        visiblePages.map((page) => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition border 
                                ${
                                    page === pageIndex
                                        ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500 dark:border-blue-400'
                                        : 'text-gray-700 dark:text-gray-400 hover:bg-blue-500/10 hover:text-blue-500 dark:hover:text-blue-400 border-gray-200 dark:border-gray-600'
                                }`}
                            >
                                {page + 1}
                            </button>

                        ))
                    )}
                    <button
                        onClick={() => onPageChange(pageIndex + 1)}
                        disabled={pageIndex >= totalPages - 1}
                        className={navButtonClass}
                        title="Próxima página"
                    ><ChevronRight className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onPageChange(totalPages - 1)}
                        disabled={pageIndex >= totalPages - 1}
                        className={navButtonClass}
                        title="Última página"
                    ><ChevronsRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}