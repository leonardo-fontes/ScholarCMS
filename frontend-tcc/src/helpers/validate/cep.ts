export default function cep(cep: string) {
    return cep.replace(/[-]/g, "");
}
