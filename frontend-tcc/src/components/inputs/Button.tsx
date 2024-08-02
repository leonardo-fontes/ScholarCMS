import { Link } from "react-router-dom";

type Props = {
    text: string;
    classname?: string;
    type?: "button" | "submit";
    isLink?: boolean;
    link?: string;
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

function Button({
    text,
    classname,
    link,
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
            {isLink && link ? <Link to={link}>{text}</Link> : text}
        </button>
    );
}

export default Button;
