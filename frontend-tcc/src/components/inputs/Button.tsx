import { Link } from "react-router-dom";

type Props = {
    classname?: string;
    type?: "button" | "submit";
    isLink?: boolean;
    link?: string;
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

function Button({
    classname,
    link,
    children,
    type = "button",
    isLink = false,
    ...props
}: Props) {
    return (
        <button
            {...props}
            type={type}
            className={`rounded-lg p-1 hover:shadow-2xl shadow-primary transition-all duration-500 ${classname}`}
        >
            {isLink && link ? <Link to={link}>{children}</Link> : children}
        </button>
    );
}

export default Button;
