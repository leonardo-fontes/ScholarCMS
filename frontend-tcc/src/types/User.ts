export type User = {
    name: string;
    surname: string;
    password: string;
    email: string;
    postal_code: string;
    state: string;
    city: string;
    status: number;
    role_id: number;
    cpf: string;
    birth_date: string;
    id: string;
    profile_picture_url: string;
    description?: string;
    points: number;
};

export enum Role {
    Beneficiario = "1",
    Doador = "2",
}
