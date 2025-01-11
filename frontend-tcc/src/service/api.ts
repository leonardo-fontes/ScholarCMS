import axios from "axios";
import { RecoverData } from "../components/forms/FormRecover";
import { ForgotPasswordData } from "../components/forms/FormForgotPassword";
import secureLocalStorage from "../lib/secureLocalStorage";
import { User } from "../types/User";
import helpers from "../helpers";
import { RegisterData } from "../types/RegisterData";
import { Pay } from "../types/Pay";
import { Notification } from "../types/Notification";

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
  },
});

// export const tarefa = axios.create({
//   baseURL: `https://accesso-dev-mocks.wiremockapi.cloud/`,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

http.interceptors.request.use(
  (config) => {
    const token = secureLocalStorage.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = secureLocalStorage.get("refresh_token");
        if (!refreshToken) return Promise.reject(error);
        const response = await axios
          .post(`${import.meta.env.VITE_BASE_URL}/api/refresh-token`, {
            refresh_token: refreshToken,
          })
          .catch(() => {
            secureLocalStorage.remove("token");
            secureLocalStorage.remove("refresh_token");
            secureLocalStorage.remove("user");
            window.location.href = "/login";
          });

        if (!response) {
          return Promise.reject(error);
        }
        const { access_token } = response.data;
        secureLocalStorage.set("token", access_token);
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        return http(originalRequest);
      } catch (e) {
        secureLocalStorage.remove("token");
        secureLocalStorage.remove("refresh_token");
        secureLocalStorage.remove("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// const getNewToken = async () => {
//   const refresh_token = secureLocalStorage.get("refresh_token");
//   if (!refresh_token) {
//     throw new Error("Refresh token não encontrado");
//   }
//   const response = await http.post("/refresh-token", { refresh_token });
//   const { access_token } = response.data;
//   secureLocalStorage.set("token", access_token);
//   return access_token;
// };

export default {
  validateToken: async () => {
    const response = await http.post("/auth");
    return response.data;
  },

  signin: async (data: SigninData) => {
    return await http.post("/login", data);
  },

  register: async (data: RegisterData) => {
    await http.post("/register", data);
  },

  resetPassword: async (data: RecoverData) => {
    await http.post("/reset-password", data);
    return true;
  },

  forgotPassword: async (data: ForgotPasswordData) => {
    await http.post("/recover-password", data);
    return true;
  },

  profile: async (id?: string) => {
    try {
      const url = id ? `/profile/${id}` : "/profile";
      const { data } = await http.get(url);
      return data as User;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.response && e.response.status === 403) {
        console.error(
          "Erro 403: Acesso negado. Verifique o token de autenticação."
        );
        secureLocalStorage.remove("token");
        secureLocalStorage.remove("refresh_token");
        secureLocalStorage.remove("user");
      }
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

  createPost: async (data: FormData) => {
    try {
      // 'data' agora é do tipo FormData
      const response = await http.post("/posts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Erro ao criar post" + error);
      if (error instanceof Error) {
        if ((error as any).response) {
          const responseError = error as any;
          throw new Error(
            "Error do servidor: " +
              responseError.response.status +
              "" +
              responseError.response.data.message
          );
        } else if ((error as any).request) {
          throw new Error(
            "Error de rede, pois nenhuma resposta foi recebida do servidor"
          );
        } else
          throw new Error("Erro ao configurar a requisição " + error.message);
      }
    }
  },

  getPostbyId: async (id: string | number) => {
    try {
      const response = await http.get(`/post/${id}`);
      return response.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  getPostByUserId: async (id: string | number) => {
    try {
      const response = await http.get(`/posts/user/${id}`);
      return response.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  getPostByUser: async () => {
    try {
      const response = await http.get(`/me/posts`);
      return response.data;
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

  createComment: async (data: { content: string }, postId: number) => {
    try {
      const response = await http.post(`/comments/${postId}`, data);
      return response.status;
    } catch (e) {
      return false;
    }
  },

  deleteComment: async (commentId: number) => {
    try {
      await http.delete(`/comments/${commentId}`);
      return true;
    } catch (error) {
      console.error("Error deleting comment:", error);
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

  changePicture: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("profile_picture", file);

      const res = await http.post(`/profile-picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  getPicture: (url: string) => {
    const R2PublicUrl = "https://pub-5d82528941b04bcb962eb65081d077e5.r2.dev/";

    return R2PublicUrl + url;
  },

  // função antiga
  getPictureV2: async (url: string) => {
    try {
      const response = await http.get(`/photos/${encodeURIComponent(url)}`, {
        //const response = await http.get("https://pub-5d82528941b04bcb962eb65081d077e5.r2.dev/" + url, {
        responseType: "blob", // Retorna a imagem como um blob
      });

      // Cria uma URL a partir do blob
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (e) {
      console.error("Erro ao buscar a imagem: " + e);
      return null;
    }
  },

  getCities: async () => {
    try {
      const response = await http.get<string[]>("/cities");
      return response.data;
    } catch (e) {
      console.error("Erro ao buscar cidades", e);
      return [];
    }
  },

  getNotifications: async () => {
    try {
      const response = await http.get<Notification[]>("/notifications");
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  },

  markNotificationAsRead: async (notificationId: number) => {
    try {
      await http.post(`/notification/${notificationId}/read`);
      return true;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      return false;
    }
  },

  getPublications: async (city?: string) => {
    try {
      const url = city
        ? `/posts/city?city=${encodeURIComponent(city)}`
        : "/posts/city";
      const response = await http.get(url);
      return response.data;
    } catch (e) {
      console.log("Erro ao buscar publicações", e);
    }
  },

  getUsers: async (city?: string) => {
    try {
      const user = secureLocalStorage.get("user");
      const userCity = user ? JSON.parse(user).city : null;
      const url = city
        ? `/Users/?city=${encodeURIComponent(city)}`
        : `Users/?city=${encodeURIComponent(userCity)}`;
      const response = await http.get(url);
      return response.data;
    } catch (error) {
      console.log("Erro ao buscar usuários", error);
    }
  },
  sendDescription: async (description: string) => {
    try {
      const response = await http.post("/description", { description });
      return response.data;
    } catch (error) {
      throw new Error();
    }
  },
  // getTarefas: async () => {
  //   try {
  //     const response = await tarefa.get("tarefas");
  //     return response.data;
  //   }
  //   catch (error) {
  //     console.log("Erro ao buscar tarefas " + error);
  //   }
  // }
};
