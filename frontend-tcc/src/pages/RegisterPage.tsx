import FormRegister from "../components/forms/FormRegister";

function RegisterPage() {
  return (
    <div className="w-full flex items-center justify-between mx-auto container relative bg-gradient-to-br from-gradient to-primary">
      <div className="max-w-[50%] hidden md:block">
        <h2 className="text-5xl font-bold mb-20 text-primary">
          JUNTE-SE À NOSSA REDE DE SOLIDARIEDADE!
        </h2>
        <img src="/jovens.png" alt="" />
        <p className="text-xl font-medium">
          <strong className="text-2xl">Estamos felizes em ter você aqui!</strong> <br /> <br /> Ao se
          registrar no nosso site, você está prestes a se unir a uma comunidade
          comprometida em fazer a diferença na vida de pessoas próximas. Nosso
          sistema conecta doadores a beneficiários verificados pelo CadÚnico,
          garantindo que sua ajuda chegue a quem realmente precisa. Ao criar sua
          conta, você poderá: <br />
          <ul className="flex flex-col gap-2 py-4">
            <li>
              <strong>• Oferecer Suporte Local:</strong> Conecte-se diretamente
              com pessoas da sua vizinhança que estão passando por dificuldades.{" "}
            </li>
            <li>
              {" "}
              <strong>• Contribuir com Confiança:</strong> Saibam que suas
              doações são direcionadas de forma segura e eficaz para
              beneficiários que realmente precisam.
            </li>
            <li>
              <strong>• Fazer a Diferença:</strong> Seja parte de uma rede de
              apoio que fortalece os laços comunitários e promove um ambiente de
              solidariedade.
            </li>
          </ul>
          Não perca a chance de transformar vidas ao seu redor. Preencha o
          formulário de registro e comece a fazer a diferença hoje mesmo. <br />{" "}
          <br />
          <strong className="text-2xl">
            Juntos, podemos construir uma comunidade mais forte e solidária!
          </strong>
        </p>
      </div>
      <FormRegister />
    </div>
  );
}

export default RegisterPage;
