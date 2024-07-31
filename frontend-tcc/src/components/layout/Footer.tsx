import Icon from "../icons";

export default function Footer() {
    return (
        <div className="flex flex-col md:flex-row justify-center md:justify-around items-center w-full bg-gray-700 mt-12 py-8 ">
            <Icon size={60} name="logo" />
            <div className="flex flex-col justify-center items-center gap-9">
                <ul className="flex flex-col gap-4 ">
                    <li>
                        <a className="text-xl" href="">
                            Faça parte do nosso time
                        </a>
                    </li>
                    <li>
                        <a className="text-xl" href="">
                            Sobre nós
                        </a>
                    </li>
                </ul>
                <p className="border-b-[1px] border-gray-400 w-screen"></p>
                <p className="text-xs">&copy;2024 All rights reserved</p>
            </div>
        </div>
    );
}
