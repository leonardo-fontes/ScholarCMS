import Button from "../inputs/Button";
import Input from "../inputs/Input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import Icon from "../icons";
type Inputs = {
    cpf: string;
    password: string;
};

function FormLogin() {
    const [searchParams] = useSearchParams();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, watch } = useForm<Inputs>({
        defaultValues: {
            cpf: searchParams.get("cpf") ?? "",
        },
    });

    const cpf = watch("cpf");

    const handleLogin: SubmitHandler<Inputs> = async (data) => {
        const res = await auth.signin(data);
        if (res) {
            navigate("/platform");
        } else {
            //alert("deu errado o login");
        }
    };

    return (
        <section className="grid md:grid-cols-4 items-center">
            <img
                className="col-span-2 hidden md:block"
                src="/jovens.png"
                alt=""
            />
            <form
                className="bg-white text-black p-10 flex flex-col font-nunito w-full mt-16 md:mt-20 lg:max-w-[500px] md:col-span-2 mx-auto"
                onSubmit={handleSubmit(handleLogin)}
            >
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-6">
                        <h3 className="font-black text-2xl text-primary flex gap-[10px] items-center">
                            <Link className="bg-primary rounded-xl p-2" to="/">
                                <Icon name="logo" size={110} color="black" />
                            </Link>
                        </h3>
                        <Link
                            className="text-sm font-normal text-blue-3 underline"
                            to="/register"
                        >
                            Não tem uma conta? Fazer cadastro
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-10 mt-4 mb-8">
                    <div className="flex flex-col gap-5">
                        <p className="font-black font-nunito text-2xl">Login</p>
                        <Input
                            register={register}
                            name="cpf"
                            type="text"
                            label="CPF"
                        />
                        <Input
                            containerClassName="mt-5"
                            register={register}
                            name="password"
                            type="password"
                            label="Senha"
                        />
                    </div>
                    <Link
                        className="text-sm text-center text-blue-3 font-normal underline py-2"
                        to={`/forgot-password?cpf=${cpf}`}
                    >
                        Esqueceu a senha?
                    </Link>
                    <div className="flex items-center justify-between">
                        <Button
                            type="submit"
                            children="Entrar"
                            classname="bg-primary rounded-full text-white text-xl leading-5 font-bold font-nunito-sans w-full py-[1.375rem]"
                        />
                    </div>
                </div>
                <div className="text-center text-gray-3 font-nunito-sans py-2">
                    <Link
                        className="text-sm text-center font-normal underline py-2"
                        to="/terms"
                    >
                        Termos e Condições
                    </Link>{" "}
                    -{" "}
                    <Link
                        className="text-sm text-center font-normal underline py-2"
                        to="/privacy-policies"
                    >
                        Políticas de Privacidade
                    </Link>
                </div>
            </form>
        </section>
    );
}

export default FormLogin;
