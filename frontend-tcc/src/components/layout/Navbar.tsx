import Icon from "../icons";
import Button from "../inputs/Button";

export default function Navbar() {
    return (
        <div className="bg-gray-700 flex justify-between px-7 items-center py-4 md:py-7 z-10 fixed w-full top-0">
            <Icon
                className="hover:cursor-pointer w-20 md:w-28"
                name="logo"
                size={110}
            />
            <Button
                link="/login"
                isLink={true}
                text="Entrar"
                classname="text-lg md:text-xl text-white bg-gray-500 px-6 md:px-12 py-0 md:py-2 font-semibold"
            />
        </div>
    );
}
