"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";

type FormInputProps = {
    type: string;
    id: string;
    name: string;
    label: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
};

const AuthFormInput = ({
    type,
    id,
    name,
    label,
    placeholder,
    register,
    errors,
}: FormInputProps) => {
    return (
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
            <label htmlFor={id}>{label}</label>
            <div className="flex flex-col gap-1 w-full sm:w-fit sm:ml-auto">
                <input
                    type={type}
                    id={id}
                    {...register(name)}
                    placeholder={placeholder}
                    className="bg-slate-800 autofill:bg-none autofill:bg-slate-800 border-none rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 ml-auto w-full sm:w-max"
                    autoComplete="off"
                />
                {errors[name] && <span className="text-xs text-red-300">{errors[name]?.message as string}</span>}
            </div>
        </div>
    );
};

export default AuthFormInput;
