import { useEffect } from "react";
import Aside from "./Aside";
import useMobile from "../../hooks/useMobile";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const shouldRenderAside =
    !isMobile &&
    ["platform", "profile"].some((page) => pathname.includes(page));

  return (
    <>
      <ToastContainer />
      <div
        className={`flex mx-auto container mt-24 min-h-screen z-0 relative font-manrope bg-white ${classname}`}
      >
        {shouldRenderAside && <Aside />}
        {children}
      </div>
    </>
  );
}

export default Container;
