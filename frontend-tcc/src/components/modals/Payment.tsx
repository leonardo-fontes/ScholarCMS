import Button from "../inputs/Button";
import Input from "../inputs/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../service/api";
import { Pay } from "../../types/Pay";
import schema from "../../validator/payment";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObject, ObjectSchema } from "yup";

interface Name {
    username: string;
}

export default function Payment({ username }: Name) {
    const navigate = useNavigate();

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

        const { external_id } = await api.generateQrCode({
            amount: data.amount as number,
            receiver_id: receiver_id,
            idempotency_key: uuidv4(),
        });

        external_id && navigate(`/payment/${external_id}`);

    };

    const currentAmount = watch("amount", 0);
    const buttonSelected =
        "border-2 min-w-20 text-center px-3 py-2 bg-primary rounded-lg";

    return (
        <form
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
            <Input
                className="w-96 my-8"
                name="amount"
                type="number"
                label="Digite o valor que quer contribuir: (R$)"
                error={errors.amount?.message}
                register={register}
                onChange={(e) => {
                    setValue("amount", Number(e.target.value));
                }}
            />

            <Button
                disabled={!(currentAmount > 0)}
                type="submit"
                children="Gerar código QR"
                classname={
                    currentAmount > 0
                        ? `bg-primary text-white text-xl font-bold p-2 px-8`
                        : ` bg-lightGray text-gray hover:shadow-none p-2`
                }
            />
        </form>
    );
}
