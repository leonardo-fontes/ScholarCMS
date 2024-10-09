import Input from "../../inputs/Input";
import Button from "../../inputs/Button";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { Comments } from "../../../types/publications/Comments";
import { usePlatform } from "../../../pages/Platform/usePlatform";
import { PublicationType } from "../../../types/publications";
import { Link } from "react-router-dom";

export default function Publication({ post, comments }: PublicationType) {
    const { handleComment } = usePlatform();
    const { register, handleSubmit } = useForm<Comments>({
        defaultValues: { post_id: post.id },
    });

    const { user } = useAuth();

    return (
        <div className="flex flex-col w-full max-w-[680px] mt-20">
            <div className="flex gap-6 items-center">
                <Link to={`/profile/${post.user_id}`}>
                    <img
                        className="rounded-full aspect-square object-cover w-12 md:w-16 mb-2 cursor-pointer"
                        src={post.author_photo || ""}
                        alt="Author"
                    />
                </Link>
                <div>
                    <p className="text-primary">{post.author_name}</p>
                    <span className="text-gray text-sm">
                        {post.author_city}
                    </span>
                </div>
            </div>
            <div className="w-full">
                <p className="text-sm my-3">{post.description || ""}</p>
                <div className="relative min-w-full border-2 border-lightGray">
                    <img
                        className="w-full aspect-square object-cover"
                        src={post.photos?.[0] || ""}
                        alt="foto do usuário"
                    />
                    <Button
                        isLink
                        link={`/profile/${post.user_id}`}
                        children="DOAR"
                        classname="absolute bottom-8 right-8 text-lg md:text-2xl text-white bg-primary px-6 md:px-12 py-1 md:py-2 font-extrabold"
                    />
                </div>
            </div>
            <div className="w-full bg-lightGray flex flex-col">
                <span className="text-gray text-sm text-end pr-4 py-1 border-b-[1px] border-[#e9e9e9]">
                    Comentários
                </span>
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="flex flex-col border-b-[2px] px-4 py-2 gap-1 border-[#e9e9e9]"
                    >
                        <div className="flex items-center gap-3">
                            <Link to={`/profile/${comment.user_id}`}>
                                <img
                                    className="rounded-full aspect-square object-cover w-12 md:w-10 cursor-pointer"
                                    src={comment.author_photo}
                                    alt=""
                                />
                            </Link>

                            <p className="text-md text-primary">
                                {comment.author_name}
                            </p>
                        </div>

                        <span className="text-sm">{comment.content}</span>
                    </div>
                ))}
                <form
                    onSubmit={handleSubmit(handleComment)}
                    className="flex w-full items-center justify-between py-2 px-4"
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
