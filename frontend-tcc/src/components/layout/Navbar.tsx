import { Link } from "react-router-dom";
import Icon from "../icons";
import Button from "../inputs/Button";

export default function Navbar() {
  return (
    <div className="bg-primary flex justify-between px-7 items-center py-4 md:py-7 z-10 fixed w-full top-0 shadow-lg rounded-b-sm">
      <Link to={"/"}>
        <Icon
          className="hover:cursor-pointer w-20 md:w-28"
          name="logo"
          size={110}
        />
      </Link>

      <Button
        link="/login"
        isLink
        text="Entrar"
        classname="text-lg md:text-xl text-primary bg-white px-6 md:px-8 py-1 md:py-2 font-semibold"
      />
    </div>
  );
}
