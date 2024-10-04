/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData } from "react-router-dom";
import Button from "../components/inputs/Button";
import api from "../service/api";
import { useEffect, useState } from "react";

export default function PaymentPage() {
    const { external_id } = useLoaderData() as any;

    const [data, setData] = useState({
        qr_code: "",
    });

    useEffect(() => {
        const res = async () => {
            try {
                const { data } = await api.checkPayment(external_id);
                setData(data);
            } catch (e) {
                console.error(e);
            }
        };
        res();
    }, [external_id]);

    console.log(data);

    return (
        <div className="w-full max-w-[580px] flex flex-col items-center justify-center shadow-lg p-8">
            <div className="flex flex-col">
                <span className="text-xl font-bold mb-2">
                    Escaneie o código QR para doar:
                </span>
                <ol className="flex flex-col gap-3">
                    <li>1. Acesse seu internet banking ou app de pagamentos</li>
                    <li>2. Escolha pagar via pix</li>
                    <li>3. Escaneie o código:</li>
                </ol>
                <img
                    className="w-96"
                    src={`data:image/png;base64,${data.qr_code}`}
                    alt=""
                />
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
        </div>
    );
}
