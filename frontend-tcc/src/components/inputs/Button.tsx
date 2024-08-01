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
            className={`rounded-3xl p-1 hover:shadow-xl transition duration-300 ${classname}`}
        >
            {isLink && link ? <Link to={link}>{text}</Link> : text}
        </button>
    );
}

export default Button;
