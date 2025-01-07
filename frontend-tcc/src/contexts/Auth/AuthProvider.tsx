import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api, { SigninData } from "../../service/api";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import secureLocalStorage from "../../lib/secureLocalStorage";
import Loading from "../../components/layout/Loading";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

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
  const [, setIsVerifying] = useState(true);
  const [isVerifyingToken, setIsVerifyingToken] = useState(true);

  const hasUser = !!(user || secureLocalStorage.get("user"));
  // persist user
  useEffect(() => {
    const storedUser = secureLocalStorage.get("user");
    if (!user && storedUser) {
      setUser(JSON.parse(storedUser));
      getUser();
    } else {
      setIsVerifying(false);
      setIsVerifyingToken(false);
    }
  }, [user]);

  // validate user
  useEffect(() => {
    if (!isVerifyingToken && pathname.startsWith("/platform") && !hasUser) {
      navigate("/login");
    } else if (
      !isVerifyingToken &&
      ["login", "register"].some((page) => pathname.includes(page)) &&
      hasUser
    ) {
      navigate("/platform");
    }
    console.log("valor de hasUser:", JSON.stringify(hasUser, null, 2));
    console.log("valor do user:", JSON.stringify(user, null, 2));
  }, [navigate, pathname, user, isVerifyingToken]);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getUser = async (retries = 3) => {
    try {
      const user = await api.profile();
      if (user == null) {
        console.error("Usuário não encontrado. Redirecionando para login.");
        navigate("/login");
      }
      setUser(user);
      secureLocalStorage.set("user", JSON.stringify(user)); //Armazena os dados do usuário localmente.
    } catch (e) {
      if (retries > 0) {
        await delay(1000);
        getUser(retries - 1);
      } else {
        console.error("failed to get user");
        signout();
        navigate("/login");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const signin = async (data: SigninData): Promise<AxiosResponse<any> | undefined> => {
    try {
      setIsLoading(true)
      const response = await api.signin(data);
      //response ? setIsLoading(true) : setIsLoading(false)
      const { access_token, refresh_token } = response.data;
      secureLocalStorage.set("token", access_token);
      secureLocalStorage.set("refresh_token", refresh_token);
      console.log(access_token);
      console.log("response " + response?.data)
      await getUser();
      return response;
    } catch (error) {
      setIsLoading(false)
      if (error instanceof Error) {
        console.log(error.stack)
        if ((error as any).response && (error as any).response.data.message) {
          const serverError = (error as any).response.data;
          console.log("log do erro: " + serverError.message)
        }
        else {
          setTimeout(() => {
            toast.error("Erro ao realizar login. Tente novamente");
          }, 2)
        }
      }
    }
    finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const updateUserPicture = async (newPictureUrl: string): Promise<void> => {
    setUser((prevUser) => {
      if (prevUser === null) {
        return null;
      }
      return {
        ...prevUser,
        user_picture: newPictureUrl,
      };
    });
  };

  const signout = async () => {
    secureLocalStorage.remove("token");
    secureLocalStorage.remove("user");
    secureLocalStorage.remove("refresh_token");
    setUser(null);
  };

  const isLogged = user && user.id ? true : false;

  useEffect(() => {
    console.log("valor do user" + user);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, signin, signout, isLogged, updateUserPicture }}
    >
      <>{isLoading ? <Loading size={60} /> : children}</>
    </AuthContext.Provider>
  );
};
