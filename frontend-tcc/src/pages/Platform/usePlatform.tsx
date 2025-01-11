/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { Comments } from "../../types/publications/Comments";
import { SubmitHandler } from "react-hook-form";
import api from "../../service/api";
import { PublicationType } from "../../types/publications";
import { Post } from "../../types/publications/Post";
import Loading from "../../components/layout/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../types/User";

type Props = {
  publications: PublicationType[];
  setPublications: React.Dispatch<React.SetStateAction<PublicationType[]>>;
  handleComment: SubmitHandler<Comments>;
  handleDeleteComment: (commentId: number, postId: number) => void;
  fetchPublications: () => Promise<void>
};

const PlatformContext = createContext({} as Props);

export const pubs = [];
interface PlatformProviderProps extends PropsWithChildren {
  userId?: string;
  isExternalProfile?: boolean;
}

export const PlatformProvider = ({
  children,
  userId,
}: PlatformProviderProps) => {
  const [publications, setPublications] = useState<PublicationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { user } = useAuth() as { user: User };

  const fetchPublications = async () => {
    try {
      setIsLoading(true);
      let response;

      if (userId) {
        response = await api.getPostByUserId(userId);
      } else {
        response = await api.getPublications(user.city);
      }

      const limitedResponse = response.slice(0, 10);
      const formattedPublications = limitedResponse.map((post: Post) => ({
        post: {
          id: post.id,
          user_id: post.user_id,
          author_name: post.author_name,
          author_photo: post.user_picture,
          user_city: post.user_city,
          description: post.description,
          photos: post.photos,
          created_at: post.created_at,
          updated_at: post.updated_at,
          comments: post.comments,
          user_picture: post.user_picture,
        },
        comments: post.comments,
      }));

      setPublications(formattedPublications);
    } catch (error) {
      console.error("Error fetching publications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, [location.pathname]);


  const handleComment: SubmitHandler<Comments> = async ({
    content,
    post_id,
  }) => {
    try {
      const payload = { content };

      const resp = await api.createComment(payload, post_id);
      if (resp === 201 || resp === 200) {
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
      }
      else {
        toast.error("Ocorreu um erro ao inserir o comentário");
      }
      setIsLoading(false)
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleDeleteComment = async (commentId: number, postId: number) => {
    if (window.confirm("Deseja realmente excluir este comentário?")) {
      try {
        setPublications((prevPublications) =>
          prevPublications.map((publication) =>
            publication.post.id === postId
              ? {
                ...publication,
                comments: publication.comments.filter(
                  (comment) => comment.id !== commentId
                ),
              }
              : publication
          )
        );
        await api.deleteComment(commentId);
        const updatedPublication = await api.getPostbyId(postId);

        if (updatedPublication) {
          setPublications((prevPublications) =>
            prevPublications.map((publication) =>
              publication.post.id === postId
                ? { ...publication, comments: updatedPublication.comments }
                : publication
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return <Loading size={60} />;
  }

  return (
    <PlatformContext.Provider
      value={{
        publications,
        setPublications,
        handleComment,
        handleDeleteComment,
        fetchPublications
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};
export const usePlatform = () => useContext(PlatformContext);
