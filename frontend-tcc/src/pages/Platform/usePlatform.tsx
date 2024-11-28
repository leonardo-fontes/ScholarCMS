/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";
import { Comments } from "../../types/publications/Comments";
import { SubmitHandler } from "react-hook-form";
import api from "../../service/api";
import { PublicationType } from "../../types/publications";
import { Post } from "../../types/publications/Post";
import Loading from "../../components/layout/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  publications: PublicationType[];
  setPublications: React.Dispatch<React.SetStateAction<PublicationType[]>>;
  handleComment: SubmitHandler<Comments>;
};

const PlatformContext = createContext({} as Props);

const comments: Comments[] = [
  {
    id: 1,
    post_id: 1,
    created_at: "2021-10-10",
    updated_at: "2021-10-10",
    user_id: 1,
    author_photo: "/garotos.jpg",
    author_name: "Leonardo Lucas Fontes",
    content: "This is a comment",
    user_picture: "/mulher_2.jpg"
  },
  {
    id: 2,
    post_id: 1,
    created_at: "2021-10-10",
    updated_at: "2021-10-10",
    user_id: 2,
    author_photo: "/garotos.jpg",
    author_name: "Leonardo Fontes",
    content:
      "This is a comment This is a test This This is a test This This is a test This This is a test This This is a test This This is a test This",
    user_picture: "/mulher_2.jpg"
  },
  {
    id: 3,
    post_id: 1,
    created_at: "2021-10-10",
    updated_at: "2021-10-10",
    user_id: 3,
    author_photo: "/garotos.jpg",
    author_name: "Alisson de Sousa",
    content: "This is a test This is a test This is a test This is a test",
    user_picture: "/mulher_2.jpg"
  },
];

export const pubs: PublicationType[] = [{
  post: {
    description: `Caros amigos e seguidores,
Estamos em uma missão importante e precisamos da sua ajuda! Estamos arrecadando doações para crianças carentes, um projeto que visa doar cestas básicas para famílias carentes. Cada contribuição, por menor que seja, fará uma grande diferença.`,
    author_city: "São Paulo",
    author_name: "Leonardo Lucas Fontes",
    author_photo: "/garotos.jpg",
    created_at: "2021-10-10",
    id: 1,
    photos: ["/cestaBasica.jpg"],
    updated_at: "2021-10-10",
    user_id: 1,
  },
  comments,

}];

export const PlatformProvider = ({ children }: PropsWithChildren) => {
  const [publications, setPublications] = useState<PublicationType[]>([]);
  const [userPicture, setUserPicture] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect no usePlatform executado");
    const fetchPublications = async () => {
      try {
        const response = await api.getPublications();
        console.log('oi')
        const limitedResponse = response.slice(0, 10); //Pega as dez primeiras requisições
        const formattedPublications: PublicationType[] = limitedResponse.map((post: Post) => ({
          post: {
            id: post.id,
            user_id: post.user_id,
            author_name: post.author_name,
            author_photo: post.user_picture,
            description: post.description,
            photos: post.photos,
            created_at: post.created_at,
            updated_at: post.updated_at,
            author_city: "",
            comments: post.comments,
            user_picture: post.user_picture
          },
          comments: post.comments
        }));
        const combinedPublications = [...pubs, ...formattedPublications]; // Combine as publicações mockadas com as publicações da API
        setPublications(combinedPublications);
        setUserPicture(combinedPublications[0]?.post?.user_picture);
        setIsLoading(false);
      }
      catch (error) {
        console.log('Erro ao buscar publicações ' + error);
      };
    };
    fetchPublications();
  }, [])

  const handleComment: SubmitHandler<Comments> = async ({
    content,
    post_id,
  }) => {
    try {
      const payload = { content };
      const response = await api.createComment(payload, post_id);
      toast.success("comentário criado com sucesso");

      const updatedPublication = await api.getPostbyId(post_id);
      if (updatedPublication) {
        setPublications((prevPublications) =>
          prevPublications.map((publication) =>
            publication.post.id === post_id
              ? { ...publication, comments: updatedPublication.comments }
              : publication
          )
        );
      }
      setIsLoading(false)
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <> <Loading size={60} /> </>
  }

  return (
    <PlatformContext.Provider
      value={{ publications, setPublications, handleComment }}
    >
      {children}
    </PlatformContext.Provider>
  );
};
export const usePlatform = () => useContext(PlatformContext);
