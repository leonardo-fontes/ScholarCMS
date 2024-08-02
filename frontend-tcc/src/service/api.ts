import axios from "axios";
import { RegisterData } from "../components/forms/FormRegister";
import { RecoverData } from "../components/forms/FormRecover";
import { ForgotPasswordData } from "../components/forms/FormForgotPassword";
import secureLocalStorage from "../lib/secureLocalStorage";

export type SigninData = {
    email: string;
    password: string;
};

export type SignupData = SigninData & {
    first_name: string;
    last_name: string;
    username: string;
    birthdate: string;
    mobilelogin: string;
};

const token = secureLocalStorage.get("token");

export const http = axios.create({
    baseURL: "",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        x_ic_auth: import.meta.env.VITE_API_KEY,
        Authorization: token ? `Bearer ${token}` : null,
    },
});

export default {
    validateToken: async (token: string) => {
        const response = await http.post("/validate", { token });
        return response.data;
    },
    signin: async (data: SigninData) => {
        try {
            const response = await http.post("/auth", data);
            http.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.token}`;
            secureLocalStorage.set("token", response.data.token);
            secureLocalStorage.set("user", response.data.id);
            return true;
        } catch (e) {
            return false;
        }
    },
    register: async (data: RegisterData) => {
        const body = {
            type: "user",
            username: data.username,
            email: data.email,
            name: data.name,
            password: data.password,
            photo_profile: "",
            photo_cover: "",
            infos_about: {
                about: "",
                beapart: "",
                biography: "",
                birthdate: data.birthdate,
                cause: "",
                commercialpartner: "",
                disability: null,
                gender: "",
                interests: "",
                location: "",
                mobilelogin: data.mobilelogin,
                profession: "",
                studies: "",
                challenge: null,
                adaptations: null,
                social_networks: null,
                theinterests: "",
            },
        };
        try {
            const response = await http.post("/register", body);
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
    
};