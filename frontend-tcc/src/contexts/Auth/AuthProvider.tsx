import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api, { SigninData } from "../../service/api";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import secureLocalStorage from "../../lib/secureLocalStorage";

// eslint-disable-next-line react-refresh/only-export-components

export const AuthProvider = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => {
    const [user, setUser] = useState<User | null>(null);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // persist user
    useEffect(() => {
        if (!user && secureLocalStorage.get("user")) getUser();
    }, [user]);

    // validate user
    useEffect(() => {
        if (
            pathname.startsWith("/platform") &&
            !(user || secureLocalStorage.get("user"))
        ) {
            navigate("/login");
        } else if (
            ["login", "register"].filter((page) => pathname.includes(page))
                .length &&
            (user || secureLocalStorage.get("user"))
        ) {
            navigate("/platform");
        }
    }, [navigate, pathname, user]);

    const getUser = async () => {
        const user = await api.profile();
        setUser(user);
    };

    const signin = async (data: SigninData) => {
        const response = await api.signin(data);
        await getUser();
        return response;
    };

    const signout = async () => {
        secureLocalStorage.remove("token");
        secureLocalStorage.remove("user");
        setUser(null);
    };

    //const isLogged = user && user.id ? true : false;
    const isLogged: boolean = true;
    return (
        <AuthContext.Provider
            value={{ user, setUser, signin, signout, isLogged }}
        >
            {children}
        </AuthContext.Provider>
    );
};
