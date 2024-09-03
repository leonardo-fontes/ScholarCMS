import { Link } from "react-router-dom";
import Icon from "../icons";
import useMobile from "../../hooks/useMobile";

export default function Footer() {
  const isMobile = useMobile();
  return (
    <div className="flex flex-col justify-center items-center w-full bg-primary text-white py-8 md:pt-20 mt-8 ">
      <Icon size={120} name="logo" className="mb-8 md:hidden left-40" />
      <div className="flex flex-col items-center gap-9">
        <ul className="flex flex-col md:flex-row gap-9 md:gap-20">
          <li>
            <Link to={"/register"} className="text-xl hover:underline">
              Faça parte do nosso time
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="text-xl hover:underline">
              Sobre nós
            </Link>
          </li>
          <li>
            <Link to={"/contact"} className="text-xl hover:underline">
              Contate-nos
            </Link>
          </li>
        </ul>
        <p className="border-b-[1px] border-gray-400 w-screen md:hidden"></p>

        <ul className="flex items-center justify-center gap-20 hover:cursor-pointer">
          <li className="aspect-square bg-primaryLight hover:bg-[#ffffffea] transition-colors duration-300 rounded-xl items-center flex">
            <Link to={"/facebook"}>
              <Icon
                name="facebook"
                className="aspect-square w-12 md:w-16"
                size={isMobile ? 32 : 48}
                color="#5030E5"
              />
            </Link>
          </li>
          <li className="aspect-square bg-primaryLight hover:bg-[#ffffffea] rounded-xl items-center flex">
            <Link to={"/instagram"}>
              <Icon
                name="instagram"
                className="aspect-square w-12 md:w-16"
                size={isMobile ? 32 : 48}
                color="#5030E5"
              />
            </Link>
          </li>
          <li className="aspect-square bg-primaryLight hover:bg-[#ffffffea] rounded-xl items-center flex">
            <Link to={"/linkedin"}>
              <Icon
                name="linkedin"
                className="aspect-square w-12 md:w-16"
                size={isMobile ? 32 : 48}
                color="#5030E5"
              />
            </Link>
          </li>
        </ul>

        <p className="text-xs">&copy;2024 All rights reserved</p>
      </div>
    </div>
  );
}