'use client';

import React, { createContext, useContext } from 'react';
import clsx from 'clsx';

const FilterContext = createContext(null);

export function useFilterContext() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('FilterOption deve estar dentro de <ToggleGroup>');
  return ctx;
}

export function ToggleGroup({ value, onValueChange, children, className }) {
  return (
    <FilterContext.Provider value={{ value, onValueChange }}>
      <div
        role="tablist"
        className={clsx('flex items-center space-x-2', className)}
      >
        {children}
      </div>
    </FilterContext.Provider>
  );
}
