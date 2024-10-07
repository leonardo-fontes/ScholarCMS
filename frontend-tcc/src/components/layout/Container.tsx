import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
    classname?: string;
}

function Container({ children, classname }: Props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={`flex mx-auto container mt-32 min-h-screen z-0 relative font-manrope bg-white ${classname}`}>
            {children}
        </div>
    );
}

export default Container;