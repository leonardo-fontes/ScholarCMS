import axios from "axios";
import { RecoverData } from "../components/forms/FormRecover";
import { ForgotPasswordData } from "../components/forms/FormForgotPassword";
import secureLocalStorage from "../lib/secureLocalStorage";
import { User } from "../types/User";
import helpers from "../helpers";
import { RegisterData } from "../types/RegisterData";
import { Post } from "../types/publications/Post";
import { Pay } from "../types/Pay";

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

http.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            const token = await getNewToken();
            error.config.headers.Authorization = `Bearer ${token}`;
            return http.request(error.config);
        }
    }
);

const getNewToken = async () => {
    const refresh_token = secureLocalStorage.get("refresh_token");
    const response = await http.post("/refresh-token", { refresh_token });
    const { access_token } = response.data;
    secureLocalStorage.set("token", access_token);
    return access_token;
};

export default {
    validateToken: async () => {
        const response = await http.post("/auth");
        return response.data;
    },
    signin: async (data: SigninData) => {
        try {
            const response = await http.post("/login", data);
            const { access_token, refresh_token, user } = response.data;
            http.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${access_token}`;
            secureLocalStorage.set("token", access_token);
            secureLocalStorage.set("refresh_token", refresh_token);
            secureLocalStorage.set("user", user);
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
        try {
            const { data } = await http.get("/profile");
            return data as User;
        } catch (e) {
            return null;
        }
    },
    searchCep: async (cep: string) => {
        try {
            const cepFormatted = helpers.validate.cep(cep);
            const response = await fetch(
                `https://viacep.com.br/ws/${cepFormatted}/json/`
            );

            if (!response.ok) {
                throw new Error(`Erro ao buscar CEP: ${response.statusText}`);
            }

            const address = await response.json();
            return address;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    createPost: async (data: Post) => {
        try {
            await http.post("/posts", data);
            return true;
        } catch (e) {
            return false;
        }
    },

    getPostbyId: async (id: number) => {
        try {
            const { data } = await http.get(`/posts/${id}`);
            return data as Post;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    sendVerifiedEmail: async (token: string) => {
        try {
            await http.get(`/verify-email?token=${token}`);
            return true;
        } catch (e) {
            return false;
        }
    },

    createComment: async (data: string, postId: number) => {
        try {
            await http.post(`/comments/${postId}`, data);
            return true;
        } catch (e) {
            return false;
        }
    },

    generateQrCode: async (data: Pay) => {
        try {
            const res = await http.post("/pay", data);
            return res.data;
        } catch (e) {
            alert("Erro ao gerar QR Code");
            console.error(e);
        }
    },

    checkPayment: async (data: string) => {
        try {
            const res = await http.get(`/pay/status/${data}`);
            return res.data;
        } catch (e) {
            return false;
        }
    },
};
