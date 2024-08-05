import "yup-phone";
import * as yup from "yup";
import { subYears } from "date-fns";
const dateLimit = subYears(new Date(), 18);


export function validatePassword(password: string) {
    const uppercase = /^(?=.[A-Z])/.test(password);
    const lowercase = /^(?=.[a-z])/.test(password);
    const number = /^(?=.[0-9])/.test(password);
    const specialchar = /^(?=.[!@#$%^&*])/.test(password);
    return {
        length: password?.length >= 8,
        uppercase,
        lowercase,
        number,
        specialchar,
    };
}


export default yup
    .object({
        name: yup.string().required("Digite o seu nome"),
        surname: yup.string().required("Digite o seu sobrenome"),
        email: yup
            .string()
            .email("Digite um email válido")
            .required("Digite o seu email"),

        cpf: yup
            .string()
            .matches(
                /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                "Digite um cpf válido",
            )
            .required(),
        postal_code: yup
            .string()
            .matches(
                /^\d{5}-\d{3}$/,
                "Digite um CEP válido",
            )
            .required(),
        birth_date: yup
            .date()
            .typeError("Digite uma data de nascimento válida")
            .max(dateLimit, "Digite uma data de nascimento válida")
            .required("Digite uma data de nascimento válida"),
        password: yup.string().required("Sua senha deve conter, pelo menos:")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "Sua senha deve conter, pelo menos:",
            ),
    })
    .required();