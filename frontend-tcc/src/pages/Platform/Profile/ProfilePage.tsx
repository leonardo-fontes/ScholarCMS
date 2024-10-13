import { useState } from "react";
import Payment from "../../../components/modals/Payment";
import { useAuth } from "../../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";
import Icon from "../../../components/icons";
import Button from "../../../components/inputs/Button";
import Publication from "../../../components/partials/Publication";
import { PublicationType } from "../../../types/publications";
import { Comments } from "../../../types/publications/Comments";
import { Role } from "../../../types/User";


export default function ProfilePage() {
    const { id } = useLoaderData() as any;
    const [isModalOpen, setIsModalOpen] = useState()
    const { user } = useAuth()
    const isExternalProfile = id === user?.id ? false : true
    const comments: Comments[] = [
        {
            id: 1,
            post_id: 1,
            created_at: "2021-10-10",
            updated_at: "2021-10-10",
            user_id: 1,
            author_photo: "/homem_2.jpg",
            author_name: "Leonardo Lucas Fontes",
            content: "This is a comment",
        }]

    const publication: PublicationType = {
        post: {
            description: "This is a test",
            author_city: "Cubatão",
            author_name: "Test Woman",
            author_photo: "/mulher_2.jpg",
            created_at: "2021-10-10",
            id: 1,
            photos: ["/garotos.jpg"],
            updated_at: "2021-10-10",
            user_id: 1,
        },
        comments,
    }


    return (
        <div className="flex flex-col w-full items-center">
            <section className="flex max-w-[560px] w-full mb-4 gap-12 mt-20 items-center justify-between relative">
                <div className="flex items-center gap-4">
                    <img
                        className="rounded-full aspect-square object-cover w-12 md:w-24 mb-2"
                        src={user?.profile_picture_url || "/mulher_2.jpg"}
                        alt="Author"
                    />

                    <div>
                        <p className="text-primary text-xl">{user?.name} {user?.surname} Test Woman</p>
                        <span className="text-gray text-lg">
                            {user?.city || 'Cubatão'}
                        </span>
                    </div>
                </div>

                {isExternalProfile && //adicionar ! (negação) na validação
                    <div className="flex flex-col items-center justify-center gap-4 mt-4">
                        <Button classname="bg-primaryLight" children={<div className="flex gap-2 items-center justify-center w-52 p-2 text-primary rounded-md">
                            <span>Trocar foto do perfil</span>
                            <Icon name="addItem" size={24} color="#5030E5"></Icon>
                        </div>} />
                        <Button classname="bg-primaryLight" children={<div className="flex gap-2 items-center justify-center w-52 p-2 text-primary rounded-md">
                            <span>Editar informações</span>
                            <Icon name="addItem" size={24} color="#5030E5"></Icon>
                        </div>} />
                    </div>
                }
            </section>
            <p className="bg-white rounded-md p-4 max-w-[560px] border-[1px] border-primary ">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam accusantium harum minus, accusamus optio esse vel minima cumque et dolores commodi debitis explicabo, hic non qui cupiditate. Quibusdam, optio maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla exercitationem minus nostrum quam. Eveniet explicabo possimus facere quos eos quo delectus quam, id obcaecati repellendus voluptates excepturi totam praesentium? Mollitia?
            </p>
            {publication && //retirar ! (negação) na validação 
                <div className="border-t-[1px] border-primaryLight mt-20">

                    <Publication {...publication} />
                </div>}
            {//!publication && user?.role_id === parseInt(Role.Beneficiario) && (descomentar, logica certa)
                <div className="max-w-[560px] mt-20 pt-20 border-t-[1px] border-primaryLight">
                    <div className="flex flex-col items-center justify-center bg-primaryLight text-primary text-xl rounded-md p-4 text-center">

                        <p>VOCÊ AINDA NÃO PUBLICOU NADA, CRIE SUA PRIMEIRA PUBLICAÇÃO PARA RECEBER DOAÇÕES</p>
                        <Button classname="my-12 text-lg md:text-2xl font-semibold md:font-bold text-primary bg-white hover:text-white hover:bg-primary w-[380px] md:py-2" href="create-pub"  children={'CRIAR PUBLICAÇÃO'} />
                    </div>
                </div>}


            <Button classname="my-12 text-lg md:text-2xl font-semibold md:font-bold text-white bg-primary hover:text-primary hover:bg-white w-[560px] md:py-2" href="/" children={'VOLTAR PARA A PÁGINA INICIAL'} />



            {isModalOpen && <Payment username="teste" />}
        </div>
    )
}
