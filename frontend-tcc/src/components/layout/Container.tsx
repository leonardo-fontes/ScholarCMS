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
        <div className={`flex w-full min-h-screen z-0 relative ${classname}`}>
            {children}
        </div>
    );
}

export default Container;