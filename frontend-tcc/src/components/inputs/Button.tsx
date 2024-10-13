import { useMemo } from "react";
import { Link, LinkProps } from 'react-router-dom'

type Props = (React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & (React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
>)) & {
    classname?: string;
    type?: "button" | "submit";
};

function Button({
    classname,
    children,
    type = "button",
    ...props
}: Props) {
    const Component = useMemo(() => props?.href ? Link : 'button', [props?.href])
    return (
        <Component
            {...props}
            to={props.href as LinkProps['to']}
            type={type}
            className={`rounded-lg text-center p-1 hover:shadow-2xl shadow-primary transition-all duration-500 ${classname}`}
        >
            {children}
        </Component>
    );
}

export default Button;
