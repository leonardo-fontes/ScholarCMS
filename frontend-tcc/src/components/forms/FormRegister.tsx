import Button from "../inputs/Button";
import Input from "../inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../service/api";
import { useAuth } from "../../hooks/useAuth";
import schema from "../../validator/auth/register";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObject, ObjectSchema } from "yup";
import Icon from "../icons";
import Select from "../inputs/Select";

export type RegisterData = {
  name: string;
  email: string;
  username: string;
  password: string;
  birthdate: string;
  mobilelogin: string;
  agree: boolean;
  cpf: string;
  cep: string;
};

function FormRegister() {
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterData>({
    resolver: yupResolver<RegisterData>(
      schema as unknown as ObjectSchema<RegisterData, AnyObject, "">
    ),
  });

  const agree = watch("agree");

  const handleRegister: SubmitHandler<RegisterData> = async (data) => {
    try {
      await api.register(data);
      await auth.signin({ email: data.email, password: data.password });
      navigate("/plataform");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="bg-white text-black p-10 flex flex-col font-nunito w-full  lg:max-w-[500px]"
      onSubmit={handleSubmit(handleRegister)}
    >
      <div className="flex flex-col gap-6 mt-16 md:mt-20">
        <h3 className="font-black text-2xl text-primary flex gap-[10px] items-center">
          <Link className="bg-black" to="/">
            <Icon name="logo" size={80} color="black" />
          </Link>
          Teste
        </h3>
        <Link className="text-sm font-normal text-blue-3 underline" to="/login">
          Já tem uma conta? Fazer login.
        </Link>
      </div>

      <div className="flex flex-col gap-10 mt-4">
        <div className="flex flex-col gap-5">
          <p className="font-black font-nunito text-2xl">Criar conta</p>
          <Input
            name="name"
            register={register}
            error={errors.name?.message}
            placeholder="nome"
            label="Nome"
          />
          <Input
            name="lastName"
            register={register}
            error={errors.name?.message}
            placeholder="sobrenome"
            label="Sobrenome"
          />
        </div>
        <Input
          name="mobilelogin"
          register={register}
          error={errors.mobilelogin?.message}
          type="tel"
          placeholder="(00)00000-0000"
          label="Telefone"
        />
        <Input
          name="cpf"
          register={register}
          error={errors.cpf?.message}
          type="tel"
          placeholder="000.000.000-00"
          label="CPF"
        />

        <Input
          name="birthdate"
          register={register}
          error={errors.birthdate?.message}
          type="date"
          placeholder="00/00/0000"
          label="Data de Nascimento"
        />
        <Input
          name="email"
          register={register}
          error={errors.email?.message}
          type="email"
          label="E-mail"
        />

        <Select
          options={["Beneficiario", "Doador"]}
          label="Selecione sua tag"
          name="tag"
          register={register}
        />
        <Input
          name="password"
          register={register}
          error={errors.password?.message}
          type="password"
          label="Senha"
        />
        <Input
          name="confirmPassword"
          register={register}
          error={errors.password?.message}
          type="password"
          label="Confirme a senha"
        />
        <Input
          name="cep"
          register={register}
          error={errors.cep?.message}
          type="tel"
          label="Informe seu CEP"
        />
        <Input
          name="state"
          register={register}
          
          type="text"
          label="Estado"
        />
        <Input
          name="city"
          register={register}
          
          type="text"
          label="Cidade"
        />
      </div>
      <div
        className={`${errors.password ? "mt-5" : "mt-10"} ${
          errors?.agree ? "mb-5" : " mb-10"
        }`}
      >
        <div
          className={`transition-all flex gap-2 p-4 border-[1px] rounded-lg ${
            errors?.agree
              ? "border-[#800D0D] bg-[#FFEDED]"
              : agree
              ? "border-[#6F3DFF] bg-[#F3F0FA]"
              : "border-[#EDF0F2] bg-[#FAFBFC]"
          }`}
        >
          <input type="checkbox" {...register("agree")} />
          <label
            className="ml-2 font-nunito-sans text-sm  font-semibold"
            htmlFor="agree"
          >
            Li e concordo com os{" "}
            <Link
              className="underline  text-blue-3 font-bold"
              target="_blank"
              to="/terms"
            >
              termos e condições
            </Link>
            <span className="mx-1">e</span>
            <Link
              className="underline text-blue-3 font-bold"
              target="_blank"
              to="/privacy-policies"
            >
              política de privacidade
            </Link>
            <span className="font-normal">.</span>
          </label>
        </div>
        {errors?.agree?.message && (
          <span className="mt-2 flex gap-2 items-center text-[#800D0D] text-xs font-normal">
            <Icon name="clear" className="mr-2" />
            {errors?.agree?.message}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Button
          type="submit"
          text="Cadastrar"
          classname="disabled:bg-[#7b50fc93] bg-primary rounded-full text-white text-xl leading-5 font-bold font-nunito-sans w-full py-[1.375rem]"
        />
      </div>
    </form>
  );
}

export default FormRegister;
