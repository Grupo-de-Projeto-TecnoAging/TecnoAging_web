import { useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import {Calendar} from 'lucide-react';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';

export default function DatePicker({
                                       id,
                                       mode,
                                       onChange,
                                       defaultDate,
                                       placeholder,
                                   }) {
    useEffect(() => {
        const flatPickr = flatpickr(`#${id}`, {
            mode: mode || "single",
            static: true,
            monthSelectorType: "static",
            dateFormat: "d/m/Y",
            defaultDate,
            onChange,
            locale: Portuguese,
        });

        return () => {
            if (!Array.isArray(flatPickr)) {
                flatPickr.destroy();
            }
        };
    }, [mode, onChange, id, defaultDate]);

    return (
        <div>
            <div className="relative">
                <input
                    id={id}
                    placeholder={placeholder}
                    className="block w-full rounded-lg border px-3 py-2 text-sm shadow-theme-xs dark:bg-gray-900 dark:text-white/90 dark:border-gray-700 border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400"><Calendar className="size-6"/></span>
            </div>
        </div>
    );
}
