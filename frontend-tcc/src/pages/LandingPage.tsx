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
    <section className="w-full flex flex-col bg-white py-20 container mx-auto">
      <Invite
        p1="Você sabia que pode ajudar pessoas próximas a você que realmente precisam, de maneira segura e eficaz?"
        p2="Nosso website conecta doadores com beneficiários cadastrados no CadÚnico, garantindo que sua doação chegue a quem mais necessita."
        p3="É a oportunidade perfeita para fazer a diferença na vida de alguém da sua comunidade, com a segurança de saber que seu gesto é direcionado corretamente."
        title="TRANSFORME VIDAS NA SUA COMUNIDADE!"
        titleButton="DOE COM CONFIANÇA"
        sourceImage="/jovens.png"
        rightImage
      />
      <Invite
        p1="No nosso site, você encontra campanhas de pessoas verificadas da sua vizinhança que estão passando por momentos difíceis."
        p2="Seja doando alimentos, roupas ou outros itens, cada contribuição é um passo importante para fortalecer os laços de solidariedade local."
        p3=" Ao participar, você não só ajuda, mas também cria um ambiente de apoio e confiança mútua."
        title="APOIE SEUS VIZINHOS!"
        titleButton="PARTICIPE AGORA"
        sourceImage="/jovens.png"
      />
      <Invite
        p1="Participe dessa rede de generosidade e solidariedade. Acesse nosso website e veja como é simples ajudar seus vizinhos cadastrados no CadÚnico."
        p2="Ao fazer parte dessa iniciativa, você se torna um agente de mudança na sua comunidade, promovendo empatia e apoio onde mais é necessário."
        p3="Vamos juntos transformar vidas e construir uma comunidade mais forte e unida."
        title="PROMOVA A SOLIDARIEDADE!"
        titleButton="FAÇA PARTE DO NOSSO TIME"
        sourceImage="/jovens.png"
        rightImage
      />
      <section className="flex flex-col justify-center mx-7 items-center mt-20 ">
        <h2 className="font-bold md:text-5xl text-2xl mb-10 text-center text-primary">
          CONHEÇA BENEFICIÁRIOS PRÓXIMOS A VOCÊ
        </h2>
        <img
          className="rounded-full aspect-square w-32 md:w-44 bg-red-400 mb-2"
          src="/jovens.png"
          alt="imagem ilustrativa de jovens"
        />
        <p className="text-lg md:text-2xl font-semibold md:mb-4 text-primary">
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
        <p className="rounded-3xl border-y-[0.2px] border-greyLight shadow-2xl min-h-48 min-w-80 md:w-[55%] text-grey px-4 p-2 text-wrap md:text-lg text-sm relative">
          {users[teste].text}
          <span className="absolute bottom-0 right-0 py-2 px-6 text-primary font-semibold">
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
          classname="text-lg md:text-2xl font-semibold md:font-bold text-white bg-primary hover:text-primary hover:bg-white w-full md:w-[45%] md:py-2 mt-6"
        />
      </section>
    </section>
  );
}
