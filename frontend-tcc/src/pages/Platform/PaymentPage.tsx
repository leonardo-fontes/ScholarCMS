/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData } from "react-router-dom";
import Button from "../../components/inputs/Button";
import api from "../../service/api";
import { useEffect, useState } from "react";
import calcAmount from "../../helpers/calculate/payment";

export default function PaymentPage() {
  const { external_id } = useLoaderData() as any;

  const [data, setData] = useState({
    qr_code: "",
    amount: 0,
    status: 0,
  });

  const { recalculatedAmount, threePercent } = calcAmount(data.amount);

  useEffect(() => {
    const checkPayment = async () => {
      try {
        const { data } = await api.checkPayment(external_id);
        setData(data);
        if (data.status === 1) {
          clearInterval(intervalId);
        }
      } catch (e) {
        console.error(e);
      }
    };
    const intervalId = setInterval(checkPayment, 5000);
    const timeoutId = setTimeout(
      () => clearInterval(intervalId),
      30 * 60 * 1000
    );
    checkPayment();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [external_id]);

  return (
    <div className="w-full flex items-center justify-center">
      {data.status === 0 ? (
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
              className="w-96 self-center"
              src={`data:image/png;base64,${data.qr_code}`}
              alt=""
            />
            <div className="flex flex-col items-center gap-2 mt-4 mb-4">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
              <span className="text-gray-600 font-medium">
                Aguardando pagamento...
              </span>
            </div>
            <span className="text-gray text-xs mb-2">
              Pague e será creditado na hora.
            </span>
            <span className="text-gray text-xs mb-2">
              Obs: O beneficiário receberá {`R$${recalculatedAmount}`}, pois 3%{" "}
              {`(R$${threePercent})`} do valor é destinado à plataforma.
            </span>
          </div>
          <Button
            children={"VOLTAR"}
            classname="w-[60%] border-primary border-2 text-primary font-bold text-lg mt-12"
            href="/platform"
          />
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <div className="p-16 flex items-center justify-center border-y-[0.2px] border-lightGray shadow-xl">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl">Obrigado por contribuir!</h3>
              <span className="text-2xl">Sua doação faz toda a diferença!</span>
              <img className="m-20" src="/donation.png" alt="" />
              <Button
                href="/platform"
                children="VOLTAR PARA A PLATAFORMA"
                classname="text-lg md:text-xl font-semibold md:font-extrabold text-white bg-primary px-4 md:py-2 "
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
