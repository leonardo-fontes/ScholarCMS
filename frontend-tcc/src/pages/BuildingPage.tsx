/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import Icon from "../components/icons";

function BuildingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(`LOCATION: ${location}`);
    useEffect(() => {
        if (!location.pathname.includes("404-page")) {
            navigate("/404-page");
        }
    }, [location.pathname, navigate]);
    return (
        <div className="bg-[var(--primary-color)] text-white w-full min-h-[70vh] gap-16 flex flex-col items-center justify-center py-20">
            <h3 className="text-3xl font-bold">Página em desenvolvimento</h3>

            <Icon
                name="maintenance"
                className="w-[200px]"
                color="var(--primary-color)"
            />
            <Link
                className="bg-white text-[var(--primary-color)] rounded-full px-20 font-bold py-4"
                to="/"
            >
                Voltar para à página Inicial
            </Link>
        </div>
    );
}

export default BuildingPage;
