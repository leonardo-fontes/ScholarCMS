import { createContext } from "react";
import { SigninData } from "../../service/api";
import { User } from "../../types/User";

export type AuthContextType = {
    user: User | null;
    isLogged: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    signin: (data: SigninData) => Promise<boolean>;
    signout: () => void;
};


export const AuthContext = createContext<AuthContextType>(null!);
