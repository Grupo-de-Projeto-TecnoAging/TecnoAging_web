'use client';

import React, {useEffect, useRef, useState, useCallback} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useSidebar} from '../context/SidebarContext';
import {useFilteredMenu} from '../constants/MenuItens.js';

import {
    ChevronDownIcon,
    User,
    Ellipsis,
} from 'lucide-react';

const AppSidebar = () => {
    const {isExpanded, isMobileOpen, isHovered, setIsHovered} = useSidebar();
    const pathname = usePathname();

    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [subMenuHeight, setSubMenuHeight] = useState({});
    const subMenuRefs = useRef({});

    const isActive = useCallback((path) => path === pathname, [pathname]);
    const { filteredNavItems, filteredOtherItems } = useFilteredMenu();

    const handleSubmenuToggle = (index, menuType) => {
        setOpenSubmenu((prev) =>
            prev && prev.type === menuType && prev.index === index
                ? null
                : {type: menuType, index}
        );
    };

    const renderMenuItems = (items, menuType) => (
        <ul className="flex flex-col gap-4">
            {items.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index, menuType)}
                            className={`menu-item group ${
                                openSubmenu?.type === menuType && openSubmenu?.index === index
                                    ? 'menu-item-active'
                                    : 'menu-item-inactive'
                            } ${
                                !isExpanded && !isHovered
                                    ? 'lg:justify-center'
                                    : 'lg:justify-start'
                            }`}
                        >
              <span
                  className={`${
                      openSubmenu?.type === menuType && openSubmenu?.index === index
                          ? 'menu-item-icon-active'
                          : 'menu-item-icon-inactive'
                  }`}
              >{nav.icon}
              </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className="menu-item-text">{nav.name}</span>
                            )}
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <ChevronDownIcon
                                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                                        openSubmenu?.type === menuType &&
                                        openSubmenu?.index === index
                                            ? 'rotate-180 text-brand-500'
                                            : ''
                                    }`}
                                />
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link
                                href={nav.path}
                                className={`menu-item group ${
                                    isActive(nav.path)
                                        ? 'menu-item-active'
                                        : 'menu-item-inactive'
                                }`}
                            >
                <span
                    className={`${
                        isActive(nav.path)
                            ? 'menu-item-icon-active'
                            : 'menu-item-icon-inactive'
                    }`}
                >
                  {nav.icon}
                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className="menu-item-text">{nav.name}</span>
                                )}
                            </Link>
                        )
                    )}

                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                            ref={(el) => {
                                subMenuRefs.current[`${menuType}-${index}`] = el;
                            }}
                            className="overflow-hidden transition-all duration-300"
                            style={{
                                height:
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? `${subMenuHeight[`${menuType}-${index}`] || 0}px`
                                        : '0px',
                            }}
                        >
                            <ul className="mt-2 space-y-1 ml-9">
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            href={subItem.path}
                                            className={`menu-dropdown-item ${
                                                isActive(subItem.path)
                                                    ? 'menu-dropdown-item-active'
                                                    : 'menu-dropdown-item-inactive'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                  <span
                                                      className={`${
                                                          isActive(subItem.path)
                                                              ? 'menu-item-icon-active'
                                                              : 'menu-item-icon-inactive'
                                                      }`}
                                                  >
                                                    {subItem.icon}
                                                  </span>
                                                <span>{subItem.name}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    useEffect(() => {
        let submenuMatched = false;

        ['main', 'others'].forEach((menuType) => {
            const items = menuType === 'main' ? filteredNavItems : filteredOtherItems;
            items.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({type: menuType, index});
                            submenuMatched = true;
                        }
                    });
                }
            });
        });

        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [pathname, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            const el = subMenuRefs.current[key];
            if (el) {
                setSubMenuHeight((prev) => ({
                    ...prev,
                    [key]: el.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-blue-600 dark:bg-gray-900 dark:border-gray-800 text-white h-screen transition-all duration-300 ease-in-out z-50 border-r border-bg-blue-600 
        ${
                isExpanded || isMobileOpen
                    ? 'w-[290px]'
                    : isHovered
                        ? 'w-[290px]'
                        : 'w-[90px]'
            }
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`py-8 flex ${
                    !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                }`}
            >
                <Link href="/">
                    {isExpanded || isHovered || isMobileOpen ? (
                        <>
                            <Image
                                className="dark:hidden"
                                src="/images/logo/logo-bg-white.png"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                            <Image
                                className="hidden dark:block"
                                src="/images/logo/logo-bg-blue.png"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                        </>
                    ) : (
                        <>
                            <Image
                                className="dark:hidden"
                                src="/images/logo/logo-icon-bg-white.png"
                                alt="Logo"
                                width={32}
                                height={32}
                            />
                            <Image
                                className="hidden dark:block"
                                src="/images/logo/logo-icon-bg-blue.png"
                                alt="Logo"
                                width={32}
                                height={32}
                            />
                        </>
                    )}
                </Link>
            </div>

            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-300 ${
                                    !isExpanded && !isHovered
                                        ? 'lg:justify-center'
                                        : 'justify-start'
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? (
                                    'Menu'
                                ) : (
                                    <Ellipsis/>
                                )}
                            </h2>
                            {renderMenuItems(filteredNavItems, 'main')}
                        </div>
                        {/*<div>*/}
                        {/*    <h2*/}
                        {/*        className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-300 ${*/}
                        {/*            !isExpanded && !isHovered*/}
                        {/*                ? 'lg:justify-center'*/}
                        {/*                : 'justify-start'*/}
                        {/*        }`}*/}
                        {/*    >*/}
                        {/*        {isExpanded || isHovered || isMobileOpen ? (*/}
                        {/*            'Outros'*/}
                        {/*        ) : (*/}
                        {/*            <Ellipsis/>*/}
                        {/*        )}*/}
                        {/*    </h2>*/}
                        {/*    {renderMenuItems(filteredNavItems, 'others')}*/}
                        {/*</div>*/}
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;