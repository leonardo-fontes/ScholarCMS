import Button from "../components/inputs/Button";
import Icon from "../components/icons/index";
import Invite from "../components/partials/Invite";

export default function LandingPage() {
  const userText = [
    "socorro",
    "bom dia",
    "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.",
  ];

  return (
    <div className="w-full flex flex-col text-white bg-gray-300">
      <div className="bg-gray-700 flex justify-between px-7 items-center py-4 sticky top-0">
        <Icon className="hover:cursor-pointer" name="logo" size={60} />
        <Button
          text="Login"
          classname="text-lg text-white bg-gray-500 px-6 font-semibold"
        />
      </div>
      <Invite
        text="Lorem Ipsum é simplesmente uma simulação de texto da indústria
          tipográfica e de impressos, e vem sendo utilizado desde o século XVI,
          quando um impressor desconhecido pegou uma bandeja de tipos e os
          embaralhou para fazer um livro de modelos de tipos."
        title="SEJA UM DOADOR!"
        titleButton="FAÇA PARTE DO NOSSO TIME"
        sourceImage="/jovens.png"
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
        <h2 className="font-semibold text-2xl mb-12">
          CONHEÇA BENEFICIÁRIOS PRÓXIMOS A VOCÊ
        </h2>
        <img
          className="rounded-full aspect-square w-32 bg-red-400 mb-2"
          src="/jovens.png"
          alt=""
        />
        <p className="text-lg font-semibold">Larissa Mamoela</p>
        <div className="flex justify-around w-full my-8">
          <img
            className="rounded-full aspect-square w-12 bg-red-400 mb-2"
            src="/jovens.png"
            alt=""
          />
          <img
            className="rounded-full aspect-square w-12 bg-red-400 mb-2"
            src="/jovens.png"
            alt=""
          />
          <img
            className="rounded-full aspect-square w-12 bg-red-400 mb-2"
            src="/jovens.png"
            alt=""
          />
        </div>
        <p className="bg-white rounded-lg min-h-40 min-w-80 text-black px-4 p-2 text-wrap">
          {userText[2]}
        </p>
        <div className="flex justify-around w-full my-8">
          <img
            className="rounded-full aspect-square w-12 bg-red-400 mb-2"
            src="/jovens.png"
            alt=""
          />
          <img
            className="rounded-full aspect-square w-12 bg-red-400 mb-2"
            src="/jovens.png"
            alt=""
          />
          <img
            className="rounded-full aspect-square w-12 bg-red-400 mb-2"
            src="/jovens.png"
            alt=""
          />
        </div>
        <Button
        text={"FAÇA PARTE DO NOSSO TIME"}
        classname="text-lg font-semibold text-white bg-gray-500 w-full"
      />
      </div>
    </div>
  );
}
