import React from "react";
import Input from "../../../inputs/Input";
import Button from "../../../inputs/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

export default function Comments() {
    type Comments = {
        comment: string;
    };

    const [searchParams] = useSearchParams();
    const {
        register,
        handleSubmit,

        // formState: { errors },
    } = useForm<Comments>({
        defaultValues: { comment: searchParams.get("comment") ?? "" },
    });

    // const comment = watch("comment");
    const handleComment: SubmitHandler<Comments> = async (data) => {
        // try {
        //     await api.createComment(data);
        //     setMessage("success");
        // } catch (err) {
        //     console.log(err);
        //     setMessage("error");
        // }
        // setTimeout(() => {
        //     setMessage(null);
        // }, 3000);
    };

    return (
        <div className="w-full bg-lightGray flex flex-col">
            <span className="text-gray text-sm text-end pr-4 py-1 border-b-[1px] border-[#e9e9e9]">
                Comentários
            </span>
            <div className="flex flex-col border-b-[2px] px-4 py-2 gap-1 border-[#e9e9e9]">
                <div className="flex items-center gap-3">
                    <img
                        className="rounded-full aspect-square object-cover w-12 md:w-10 cursor-pointer"
                        src="/garoto.jpg"
                        alt=""
                    />
                    <p className="text-md text-primary">Nome do cara</p>
                </div>

                <span className="text-sm">
                    comentario de uma pessoa aleatoria comentario de uma pessoa
                    al
                </span>
            </div>
            <div className="flex w-full justify-between items-center py-2 px-4">
                <div className="flex">
                    <img
                        className="rounded-full mr-4 aspect-square object-cover w-12 cursor-pointer"
                        src="/garoto.jpg"
                        alt=""
                    />
                    <Input
                        className="py-0 h-9 min-w-72"
                        placeholder="Digite seu comentário..."
                        name="comment"
                        register={register}
                    />
                </div>
                <Button
                    type="submit"
                    onSubmit={handleSubmit(handleComment)}
                    classname="w-20 py-1 bg-white border-[1px] mt-[6px] border-primary text-primary"
                    children="Enviar"
                />
            </div>
        </div>
    );
}
