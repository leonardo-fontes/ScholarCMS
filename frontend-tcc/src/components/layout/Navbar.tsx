import { Link, useLocation } from "react-router-dom";
import Icon from "../icons";
import Button from "../inputs/Button";
import { useAuth } from "../../hooks/useAuth";
import { Role } from "../../types/User";

export default function Navbar() {
    const { signout, user } = useAuth();
    const { pathname } = useLocation();
    const linkClassname = 'flex text-lg min-w-64 justify-center items-center font-light hover:font-bold duration-100 transition-all gap-2 px-6 py-1 md:py-2 border-[1px] rounded-lg text-white'
    return (
        !(["verify-email"].filter((page) => pathname.includes(page))
            .length) &&
        <div className="bg-primary flex justify-between px-7 items-center py-4 md:py-7 z-10 fixed w-full top-0 shadow-lg rounded-b-sm">
            <Link to={user ? "/platform" : "/"}>
                <Icon
                    className="hover:cursor-pointer w-20 md:w-28"
                    name="logo"
                    size={110}
                />
            </Link>
            {
                user &&
                <div className="flex gap-4">
                    <Link className={linkClassname} to={"/filter"}>
                        Buscar perfis
                        <Icon name="magnifyingGlass" size={20} color="white" />
                    </Link>

                    {user?.role_id === parseInt(Role.Beneficiario) ?
                        <Link className={linkClassname} to={'/platform/create-pub'}>
                            Criar Publicação
                            <Icon name="addItem" size={24} color="white" />
                        </Link> : null
                    }
                    <Link className={linkClassname} to={`/platform/profile/${user.id}`}>
                        Meu perfil
                        <Icon name="addItem" size={24} color="white" />
                    </Link>

                </div>
            }



            <Button
                href="/login"
                classname="text-lg md:text-xl text-primary bg-white px-6 md:px-8 py-1 md:py-2 font-semibold"
                onClick={user ? signout : undefined}
            >{user ? "Sair" : "Entrar"}</Button>
        </div>
    );
}
