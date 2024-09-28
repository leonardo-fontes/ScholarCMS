import Button from "../inputs/Button";
import Input from "../inputs/Input";
import { Link, useSearchParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../service/api";
import { useMemo, useState } from "react";

export type ForgotPasswordData = {
    email: string;
};

function FormLogin() {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState<"success" | "error" | null>(null);
    const {
        register,
        handleSubmit,
        watch,
        // formState: { errors },
    } = useForm<ForgotPasswordData>({
        defaultValues: { email: searchParams.get("email") ?? "" },
    });
    const feedback = useMemo(
        () =>
            message === "success"
                ? "E-mail enviado com link para redefinação de senha."
                : "Algo aconteceu, tente novamente.",
        [message]
    );
    const classNameFeedback = useMemo(
        () =>
            message === "success"
                ? "border-success bg-[#5fffaf3a] text-success"
                : "border-error bg-[#FFEDED] text-error",
        [message]
    );
    const email = watch("email");
    const handleForgot: SubmitHandler<ForgotPasswordData> = async (data) => {
        try {
            await api.forgotPassword(data);
            setMessage("success");
        } catch (err) {
            console.error(err);
            setMessage("error");
        }
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    return (
        <form
            className="bg-white text-black p-10 flex flex-col font-nunito w-full  lg:max-w-[500px]"
            onSubmit={handleSubmit(handleForgot)}
        >
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-6">
                    <h3 className="font-black text-2xl text-primary flex gap-[10px] items-center">
                        <Link to="/">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="43"
                                viewBox="0 0 40 43"
                                fill="none"
                            >
                                <path
                                    className="fill-primary"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.9618 0.0922628C8.06415 1.32946 1.92648 7.76964 0.421859 16.3982C-0.715714 22.9215 0.466449 29.2866 3.73735 34.2484C4.7362 35.7634 7.20524 38.2839 8.66675 39.2802C14.0437 42.9457 21.0574 43.4117 26.4307 40.4605C27.7889 39.7145 28.5895 39.1563 29.7822 38.124L30.8575 37.1932L30.9424 37.8325C31.1391 39.3155 32.4548 40.9257 33.8338 41.3711C34.7342 41.6619 36.151 41.6613 37.0682 41.3696C38.0717 41.0505 39.3043 39.824 39.7085 38.7421L40 37.962L39.9647 20.5303L39.9292 3.09869L39.6141 2.46449C39.1878 1.60693 38.3419 0.786054 37.4518 0.36611C36.8203 0.0682925 36.5339 0.0187453 35.4431 0.0187453C34.3208 0.0187453 34.081 0.0629362 33.4073 0.393696C32.0465 1.06204 30.8902 2.7374 30.8902 4.04116C30.8902 4.29612 30.8609 4.50476 30.8248 4.50476C30.7889 4.50476 30.232 4.11467 29.5872 3.63795C27.4779 2.07816 24.7395 0.83627 22.1746 0.276255C20.9993 0.0196822 17.1525 -0.094275 15.9618 0.0922628ZM22.6547 11.7947C25.2112 12.655 27.1681 14.3642 28.2691 16.6987C28.9126 18.0627 29.1116 18.9282 29.276 21.0773C29.4885 23.8571 29.7016 29.3471 29.6064 29.5951C29.4351 30.0413 28.942 29.8045 27.7019 28.6807L26.4555 27.5512L25.6496 28.2004C24.6153 29.034 23.4232 29.617 22.0371 29.9676C21.1207 30.1993 20.661 30.2356 19.3172 30.1824C16.6442 30.0766 15.0471 29.3657 13.0735 27.4035C11.8115 26.1489 11.1869 25.1138 10.6497 23.3862C10.389 22.5476 10.3392 22.1055 10.3481 20.708C10.3574 19.2785 10.4104 18.8777 10.7117 17.9628C11.7962 14.6697 14.3957 12.3195 17.8339 11.524C19.1162 11.2272 21.3393 11.352 22.6547 11.7947Z"
                                />
                            </svg>
                        </Link>
                        Teste
                    </h3>
                    <Link
                        className="text-sm font-normal text-blue-3 underline"
                        to={`/login?email=${email}`}
                    >
                        Voltar para o login
                    </Link>
                </div>
            </div>

            <div className="flex flex-col gap-10 mt-4 mb-8">
                <div className="flex flex-col">
                    <h1 className="font-black font-nunito text-2xl">
                        Esqueceu a senha
                    </h1>
                    <p className="font-nunito-sans text-sm font-normal text-gray-3 pt-2 pb-6">
                        Preencha seu endereço de email para receber um link para
                        redefinir a senha.
                    </p>
                    <Input
                        register={register}
                        name="email"
                        type="text"
                        label="E-mail"
                    />
                </div>
                {message ? (
                    <div
                        className={`${classNameFeedback} border-[1px] p-4 rounded-md`}
                    >
                        {feedback}
                    </div>
                ) : null}

                <div className="flex items-center justify-between">
                    <Button
                        type="submit"
                        children="Recuperar senha"
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
    );
}

export default FormLogin;
