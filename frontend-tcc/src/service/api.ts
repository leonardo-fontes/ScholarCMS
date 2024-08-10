import axios from "axios";
import { RecoverData } from "../components/forms/FormRecover";
import { ForgotPasswordData } from "../components/forms/FormForgotPassword";
import secureLocalStorage from "../lib/secureLocalStorage";
import { User } from "../types/User";
import helpers from "../helpers";
import { RegisterData } from "../types/RegisterData";

export type SigninData = {
    cpf: string;
    password: string;
};

export type SignupData = SigninData & {
    name: string;
    surname: string;
    username: string;
    birth_date: string;
};

export const http = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        Authorization: secureLocalStorage.get("token")
            ? `Bearer ${secureLocalStorage.get("token")}`
            : null,
    },
});

http.interceptors.request.use(function (config) {
    const token = secureLocalStorage.get("token");
    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default {
    validateToken: async () => {
        const response = await http.post("/auth");
        return response.data;
    },
    signin: async (data: SigninData) => {
        try {
            const response = await http.post("/login", data);
            http.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.access_token}`;
            secureLocalStorage.set("token", response.data.access_token);
            secureLocalStorage.set("user", response.data.user);
            return true;
        } catch (e) {
            return false;
        }
    },
    register: async (data: RegisterData) => {
        try {
            await http.post("/register", data);
            return true;
        } catch (e) {
            return false;
        }
    },
    resetPassword: async (data: RecoverData) => {
        await http.post("/reset-password", data);
        return true;
    },
    forgotPassword: async (data: ForgotPasswordData) => {
        await http.post("/recover-password", data);
        return true;
    },
    profile: async () => {
        const { data } = await http.get("/profile");
        return data as User;
    },
    searchCep: async (cep: string) => {
        try {
            const cepFormatted = helpers.validate.cep(cep);
            const response = await fetch(`https://viacep.com.br/ws/${cepFormatted}/json/`);
            
            if (!response.ok) {
                throw new Error(`Erro ao buscar CEP: ${response.statusText}`);
            }
            
            const address = await response.json();
            return address;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
};
