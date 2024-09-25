import { useState } from "react";
import Button from "../inputs/Button";
import Input from "../inputs/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../service/api";

interface PaymentData {
    payvalue: number;
}

export default function Payment() {
    const [qrcode, setQrcode] = useState("MVÇOSAOIFDJADSNASsadhuasdhuas...");

    const {
        register,
        handleSubmit,
        watch,
        // formState: { errors },
    } = useForm<PaymentData>({
        defaultValues: { payvalue: 0 },
    });

    const handlePayment: SubmitHandler<PaymentData> = async (data) => {
        // try {
        //     await api.forgotPassword(data);
        // } catch (err) {
        //     console.log(err);
        // }
        // setTimeout(() => {
        //     setMessage(null);
        // }, 3000);
    };

    const [valueSelected, setValueSelected] = useState(1);
    const buttonSelected =
        "border-2 min-w-20 text-center px-3 py-2 bg-primary rounded-lg";
    return (
        // <div className="w-full max-w-[580px] flex flex-col items-center justify-center shadow-lg p-8">
        //
        //     <div className="flex flex-col">
        //         <span className="text-xl font-bold mb-2">
        //             Escaneie o código QR para doar:
        //         </span>
        //         <ol className="flex flex-col gap-3">
        //             <li>1. Acesse seu internet banking ou app de pagamentos</li>
        //             <li>2. Escolha pagar via pix</li>
        //             <li>3. Escaneie o código:</li>
        //         </ol>
        //         <img className="w-96" src="/qrcode.png" alt="" />
        //         <span className="text-gray mb-2">
        //             pague e será creditado na hora.
        //         </span>
        //         {/* <span className="mb-2">
        //             Ou copie este código para fazer o pagamento:
        //         </span>
        //         <div className="w-full relative">
        //             <input
        //                 className="bg-lightGray p-2 w-full"
        //                 type="text"
        //                 value={qrcode}
        //             />
        //             <Button
        //                 onClick={() => {
        //                     alert("qrcode copiado com sucesso!");
        //                 }}
        //                 children={"copiar"}
        //                 classname="absolute right-2 top-1"
        //             />
        //         </div> */}
        //     </div>
        //     <Button
        //         children={"VOLTAR"}
        //         classname="w-[60%] border-primary border-2 text-primary font-bold text-lg mt-12"
        //         isLink
        //         link="/home"
        //     />
        // </div>
        <form
            onSubmit={handleSubmit(handlePayment)}
            className="w-full max-w-[580px] flex flex-col  shadow-lg p-8"
        >
            <h2 className="text-xl mb-8 text-center">
                Doar para <strong className="font-bold">Leonardo Fontes</strong>
            </h2>
            <span className="text-md mb-3">Valores sugeridos:</span>
            <div className="flex gap-12 text-white justify-around font-semibold text-lg">
                <Button
                    children="R$10"
                    classname={
                        valueSelected === 1
                            ? buttonSelected
                            : `min-w-20 text-center px-3 py-2 border-2 border-primary text-primary`
                    }
                    onClick={() => setValueSelected(1)}
                />

                <Button
                    classname={
                        valueSelected === 2
                            ? buttonSelected
                            : `min-w-20 text-center px-3 py-2 border-2 border-primary text-primary`
                    }
                    children="R$25"
                    onClick={() => setValueSelected(2)}
                />

                <Button
                    children="R$50"
                    classname={
                        valueSelected === 3
                            ? buttonSelected
                            : `min-w-20 text-center px-3 py-2 border-2 border-primary text-primary`
                    }
                    onClick={() => setValueSelected(3)}
                />

                <Button
                    children="R$100"
                    classname={
                        valueSelected === 4
                            ? buttonSelected
                            : `min-w-20 text-center px-3 py-2 border-2 border-primary text-primary`
                    }
                    onClick={() => setValueSelected(4)}
                />
            </div>
            <span className="self-center my-8 text-gray">OU</span>
            <Input
                name="valuePay"
                type="number"
                label="Digite o valor que quer contribuir:"
                register={register}
            />
        </form>
    );
}
