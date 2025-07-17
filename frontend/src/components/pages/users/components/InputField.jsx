import React from "react";
import Input from "@/components/form/input/InputField";

export default function InputField({
                                       name,
                                       label,
                                       type = "text",
                                       step,
                                       register,
                                       errors,
                                       required,
                                       placeholder,
                                   }) {
    return (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <Input
                type={type}
                name={name}
                step={step}
                placeholder={placeholder || label}
                {...register(name)}
            />

            {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
        </div>
    );
}
