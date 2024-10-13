import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api, { SigninData } from "../../service/api";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import secureLocalStorage from "../../lib/secureLocalStorage";
import Loading from "../../components/layout/Loading";

// eslint-disable-next-line react-refresh/only-export-components

export const AuthProvider = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => {
    const [user, setUser] = useState<User | null>(null);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // persist user
    useEffect(() => {
        if (!user && secureLocalStorage.get("user")) getUser();
    }, [user]);

    // validate user
    useEffect(() => {
        const hasUser = user || secureLocalStorage.get("user")
        if (
            pathname.startsWith("/platform") &&
            !(hasUser)
        ) {
            navigate("/login");
        } else if (["login", "register"].some((page) => pathname.includes(page)) && (hasUser)) {
            navigate("/platform");
        }
    }, [navigate, pathname, user]);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const getUser = async (retries = 3) => {
        try {
            const user = await api.profile();
            setUser(user);
        } catch (e) {
            if (retries > 0) {
                await delay(1000);
                getUser(retries - 1);
            } else {
                console.error('failed to get user');
            }
        }
    };


    const signin = async (data: SigninData) => {
        setIsLoading(true);
        try {
            const response = await api.signin(data);
            await getUser();
            return response;
        }
        finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    const signout = async () => {
        secureLocalStorage.remove("token");
        secureLocalStorage.remove("user");
        secureLocalStorage.remove("refresh_token");
        setUser(null);
    };

    const isLogged = user && user.id ? true : false;

    return (
        <AuthContext.Provider
            value={{ user, setUser, signin, signout, isLogged }}
        >
            <>
                {isLoading ? <Loading size={60} /> : children}
                {console.log(isLoading)}
            </>
        </AuthContext.Provider>
    );
};
