import Button from "../inputs/Button";
import Input from "../inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../service/api";
import { useAuth } from "../../hooks/useAuth";
import schema, { validatePassword } from "../../validator/auth/register";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObject, ObjectSchema } from "yup";
import Icon from "../icons";
import Select from "../inputs/Select";
import { useMemo } from "react";

export type RegisterData = {
    name: string;
    surname: string;
    password: string;
    email: string;
    postal_code: string;
    state: string;
    city: string;
    status: string;
    role_id: number;
    cpf: string;
    birth_date: string;
};

function FormRegister() {
    const navigate = useNavigate();
    const auth = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterData>({
        resolver: yupResolver<RegisterData>(
            schema as unknown as ObjectSchema<RegisterData, AnyObject, "">
        ),
    });

    const password = watch("password");
    const passValidate = useMemo(() => validatePassword(password), [password]);

    const handleRegister: SubmitHandler<RegisterData> = async (data) => {
        try {
            await api.register(data);
            await auth.signin({ cpf: data.cpf, password: data.password });
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    };

    enum Role {
        Beneficiario = 1,
        Doador = 2,
    }

    const roleOptions = [
        { value: Role.Beneficiario, label: "Beneficiario" },
        { value: Role.Doador, label: "Doador" },
    ];

    return (
        <section className="font-manrope w-full md:mt-8 mt-2 flex items-center justify-center">
            <form
                className="bg-white text-black p-10 flex flex-col lg:max-w-[500px] w-full"
                onSubmit={handleSubmit(handleRegister)}
            >
                <div className="flex flex-col gap-6 mt-16 md:mt-20">
                    <h3 className="font-black text-2xl text-primary flex gap-[10px] items-center">
                        <Link className="bg-black" to="/">
                            <Icon name="logo" size={80} color="black" />
                        </Link>
                        Teste
                    </h3>
                    <Link
                        className="text-sm font-normal text-blue-3 underline"
                        to="/login"
                    >
                        Já tem uma conta? Fazer login.
                    </Link>
                </div>

                <div className="flex flex-col gap-10 mt-4">
                    <div className="flex flex-col gap-5">
                        <p className="font-black font-nunito text-2xl">
                            Criar conta
                        </p>
                        <Input
                            name="name"
                            register={register}
                            error={errors.name?.message}
                            placeholder="nome"
                            label="Nome"
                        />
                        <Input
                            name="surname"
                            register={register}
                            error={errors.surname?.message}
                            placeholder="sobrenome"
                            label="Sobrenome"
                        />
                    </div>
                    <Input
                        name="cpf"
                        register={register}
                        error={errors.cpf?.message}
                        type="tel"
                        placeholder="000.000.000-00"
                        label="CPF"
                    />

                    <Input
                        name="birth_date"
                        register={register}
                        error={errors.birth_date?.message}
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
                        options={roleOptions}
                        label="Selecione sua tag"
                        name="role_id"
                        register={register}
                    />
                    <Input
                        name="password"
                        register={register}
                        error={errors.password?.message}
                        type="password"
                        label="Senha"
                    />
                    {errors.password?.message ? (
                        <div className="flex flex-col gap-1 text-xs font-normal -mt-8 text-[#515151]">
                            <div>Sua senha deve conter, pelo menos:</div>
                            <span
                                className={`flex gap-2 ${
                                    passValidate.length
                                        ? "text-success"
                                        : "text-error"
                                }`}
                            >
                                <Icon
                                    name={
                                        passValidate.length ? "check" : "clear"
                                    }
                                />{" "}
                                8 caracteres
                            </span>
                            <span
                                className={`flex gap-2 ${
                                    passValidate.lowercase
                                        ? "text-success"
                                        : "text-error"
                                }`}
                            >
                                <Icon
                                    name={
                                        passValidate.lowercase
                                            ? "check"
                                            : "clear"
                                    }
                                />
                                1 letra minúscula
                            </span>
                            <span
                                className={`flex gap-2 ${
                                    passValidate.uppercase
                                        ? "text-success"
                                        : "text-error"
                                }`}
                            >
                                <Icon
                                    name={
                                        passValidate.uppercase
                                            ? "check"
                                            : "clear"
                                    }
                                />
                                1 letra maiscúla
                            </span>
                            <span
                                className={`flex gap-2 ${
                                    passValidate.number
                                        ? "text-success"
                                        : "text-error"
                                }`}
                            >
                                <Icon
                                    name={
                                        passValidate.number ? "check" : "clear"
                                    }
                                />
                                1 número
                            </span>
                            <span
                                className={`flex gap-2 ${
                                    passValidate.specialchar
                                        ? "text-success"
                                        : "text-error"
                                }`}
                            >
                                <Icon
                                    name={
                                        passValidate.specialchar
                                            ? "check"
                                            : "clear"
                                    }
                                />
                                1 caractere especial (!@#$%)
                            </span>
                        </div>
                    ) : null}
                    <Input
                        name="postal_code"
                        register={register}
                        error={errors.postal_code?.message}
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
                <div className="flex items-center justify-between mt-16">
                    <Button
                        type="submit"
                        text="Cadastrar"
                        classname="disabled:bg-[#7b50fc93] bg-primary rounded-full text-white text-xl leading-5 font-bold font-nunito-sans w-full py-[1.375rem]"
                    />
                </div>
            </form>
        </section>
    );
}

export default FormRegister;
