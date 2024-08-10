import React from "react";
import { UseFormRegister } from "react-hook-form";
import Icon from "../icons";

interface SelectOption {
    value: number;
    label: string;
}

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    name: string;
    options: SelectOption[];
    containerClassName?: string;
    error?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
};

const Select: React.FC<Props> = ({
    containerClassName,
    className,
    children,
    name,
    error,
    options,
    register,
    ...props
}) => {
    return (
        <div className={`flex flex-col gap-1 ${containerClassName}`}>
            <label htmlFor={name}>{children}</label>
            <select
                {...register(name)}
                {...props}
                className={`rounded-md mt-1 h-12 focus-visible:outline-none text-[14px] border-[1px]  
                            px-[23px] focus:shadow-input transition-all duration-500
                            ${error ? "border-[#800D0D]" : "border-gray-3"}
                            ${className}`}
            >
                <option value="">Selecione um valor</option>
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        {...(props.value === option.value && {
                            selected: true,
                        })}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <span className="flex items-center text-[#800D0D] text-xs font-normal">
                    <Icon name="clear" className="mr-2" />
                    {error}
                </span>
            )}
        </div>
    );
};

export default Select;
