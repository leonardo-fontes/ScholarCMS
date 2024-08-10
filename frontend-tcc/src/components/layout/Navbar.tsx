import { Link } from "react-router-dom";
import Icon from "../icons";
import Button from "../inputs/Button";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
    const { isLogged, signout } = useAuth();

    return (
        <div className="bg-primary flex justify-between px-7 items-center py-4 md:py-7 z-10 fixed w-full top-0 shadow-lg rounded-b-sm">
            <Link to={isLogged ? "/platform" : "/"}>
                <Icon
                    className="hover:cursor-pointer w-20 md:w-28"
                    name="logo"
                    size={110}
                />
            </Link>

            <Button
                link="/login"
                isLink
                children={isLogged ? "Sair" : "Entrar"}
                classname="text-lg md:text-xl text-primary bg-white px-6 md:px-8 py-1 md:py-2 font-semibold"
                onClick={(isLogged && signout) || undefined}
            />
        </div>
    );
}
