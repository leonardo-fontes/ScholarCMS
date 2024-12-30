import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Icon from "../components/icons";

function BuildingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (!location.pathname.includes("404-page")) {
            navigate("/404-page");
        }
    }, [location.pathname, navigate]);
    return (
        <section className="bg-white text-black w-full min-h-[70vh] gap-16 flex flex-col items-center justify-center py-20 md:items-center text-center">
            <h3 className="text-3xl font-bold">Página em desenvolvimento</h3>

            <Icon name="maintenance" color="#5030E5" size={200} />
            <Link
                className="bg-white text-black rounded-full px-20 font-bold py-4"
                to="/"
            >
                Voltar para à página Inicial
            </Link>
        </section>
    );
}

export default BuildingPage;
