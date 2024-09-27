import { useState } from "react";
import Button from "../inputs/Button";
import Input from "../inputs/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../service/api";
import { Pay } from "../../types/Pay";
import schema from "../../validator/payment";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObject, ObjectSchema } from "yup";

interface Name {
    username: string;
}


export default function Payment({ username }: Name) {
    const [qrcode, setQrcode] = useState("");

    const { id } = useParams<{ id: string }>();
    const receiver_id = Number(id);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<Pay>({
        defaultValues: { amount: 0 },
        resolver: yupResolver<Pay>(
            schema as unknown as ObjectSchema<Pay, AnyObject, "">
        ),
    });

    const handlePayment: SubmitHandler<Pay> = async (data) => {
        try {
            const res = await api.pay({
                amount: data.amount as number,
                receiver_id: receiver_id,
                idempotency_key: uuidv4(),
            });
            setQrcode(res.qrcode);
        } catch (error) {
            console.error(error);
        }
    };

    const currentAmount = watch("amount", 0);
    const buttonSelected =
        "border-2 min-w-20 text-center px-3 py-2 bg-primary rounded-lg";

    return (<> {qrcode ? <div className="w-full max-w-[580px] flex flex-col items-center justify-center shadow-lg p-8">

        <div className="flex flex-col">
            <span className="text-xl font-bold mb-2">
                Escaneie o código QR para doar:
            </span>
            <ol className="flex flex-col gap-3">
                <li>1. Acesse seu internet banking ou app de pagamentos</li>
                <li>2. Escolha pagar via pix</li>
                <li>3. Escaneie o código:</li>
            </ol>
            <img className="w-96" src="/qrcode.png" alt="" />
            <span className="text-gray mb-2">
                pague e será creditado na hora.
            </span>
            {/* <span className="mb-2">
                Ou copie este código para fazer o pagamento:
            </span>
            <div className="w-full relative">
                <input
                    className="bg-lightGray p-2 w-full"
                    type="text"
                    value={qrcode}
                />
                <Button
                    onClick={() => {
                        alert("qrcode copiado com sucesso!");
                    }}
                    children={"copiar"}
                    classname="absolute right-2 top-1"
                />
            </div> */}
        </div>
        <Button
            children={"VOLTAR"}
            classname="w-[60%] border-primary border-2 text-primary font-bold text-lg mt-12"
            isLink
            link="/home"
        />
    </div> : <form
        onSubmit={handleSubmit(handlePayment)}
        className="w-full max-w-[580px] h-[460px] flex flex-col items-center shadow-lg p-8"
    >
        <h2 className="text-xl mb-8 text-center">
            Doar para <strong className="font-bold">{username}</strong>
        </h2>
        <span className="text-md mb-3">Valores sugeridos:</span>
        <div className="flex gap-12 text-white justify-around font-semibold text-lg">
            <Button
                children="R$10"
                classname={
                    currentAmount === 10
                        ? buttonSelected
                        : `min-w-20 text-center px-3 py-2 border-2 border-primary text-primary`
                }
                onClick={() => setValue("amount", 10)}
            />

            <Button
                classname={
                    currentAmount === 25
                        ? buttonSelected
                        : `min-w-20 text-center px-3 py-2 border-2 border-primary text-primary`
                }
                children="R$25"
                onClick={() => setValue("amount", 25)}
            />

            <Button
                children="R$50"
                classname={
                    currentAmount === 50
                        ? buttonSelected
                        : `min-w-20 text-center px-3 py-2 border-2 border-primary text-primary`
                }
                onClick={() => setValue("amount", 50)}
            />

            <Button
                children="R$100"
                classname={
                    currentAmount === 100
                        ? buttonSelected
                        : `min-w-20 text-center px-3 py-2 border-2 border-primary text-primary`
                }
                onClick={() => setValue("amount", 100)}
            />
        </div>
        <span className="self-center my-8 text-gray">OU</span>
        <Input className="w-96 my-8"
            name="amount"
            type="number"
            label="Digite o valor que quer contribuir: (R$)"
            error={errors.amount?.message}
            register={register}
            onChange={(e) => {
                setValue("amount", Number(e.target.value));
            }}
        />

        <Button disabled={!(currentAmount > 0)} type="submit" children="Gerar código QR" classname={currentAmount > 0 ? `bg-primary text-white text-xl font-bold p-2 px-8` : ` bg-lightGray text-gray hover:shadow-none p-2`} />
    </form>}

    </>
    );
}




