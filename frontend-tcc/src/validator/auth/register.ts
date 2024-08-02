import "yup-phone";
import * as yup from "yup";
import { subYears } from "date-fns";
const dateLimit = subYears(new Date(), 18);

export default yup
    .object({
        agree: yup
            .boolean()
            .oneOf(
                [true],
                "É obrigatório aceitar os nossos termos e políticas.",
            )
            .required("É obrigatório aceitar os nossos termos e políticas."),
        name: yup.string().required("Digite o seu nome"),
        email: yup
            .string()
            .email("Digite um email válido")
            .required("Digite o seu email"),
        username: yup.string().required("Digite um nome de usuário"),
        mobilelogin: yup
            .string()
            .matches(
                /^\s?(\(?\d{2,3}\)?)\s?-?\s?(\(?\d{4,5}\)?)\s?-\s?(\(?\d{4}\)?)?$/,
                "Digite um telefone válido",
            )
            .required(),
        cpf: yup
            .string()
            .matches(
                /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                "Digite um cpf válido",
            )
            .required(),
        cep: yup
            .string()
            .matches(
                /^\d{5}-\d{3}$/,
                "Digite um CEP válido",
            )
            .required(),
        birthdate: yup
            .date()
            .typeError("Digite uma data de nascimento válida")
            .max(dateLimit, "Digite uma data de nascimento válida")
            .required("Digite uma data de nascimento válida"),
        password: yup.string().required("Sua senha deve conter, pelo menos:"),
    })
    .required();