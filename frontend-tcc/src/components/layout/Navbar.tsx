import { Link } from "react-router-dom";
import Icon from "../icons";
import Button from "../inputs/Button";
import { useAuth } from "../../hooks/useAuth";
import ProfileIcon from "../icons/source/ProfileIcon"
import ProfileModal from "../modais/Modal";
import { useState } from "react";
import MapaIcon from "../icons/source/MapIcon";
import HomeIconComponent from "../icons/source/HomeIcon";

export default function Navbar() {
    const { isLogged, signout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    console.log(isLogged);
    return (
        <div className="bg-primary flex justify-between px-7 items-center py-4 md:py-7 z-10 fixed w-full top-0 shadow-lg rounded-b-sm">
            <Link to={isLogged ? "/platform" : "/"}>
                <Icon
                    className="hover:cursor-pointer w-20 md:w-28"
                    name="logo"
                    size={110}
                />
            </Link>
            {isLogged ? (
                <>
                    <div className="justify-center space-x4">
                        <MapaIcon size={70} className="text-white" to="/mapa" onClick={() => alert('mapa clicado')} />
                    </div>
                    <HomeIconComponent size={70} className="text-white" to="/plataform" onClick={() => alert('Home clicado')} />
                    <div className="relative flex-shrink-0">
                        <ProfileIcon
                            src="https://media.licdn.com/dms/image/v2/D4D03AQGtIXOV_MHwBA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1689786538361?e=1730937600&v=beta&t=ocBLwVq04PBejzJsPywktukJx7UUazFARIU_AOks9ZY"
                            size={70}
                            className="border-2 border-gray-300"
                            alt="Imagem do Perfil do Usuário"
                            onClick={toggleModal}
                        />
                        <ProfileModal isOpen={isModalOpen} onClose={toggleModal} />
                    </div>
                </>
            ) :
                <Button
                    link="/login"
                    isLink
                    children={isLogged ? "Sair" : "Entrar"}
                    classname="text-lg md:text-xl text-primary bg-white px-6 md:px-8 py-1 md:py-2 font-semibold"
                    onClick={(isLogged && signout) || undefined}
                />
            }
        </div>
    );
}
