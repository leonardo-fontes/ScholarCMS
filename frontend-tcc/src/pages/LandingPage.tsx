import Button from "../components/inputs/Button";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Invite from "../components/partials/Invite";
import { useEffect, useState } from "react";

interface Users {
    id: number;
    text: string;
    img: string;
    name: string;
}

export default function LandingPage() {
    const users: Users[] = [
        {
            id: 1,
            name: "Lukako",
            text: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.",
            img: "/jovens.png",
        },
        {
            id: 2,
            name: "Alisshow",
            text: "bom diabom diabom diabom diabom diabom diabom diabom diabom diabom diabom diabom diabom diabom diabom diabom diabom diabom diabom dia",
            img: "/jovens.png",
        },
    ];

    const [teste, setTeste] = useState(0);

    useEffect(() => {}, [teste]);
    return (
        <>
            <div className="w-full flex flex-col text-white bg-gray-300 ">
                <Navbar />
                <Invite
                    text="Lorem Ipsum é simplesmente uma simulação de texto da indústria
          tipográfica e de impressos, e vem sendo utilizado desde o século XVI,
          quando um impressor desconhecido pegou uma bandeja de tipos e os
          embaralhou para fazer um livro de modelos de tipos."
                    title="SEJA UM DOADOR!"
                    titleButton="FAÇA PARTE DO NOSSO TIME"
                    sourceImage="/jovens.png"
                    rightImage={true}
                />
                <Invite
                    text="Lorem Ipsum é simplesmente uma simulação de texto da indústria
          tipográfica e de impressos, e vem sendo utilizado desde o século XVI,
          quando um impressor desconhecido pegou uma bandeja de tipos e os
          embaralhou para fazer um livro de modelos de tipos."
                    title="APOIE PESSOAS DA SUA COMUNIDADE!"
                    titleButton="FAÇA PARTE DO NOSSO TIME"
                    sourceImage="/jovens.png"
                />
                <div className="flex flex-col justify-center mx-7 items-center mt-20 ">
                    <h2 className="font-semibold md:text-4xl text-2xl mb-10 text-center">
                        CONHEÇA BENEFICIÁRIOS PRÓXIMOS A VOCÊ
                    </h2>
                    <img
                        className="rounded-full aspect-square w-32 md:w-44 bg-red-400 mb-2"
                        src="/jovens.png"
                        alt=""
                    />
                    <p className="text-lg md:text-2xl font-semibold md:mb-4">
                        {users[teste].name}
                    </p>
                    <div className="flex justify-between md:justify-around w-full my-8">
                        <img
                            onClick={() => {
                                setTeste(0);
                            }}
                            className="rounded-full aspect-square w-16 md:w-24 bg-red-400 mb-2"
                            src="/jovens.png"
                            alt=""
                        />
                        <img
                            className="rounded-full aspect-square w-16 md:w-24 bg-green-400 mb-2"
                            src="/jovens.png"
                            alt=""
                        />
                        <img
                            className="rounded-full aspect-square w-16 md:w-24 bg-yellow-400 mb-2"
                            src="/jovens.png"
                            alt=""
                        />
                    </div>
                    <p className="bg-white rounded-lg min-h-40 min-w-80 md:w-[60%] text-black px-4 p-2 text-wrap">
                        {users[teste].text}
                    </p>
                    <div className="flex justify-between md:justify-around w-full my-8">
                        <img
                            onClick={() => {
                                setTeste(1);
                            }}
                            className="rounded-full aspect-square w-16 md:w-24 bg-blue-400 mb-2"
                            src="/jovens.png"
                            alt=""
                        />
                        <img
                            className="rounded-full aspect-square w-16 md:w-24 bg-red-400 mb-2"
                            src="/jovens.png"
                            alt=""
                        />
                        <img
                            className="rounded-full aspect-square w-16 md:w-24 bg-orange-400 mb-2"
                            src="/jovens.png"
                            alt=""
                        />
                    </div>
                    <Button
                        text={"FAÇA PARTE DO NOSSO TIME"}
                        classname="text-lg md:text-2xl font-semibold text-white bg-gray-500 w-full md:w-[45%] md:py-2"
                    />
                </div>
                <Footer />
            </div>
        </>
    );
}
