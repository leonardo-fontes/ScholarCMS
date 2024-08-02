import { createContext } from "react";
import { SigninData } from "../../service/api";
import { User } from "../../types/User";


export type AuthContextType = {
    user: User | string | null;
    setUser: React.Dispatch<React.SetStateAction<string | User | null>>;
    signin: (data: SigninData) => Promise<boolean>;
    signout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);