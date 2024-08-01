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
      name: "Lukako",
      text: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.",
      img: "/jovens.png",
    },
    {
      id: 2,
      name: "Alisshow",
      text: "Participe dessa rede de generosidade e solidariedade. Acesse nosso website e veja como é simples ajudar seus vizinhos cadastrados no CadÚnico. Ao fazer parte dessa iniciativa, você se torna um agente de mudança na sua comunidade, promovendo empatia e apoio onde mais é necessário. Vamos juntos transformar vidas e construir uma comunidade mais forte e unida.",
      img: "/jovens.png",
    },
  ];

  const [teste, setTeste] = useState(0);

  useEffect(() => {}, [teste]);
  return (
    <section className="w-full flex flex-col text-white bg-gray-300 py-20 container mx-auto">
      <Invite
        text="Você sabia que pode ajudar pessoas próximas a você que realmente precisam, de maneira segura e eficaz? Nosso website conecta doadores com beneficiários cadastrados no CadÚnico, garantindo que sua doação chegue a quem mais necessita. É a oportunidade perfeita para fazer a diferença na vida de alguém da sua comunidade, com a segurança de saber que seu gesto é direcionado corretamente."
        title="TRANSFORME VIDAS NA SUA COMUNIDADE!"
        titleButton="DOE COM CONFIANÇA"
        sourceImage="/jovens.png"
        rightImage
      />
      <Invite
        text="No nosso site, você encontra campanhas de pessoas verificadas da sua vizinhança que estão passando por momentos difíceis. Seja doando alimentos, roupas ou outros itens, cada contribuição é um passo importante para fortalecer os laços de solidariedade local. Ao participar, você não só ajuda, mas também cria um ambiente de apoio e confiança mútua."
        title="APOIE SEUS VIZINHOS!"
        titleButton="PARTICIPE AGORA"
        sourceImage="/jovens.png"
      />
      <Invite
        text="Participe dessa rede de generosidade e solidariedade. Acesse nosso website e veja como é simples ajudar seus vizinhos cadastrados no CadÚnico. Ao fazer parte dessa iniciativa, você se torna um agente de mudança na sua comunidade, promovendo empatia e apoio onde mais é necessário. Vamos juntos transformar vidas e construir uma comunidade mais forte e unida."
        title="PROMOVA A SOLIDARIEDADE!"
        titleButton="FAÇA PARTE DO NOSSO TIME"
        sourceImage="/jovens.png"
        rightImage
      />
      <section className="flex flex-col justify-center mx-7 items-center mt-20 ">
        <h2 className="font-semibold md:text-4xl text-2xl mb-10 text-center">
          CONHEÇA BENEFICIÁRIOS PRÓXIMOS A VOCÊ
        </h2>
        <img
          className="rounded-full aspect-square w-32 md:w-44 bg-red-400 mb-2"
          src="/jovens.png"
          alt="imagem ilustrativa de jovens"
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
            alt="imagem ilustrativa de jovens"
          />
          <img
            className="rounded-full aspect-square w-16 md:w-24 bg-green-400 mb-2"
            src="/jovens.png"
            alt="imagem ilustrativa de jovens"
          />
          <img
            className="rounded-full aspect-square w-16 md:w-24 bg-yellow-400 mb-2"
            src="/jovens.png"
            alt="imagem ilustrativa de jovens"
          />
        </div>
        <p className="bg-white rounded-lg min-h-48 min-w-80 md:w-[55%] text-black px-4 p-2 text-wrap md:text-lg text-sm relative">
          {users[teste].text}
          <span className="absolute bottom-0 right-0 spany-2 px-6 text-green-600">
            - {users[teste].name}
          </span>
        </p>
        <div className="flex justify-between md:justify-around w-full my-8">
          <img
            onClick={() => {
              setTeste(1);
            }}
            className="rounded-full aspect-square w-16 md:w-24 bg-blue-400 mb-2"
            src="/jovens.png"
            alt="imagem ilustrativa de jovens"
          />
          <img
            className="rounded-full aspect-square w-16 md:w-24 bg-red-400 mb-2"
            src="/jovens.png"
            alt="imagem ilustrativa de jovens"
          />
          <img
            className="rounded-full aspect-square w-16 md:w-24 bg-orange-400 mb-2"
            src="/jovens.png"
            alt="imagem ilustrativa de jovens"
          />
        </div>
        <Button
          isLink
          link="/register"
          text={"FAÇA PARTE DO NOSSO TIME"}
          classname="text-lg md:text-2xl font-semibold text-white bg-gray-500 w-full md:w-[45%] md:py-2 mt-6 mb-12"
        />
      </section>
    </section>
  );
}
