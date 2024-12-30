import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Icon from "../icons";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    containerClassName?: string;
    error?: string;
    label?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegisterReturn;
};

const Textarea: React.FC<Props> = ({
    containerClassName,
    className,
    label,
    name,
    error,
    register,
    ...props
}) => {
    return (
        <div className={`flex flex-col gap-1 ${containerClassName}`}>
            <label htmlFor={name}>{label}</label>
            <textarea
                {...register}
                {...props}
                className={`rounded-md mt-1 focus-visible:outline-none  font-light text-[14px] border-[1px]  
                            py-[12px] px-[12px] focus:shadow-input transition-all duration-500 placeholder:text-[#808080] 
                            ${error ? "border-[#800D0D]" : "border-gray-3"}
                            ${className}`}
            />
            {error && (
                <span className="flex items-center text-[#800D0D] text-xs font-normal">
                    <Icon name="clear" className="mr-2" />
                    {error}
                </span>
            )}
        </div>
    );
};

export default Textarea;
