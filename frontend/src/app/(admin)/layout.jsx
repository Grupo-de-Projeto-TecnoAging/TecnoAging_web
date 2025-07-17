'use client';

import React from 'react';
import { useSidebar } from '@/context/SidebarContext';
import AppHeader from '@/layout/AppHeader';
import AppSidebar from '@/layout/AppSidebar';
import Backdrop from '@/layout/Backdrop';

export default function AdminLayout({ children }) {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    const mainContentMargin = isMobileOpen
        ? 'ml-0'
        : isExpanded || isHovered
            ? 'lg:ml-[290px]'
            : 'lg:ml-[90px]';

    return (
        <div className="min-h-screen xl:flex">
            {/* Sidebar and Backdrop */}
            <AppSidebar />
            <Backdrop />

            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
                <AppHeader />
                <div className="p-2 mx-auto md:p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
