import { useEffect } from "react";
import Aside from "./Aside";
import useMobile from "../../hooks/useMobile";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/useAuth";

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
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const shouldRenderAside = !isMobile && ["platform", "profile"].some((page) => pathname.includes(page));
    const isExternalProfile = user && id !== undefined ? parseInt(id) !== parseInt(user.id) : false;

    return (
        <>
            <ToastContainer />
            <div className={`flex mx-auto container mt-24 min-h-screen z-0 relative font-manrope bg-white ${classname} ${isExternalProfile ? 'backdrop-blur-sm min-w-full min-h-screen' : ''}`}>
                {shouldRenderAside && <Aside />}
                {children}
            </div>

        </>
    );
}

export default Container;