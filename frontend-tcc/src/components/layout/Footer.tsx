import { Link } from "react-router-dom";
import Icon from "../icons";

export default function Footer() {
    return (
        <div className="flex flex-col justify-center items-center w-full bg-gray-700 text-white py-8 md:pt-20 ">
            <Icon size={120} name="logo" className="mb-8 md:hidden left-40" />
            <div className="flex flex-col items-center gap-9">
                <ul className="flex flex-col md:flex-row gap-9 md:gap-20">
                    <li>
                        <Link
                            to={"/register"}
                            className="text-xl hover:underline"
                        >
                            Faça parte do nosso time
                        </Link>
                    </li>
                    <li>
                        <Link to={"/about"} className="text-xl hover:underline">
                            Sobre nós
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/contact"}
                            className="text-xl hover:underline"
                        >
                            Contate-nos
                        </Link>
                    </li>
                </ul>
                <p className="border-b-[1px] border-gray-400 w-screen md:hidden"></p>

                <div className="flex items-center justify-center gap-20">
                    <Icon
                        name="facebook"
                        className="aspect-square w-10 md:w-16"
                        size={48}
                        color="white"
                    />
                    <Icon
                        name="instagram"
                        className="aspect-square w-10 md:w-16"
                        size={48}
                        color="white"
                    />
                    <Icon
                        name="linkedin"
                        className="aspect-square w-10 md:w-16"
                        size={48}
                        color="white"
                    />
                </div>
                <p className="text-xs">&copy;2024 All rights reserved</p>
            </div>
        </div>
    );
}
