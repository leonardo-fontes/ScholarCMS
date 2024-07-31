import Icon from "../icons";
import Button from "../inputs/Button";

export default function Navbar() {
    return (
        <div className="bg-gray-700 flex justify-between px-7 items-center py-4 sticky top-0">
            <Icon className="hover:cursor-pointer" name="logo" size={60} />
            <Button
                text="Login"
                classname="text-lg text-white bg-gray-500 px-6 font-semibold"
            />
        </div>
    );
}
