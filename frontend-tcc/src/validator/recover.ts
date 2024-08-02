import "yup-phone";
import * as yup from "yup";

export default yup
    .object({
        email: yup.string(),
        hash: yup.string(),
        password: yup.string().required("Sua senha deve conter, pelo menos:"),
        confirmPassword: yup
            .string()
            .required('Confirmação de senha é obrigatória')
            .oneOf([yup.ref("password")], "Senhas não correspondem"),
    })
    .required();