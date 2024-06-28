type Props = {
    text: string;
    classname?: string;
    type?: "button" | "submit";
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

function Button({
    text,
    classname,
    type = "button",
    ...props
}: Props) {
    return (
        <button
            {...props}
            type={type}
            className={`rounded-3xl p-1 hover:shadow-lg transition duration-150 ${classname}`}
        >
            {text}
        </button>
    );
}

export default Button;