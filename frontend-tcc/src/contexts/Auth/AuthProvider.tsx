import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api, { SigninData } from "../../service/api";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import secureLocalStorage from "../../lib/secureLocalStorage";
import Loading from "../../components/Loading/Loading"

// eslint-disable-next-line react-refresh/only-export-components

export const AuthProvider = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => {
    const [user, setUser] = useState<User | null>(null);
    console.log(user)
    const [isLoading, setIsLoading] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // persist user
    useEffect(() => {
        const storedUser = secureLocalStorage.get("user");
        if (!user && storedUser) {
            getUser();
        }
    }, [user]);

    // validate user
    useEffect(() => {
        const storedUser = secureLocalStorage.get("user");
        if (
            pathname.startsWith("/platform") &&
            !(user || storedUser)
        ) {
            navigate("/login");
        } else if (
            ["login", "register"].some((page) => pathname.includes(page)) &&
            (user || storedUser)
        ) {
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
            setIsLoading(false);
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
            {isLoading ? <Loading queryKey="loading" queryFn={() => new Promise(() => { })} /> : children}
        </AuthContext.Provider>
    );
};
