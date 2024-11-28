import Button from "../inputs/Button";

export default function Aside() {
  return (
    <aside className="fixed px-4 border-2 border-primary h-[70vh] text-black bg-white left-0 bottom-28 w-[320px] flex flex-col">
      <img className="my-4 bg-primary rounded-md" src="/jovens.png" alt="" />
      <span className="font-bold text-3xl text-primary mb-2">
        Seja bem vindo à Solidariza
      </span>
      <p className="mb-4">
        Ao clicar em uma publicação, você pode fazer uma doação, visitar o
        perfil do usuário, ou acessar a página da publicação para entender por
        completo a situação de cada família.
      </p>
      <p className="">
        Você também pode procurar pessoas de uma cidade específica, Através da
        página de busca de perfil:
      </p>
      <Button
        href="/platform/filter"
        classname="w-[90%] bg-primary text-white font-bold text-lg mt-10 ml-3 py-2"
        children="VISITAR BUSCA DE PERFIS"
      />
    </aside>
  );
}
