
import * as yup from "yup";

export default yup
    .object({
        amount: yup.number()
            .required("Valor é obrigatório")
            .integer("O valor deve ser um número inteiro")
            .positive("O valor deve ser positivo"),
    })
    .required();