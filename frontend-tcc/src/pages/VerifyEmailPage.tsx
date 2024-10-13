import { useEffect, useState } from "react";
import Button from "../components/inputs/Button";
import { useLocation } from "react-router-dom";
import api from "../service/api";

export default function VerifyEmailPage() {
    const [token, setToken] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tokenFromUrl = urlParams.get("token");
        if (tokenFromUrl) {
            setToken(true);
            api.sendVerifiedEmail(tokenFromUrl);
        }
    }, [location]);


    return (
        <div className="w-full flex justify-evenly items-center container mx-auto relative ">
            <div className="flex flex-col items-center">
                <p className="text-5xl font-extrabold text-primary">SEJA BEM VINDO</p>
                <img
                    className=""
                    src="/jovens.png"
                    alt="background"
                />
                 {token && ( 
                    <p>
                       Agora basta clicar no botão ao lado para acessar fazer login e acessar a plataforma
                    </p>
                 )}
            </div>
            <div className="w-full flex items-center justify-center bg-white">
                {!token ? (
                    <div className="p-16 flex flex-col items-center justify-center border-y-[0.2px] border-lightGray shadow-xl">
                        <h3 className="text-2xl">
                            Enviamos um email de verificação pra você!
                        </h3>
                        <img className="ml-20" src="/verify-email.png" alt="" />
                        <span className="text-xl">Verifique seu email</span>
                        <span className=" text-gray">
                            (lembre-se de olhar sua caixa de span)
                        </span>
                    </div>
                ) : (
                    <div className="p-16 flex items-center justify-center border-y-[0.2px] border-lightGray shadow-xl">
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-2xl">
                                Seu email foi verificado com sucesso!
                            </h3>
                            <img className="" src="/verified-email.png" alt="" />
                            <Button
                                href="/platform"
                                children="ACESSAR PLATAFORMA"
                                classname="text-lg md:text-xl font-semibold md:font-extrabold text-white bg-primary w-full md:py-2"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}
