'use client';
import clsx from "clsx";
import { useFilterContext } from "./ToggleGroup";
import Button from "../button/Button";

export function ToggleOption({ value, children, className }) {

    const { value: current, onValueChange } = useFilterContext();
    const selected = current === value;

    return (
        <Button
            role="tab"
            aria-selected={selected}
            type="button"
            onClick={() => onValueChange(value)}
            className={clsx(
                "px-4 py-2 text-sm font-medium rounded-lg transition",
                selected
                    ? "!bg-blue-500 !text-white"
                    : "!bg-transparent !text-black !shadow border !border-gray-300 hover:!bg-gray-100",
                className
            )}
        >
            {children}
        </Button>
    );
}