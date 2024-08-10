import Button from "../components/inputs/Button";
import Invite from "../components/partials/LandingPage/Invite";
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
            name: "Carlos Silva",
            text: "Eu estava passando por um momento difícil, desempregado e com dificuldades para sustentar minha família. Através do aplicativo, recebi doações de alimentos e roupas que fizeram toda a diferença. Agradeço imensamente à comunidade por todo o apoio, que nos ajudou a atravessar essa fase com um pouco mais de dignidade.",
            img: "/homem.jpg",
        },
        {
            id: 2,
            name: "João Pereira",
            text: "Com o aplicativo, pude contribuir com alimentos e roupas para pessoas da minha comunidade que realmente precisavam. Ver o impacto direto das minhas doações e saber que estou fazendo a diferença na vida de alguém perto de mim é extremamente gratificante. A tecnologia facilitou muito o processo e me deu uma sensação de realização e propósito.",
            img: "/garoto.jpg",
        },
        {
            id: 3,
            name: "Evelyn Ribeiro",
            text: "Tive que enfrentar uma situação de emergência com meu filho, e estava desesperada por ajuda. O aplicativo me conectou com pessoas que doaram o que precisávamos (itens básicos). Foi um grande alívio ver como a comunidade se uniu para nos apoiar em um momento tão crítico.",
            img: "/image.png",
        },
        {
            id: 4,
            name: "Felipe Oliveira",
            text: "Recentemente passei por uma emergência médica inesperada e fiquei sem recursos para cobrir as despesas. Graças ao aplicativo, consegui receber ajuda financeira de pessoas da minha própria comunidade, o que fez toda a diferença no tratamento e na recuperação. Sou muito grato pelo apoio recebido.",
            img: "/homem_2.jpg",
        },
        {
            id: 5,
            name: "Juliana Almeida",
            text: "Eu sempre estive disposta a ajudar, mas encontrar uma forma eficiente e segura de contribuir era um desafio. Agora posso doar com facilidade e saber que minha ajuda está chegando a quem precisa, sem complicações. A sensação de poder fazer a diferença na vida de pessoas próximas é incrível e o aplicativo tornou tudo muito mais simples e direto. Estou muito feliz por ter encontrado uma maneira tão prática de apoiar a comunidade.",
            img: "/mulher.jpg",
        },
        {
            id: 6,
            name: "Ana Costa",
            text: "Com a pandemia, perdi meu emprego e estava enfrentando dificuldades para pagar as contas e comprar alimentos. O aplicativo foi um verdadeiro salvador, conectando-me com doadores que me ajudaram com o que eu precisava. A solidariedade das pessoas da minha comunidade foi inspiradora e me deu esperança.",
            img: "/mulher_3.jpg",
        },
    ];

    const [user, setUser] = useState(0);
    const imgClassname =
        "rounded-full aspect-square object-cover w-16 md:w-24 mb-2 cursor-pointer hover:scale-125 duration-300";

    useEffect(() => {}, [user]);
    return (
        <section className="w-full flex flex-col bg-white py-20 container mx-auto">
            <Invite
                p1="Você sabia que pode ajudar pessoas próximas a você que realmente precisam, de maneira segura e eficaz?"
                p2="Nosso website conecta doadores com beneficiários cadastrados no CadÚnico, garantindo que sua doação chegue a quem mais necessita."
                p3="É a oportunidade perfeita para fazer a diferença na vida de alguém da sua comunidade, com a segurança de saber que seu gesto é direcionado corretamente."
                title="TRANSFORME VIDAS NA SUA COMUNIDADE!"
                titleButton="DOE COM CONFIANÇA"
                sourceImage="/maos.jpg"
                rightImage
            />
            <Invite
                p1="No nosso site, você encontra campanhas de pessoas verificadas da sua vizinhança que estão passando por momentos difíceis."
                p2="Seja doando alimentos, roupas ou outros itens, cada contribuição é um passo importante para fortalecer os laços de solidariedade local."
                p3=" Ao participar, você não só ajuda, mas também cria um ambiente de apoio e confiança mútua."
                title="APOIE SEUS VIZINHOS!"
                titleButton="PARTICIPE AGORA"
                sourceImage="/duas_pessoas.jpg"
            />
            <Invite
                p1="Participe dessa rede de generosidade e solidariedade. Acesse nosso website e veja como é simples ajudar seus vizinhos cadastrados no CadÚnico."
                p2="Ao fazer parte dessa iniciativa, você se torna um agente de mudança na sua comunidade, promovendo empatia e apoio onde mais é necessário."
                p3="Vamos juntos transformar vidas e construir uma comunidade mais forte e unida."
                title="PROMOVA A SOLIDARIEDADE!"
                titleButton="FAÇA PARTE DO NOSSO TIME"
                sourceImage="/garotos.jpg"
                rightImage
            />
            <section className="flex flex-col justify-center mx-7 items-center mt-20 ">
                <h2 className="font-bold md:text-5xl text-2xl mb-10 text-center text-primary">
                    CONHEÇA BENEFICIÁRIOS PRÓXIMOS A VOCÊ
                </h2>
                <img
                    className="rounded-full object-cover aspect-square border-primary border-4 shadow-xl w-32 md:w-44 mb-2"
                    src={users[user].img}
                    alt="imagem ilustrativa de jovens"
                />
                <p className="text-lg md:text-2xl font-bold md:mb-4 text-primary ">
                    {users[user].name}
                </p>
                <div className="flex justify-between md:justify-around w-full my-8">
                    <img
                        onClick={() => {
                            setUser(0);
                        }}
                        className={imgClassname}
                        src={users[0].img}
                        alt="imagem ilustrativa de jovens"
                    />
                    <img
                        onClick={() => {
                            setUser(1);
                        }}
                        className={imgClassname}
                        src={users[1].img}
                        alt="imagem ilustrativa de jovens"
                    />
                    <img
                        onClick={() => {
                            setUser(2);
                        }}
                        className={imgClassname}
                        src={users[2].img}
                        alt="imagem ilustrativa de jovens"
                    />
                </div>
                <p className="rounded-3xl border-y-[0.2px] border-greyLight shadow-2xl min-h-48 h-64 min-w-80 md:w-[55%] text-grey px-4 p-2 text-wrap md:text-lg text-sm relative">
                    {users[user].text}
                    <span className="absolute bottom-0 right-0 py-2 px-6 text-primary font-semibold">
                        - {users[user].name}
                    </span>
                </p>
                <div className="flex justify-between md:justify-around w-full my-8">
                    <img
                        onClick={() => {
                            setUser(3);
                        }}
                        className={imgClassname}
                        src={users[3].img}
                        alt="imagem ilustrativa de jovens"
                    />
                    <img
                        onClick={() => {
                            setUser(4);
                        }}
                        className={imgClassname}
                        src={users[4].img}
                        alt="imagem ilustrativa de jovens"
                    />
                    <img
                        onClick={() => {
                            setUser(5);
                        }}
                        className={imgClassname}
                        src={users[5].img}
                        alt="imagem ilustrativa de jovens"
                    />
                </div>
                <Button
                    isLink
                    link="/register"
                    children={"FAÇA PARTE DO NOSSO TIME"}
                    classname="text-lg md:text-2xl font-semibold md:font-bold text-white bg-primary hover:text-primary hover:bg-white w-full md:w-[45%] md:py-2 mt-6"
                />
            </section>
        </section>
    );
}
