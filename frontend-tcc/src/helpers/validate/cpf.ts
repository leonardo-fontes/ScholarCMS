export default function cpf(cpf: string) {
    return cpf.replace(/[.-]/g, "");
}
