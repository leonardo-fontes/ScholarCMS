import Input from "../../inputs/Input";
import Button from "../../inputs/Button";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { Comments } from "../../../types/publications/Comments";
import { usePlatform } from "../../../pages/Platform/usePlatform";

export interface PublicationType {
    comments: Comments[];
    post_caption: string;
    post_image: string;
    author_photo: string;
    author_name: string;
    author_city: string;
    post_id: number;
}

export default function Publication({
    author_city,
    author_name,
    author_photo,
    comments,
    post_caption,
    post_image,
    post_id,
}: PublicationType) {
    const { handleComment } = usePlatform();
    const { register, handleSubmit } = useForm<Comments>({
        defaultValues: { post_id },
    });

    const { user } = useAuth();

    return (
        <div className="flex flex-col w-full mt-20">
            <div className="flex gap-6 items-center">
                <img
                    className="rounded-full aspect-square object-cover w-12 md:w-16 mb-2 cursor-pointer"
                    src={author_photo || ""}
                    alt=""
                />
                <div>
                    <p>{author_name}</p>
                    <span className="text-gray text-sm">{author_city}</span>
                </div>
            </div>
            <div className="w-full">
                <p className="text-sm my-3">{post_caption || ""}</p>
                <div className="relative min-w-full border-2 border-lightGray">
                    <img
                        className="w-full aspect-square object-cover"
                        src={post_image}
                        alt="foto do usuário"
                    />
                    <Button
                        children="DOAR"
                        classname="absolute bottom-8 right-8 text-lg md:text-xl text-white bg-primary px-6 md:px-8 py-1 md:py-2 font-extrabold"
                    />
                </div>
            </div>
            <div className="w-full bg-lightGray flex flex-col">
                <span className="text-gray text-sm text-end pr-4 py-1 border-b-[1px] border-[#e9e9e9]">
                    Comentários
                </span>
                {comments.map((comment) => (
                    <div className="flex flex-col border-b-[2px] px-4 py-2 gap-1 border-[#e9e9e9]">
                        <div className="flex items-center gap-3">
                            <img
                                className="rounded-full aspect-square object-cover w-12 md:w-10 cursor-pointer"
                                src={comment.author_photo}
                                alt=""
                            />
                            <p className="text-md text-primary">
                                {comment.author_name}
                            </p>
                        </div>

                        <span className="text-sm">{comment.content}</span>
                    </div>
                ))}
                <form
                    onSubmit={handleSubmit(handleComment)}
                    className="flex w-full gap-2 items-center py-2 px-4"
                >
                    <div className="flex">
                        <img
                            className="rounded-full mr-4 aspect-square object-cover w-16 cursor-pointer"
                            src={user?.profile_picture_url || "/garotos.jpg"}
                            alt="Imagem do usuario"
                        />
                        <Input
                            className="py-0 min-w-96"
                            placeholder="Digite seu comentário..."
                            name="content"
                            register={register}
                        />
                    </div>
                    <Button
                        type="submit"
                        classname="w-20 py-3 bg-white border-[1px]  border-primary text-primary"
                        children="Enviar"
                    />
                </form>
            </div>
        </div>
    );
}
