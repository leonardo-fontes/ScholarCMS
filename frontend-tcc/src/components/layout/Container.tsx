import { useEffect } from "react";
import Aside from "./Aside";
import useMobile from "../../hooks/useMobile";
import { useLocation } from "react-router-dom";

interface Props {
    children: React.ReactNode;
    classname?: string;
}

function Container({ children, classname }: Props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const isMobile = useMobile();
    const { pathname } = useLocation();
    return (
        <div className={`flex mx-auto container mt-32 min-h-screen z-0 relative font-manrope bg-white ${classname}`}>
            {!isMobile && ["platform", "profile"].filter((page) => pathname.includes(page)).length ? <Aside /> : null}
            {children}
        </div>
    );
}

export default Container;