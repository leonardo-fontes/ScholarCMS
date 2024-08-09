import axios from "axios";
import { RegisterData } from "../components/forms/FormRegister";
import { RecoverData } from "../components/forms/FormRecover";
import { ForgotPasswordData } from "../components/forms/FormForgotPassword";
import secureLocalStorage from "../lib/secureLocalStorage";
import { User } from "../types/User";
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

const token = secureLocalStorage.get("token");

export const http = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : null,
    },
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
            const response = await http.post("/register", data);
            console.log(response.data);
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
        const profile: User = await http.get("/profile");
        return profile;
    },
};
