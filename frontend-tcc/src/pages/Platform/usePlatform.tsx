/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext } from "react";
import { PublicationType } from "../../components/partials/Publication";
import { useLoaderData } from "react-router-dom";
import { Comments } from "../../types/publications/Comments";
import { SubmitHandler } from "react-hook-form";
import api from "../../service/api";

type Props = {
    publications: PublicationType[];
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
    },
    {
        id: 2,
        post_id: 1,
        created_at: "2021-10-10",
        updated_at: "2021-10-10",
        user_id: 1,
        author_photo: "/garotos.jpg",
        author_name: "Leonardo Fontes",
        content:
            "This is a comment This is a test This This is a test This This is a test This This is a test This This is a test This This is a test This",
    },
    {
        id: 3,
        post_id: 1,
        created_at: "2021-10-10",
        updated_at: "2021-10-10",
        user_id: 1,
        author_photo: "/garotos.jpg",
        author_name: "Alisson de Sousa",
        content: "This is a test This is a test This is a test This is a test",
    },
];

export const pub: PublicationType = {
    post_id: 1,
    author_city: "Cubatao",
    author_name: "Leonardo Fontes",
    author_photo: "/garotos.jpg",
    post_caption: "This is a post caption",
    post_image: "/garotos.jpg",
    comments,
};

export const PlatformProvider = ({ children }: PropsWithChildren) => {
    const data = useLoaderData() as PublicationType[];
    const handleComment: SubmitHandler<Comments> = async ({
        content,
        post_id,
    }) => {
        try {
            await api.createComment(content, post_id);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <PlatformContext.Provider
            value={{ publications: data || [], handleComment }}
        >
            {children}
        </PlatformContext.Provider>
    );
};
export const usePlatform = () => useContext(PlatformContext);
