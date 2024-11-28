import { useEffect, useState } from "react";
import Payment from "../../../components/modals/Payment";
import { useAuth } from "../../../hooks/useAuth";
import { useLoaderData, useSearchParams } from "react-router-dom";
import Icon from "../../../components/icons";
import Button from "../../../components/inputs/Button";
import Publication from "../../../components/partials/Publication";
import { PublicationType } from "../../../types/publications";
import { Role } from "../../../types/User";
import ProfilePicForm from "../../../components/modals/ProfilePicForm";
import api from "../../../service/api";
import Loading from "../../../components/layout/Loading";
import { User } from "../../../types/User";

export default function ProfilePage() {
  const { id } = useLoaderData() as { id: string };
  const [searchParams] = useSearchParams();
  const publicationId = searchParams.get("publicationId");
  const { user } = useAuth();
  //const { userId } = useParams<{ userId: string }>();
  //const [isModalOpen, setIsModalOpen] = useState()
  //const { publications, setPublications } = usePlatform();
  const [isLoading, setIsLoading] = useState(false);
  const [userPicture, setUserPicture] = useState<string | null>(null);
  const [userExternal, setUserExternal] = useState<User>();
  const [publication, setPublication] = useState<PublicationType | null>(null);
  const [isProfilePicFormOpen, setIsProfilePicFormOpen] = useState(false); //Estado para controlar o modal ProfilePicForm
  const isExternalProfile =
    user && id !== undefined ? parseInt(id) !== parseInt(user.id) : true;

  const getProfileExternal = async (id: string) => {
    const profileExternal = await api.profile(id);
    console.log(profileExternal);
    console.log("publicationID" + publicationId);
    profileExternal && setUserExternal(profileExternal);
    return profileExternal;
  };

  const fetchPublicationsByUser = async () => {
    try {
      setIsLoading(true);
      const response = await api.getPostByUser();
      const lastPublication = response[0];
      if (response && response.length > 0) {
        const formattedPublication: PublicationType = {
          post: {
            id: lastPublication.id,
            user_id: lastPublication.user_id,
            author_name: lastPublication.author_name,
            author_photo: lastPublication.user_picture,
            description: lastPublication.description,
            photos: lastPublication.photos,
            created_at: lastPublication.created_at,
            updated_at: lastPublication.updated_at,
            author_city: lastPublication.author_city,
            user_picture: lastPublication.user_picture,
          },
          comments: lastPublication.comments || [],
        };
        setPublication(formattedPublication);
        console.log("Publicação formatada by user:", formattedPublication);
        setIsLoading(false);
      }
    } catch (e) {
      console.error("Erro ao buscar publicação do próprio usuário " + e);
    }
  };

  const fetchPublication = async (publicationId: string) => {
    try {
      setIsLoading(true);
      console.log("OOi");
      const response = await api.getPostbyId(publicationId);
      console.log("Resposta da api " + response);
      if (response) {
        const formattedPublication: PublicationType = {
          post: {
            id: response.id,
            user_id: response.user_id,
            author_name: response.author_name,
            author_photo: response.user_picture,
            description: response.description,
            photos: response.photos,
            created_at: response.created_at,
            updated_at: response.updated_at,
            author_city: response.author_city,
            user_picture: response.user_picture,
          },
          comments: response.comments || [],
        };
        setPublication(formattedPublication); // Atualize o estado com um único objeto
        console.log("Publicação formatada:", formattedPublication);
        setIsLoading(false);
        console.log("Cheguei aqui");
      }
    } catch (error) {
      console.error("Erro ao buscar a publicação", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isExternalProfile && id) getProfileExternal(id);
    console.log("publicationId" + publicationId);
    publicationId
      ? fetchPublication(publicationId)
      : console.log("Aqui é falso");
  }, [isExternalProfile, id, publicationId]);

  useEffect(() => {
    if (!isExternalProfile) {
      fetchPublicationsByUser();
      console.log("chegou aqui!");
    }
  }, []);

  // useEffect(() => {
  // 	if (publicationId) {
  // 		fetchPublication(publicationId);
  // 	}
  // }, [publicationId]);

  useEffect(() => {
    const fetchUserPicture = async () => {
      if (user?.user_picture) {
        const pictureUrl = await api.getPicture(user.user_picture);
        setUserPicture(pictureUrl); // Define a URL da imagem
        setIsLoading(false);
      }
    };
    fetchUserPicture();
  }, [user?.user_picture]);
  // const comments: Comments[] = [
  // 	{
  // 		id: 1,
  // 		post_id: 1,
  // 		created_at: "2021-10-10",
  // 		updated_at: "2021-10-10",
  // 		user_id: 1,
  // 		author_photo: "/homem_2.jpg",
  // 		author_name: "Lívia de Almeida",
  // 		content: "Gostaria de ajudar, como eu faço?",
  // 		user_picture: "/homem_2.jpg"
  // 	}]

  // const publication: PublicationType = {
  // 	post: {
  // 		description: `Caros amigos e seguidores,
  // 		Estamos em uma missão importante e precisamos da sua ajuda! Estamos arrecadando doações para crianças carentes, um projeto que visa doar cestas básicas para famílias carentes. Cada contribuição, por menor que seja, fará uma grande diferença.`,
  // 		author_city: "Cubatão",
  // 		author_name: "Wallace da Silva Santos",
  // 		author_photo: "/mulher_2.jpg",
  // 		created_at: "2021-10-10",
  // 		id: 1,
  // 		photos: ["/cestaBasica.jpg"],
  // 		updated_at: "2021-10-10",
  // 		user_id: 1,
  // 		user_picture: "ad671f82-5b45-4f1b-a93d-2f78ada2548f-narutinhoTeste.jpeg"
  // 	},
  // 	comments,
  // }

  const openProfilePicForm = () => setIsProfilePicFormOpen(true);
  const closeProfilePicForm = () => {
    setIsProfilePicFormOpen(false);
  };

  const handleUpdatePicture = (newPictureUrl: string) => {
    setUserPicture(newPictureUrl);
    closeProfilePicForm();
  };
  if (isLoading) {
    return (
      <>
        {" "}
        <Loading size={60} />{" "}
      </>
    );
  }

  return (
    <div
      className={`flex flex-col w-full items-center ${
        isExternalProfile ? "backdrop-blur-sm" : ""
      }`}
    >
      <div className="flex">
        <section className="w-full">
          <section className="flex max-w-[560px] w-full mb-4 gap-12 mt-20 items-center justify-between relative">
            {isExternalProfile ? (
              // Exibe o componente Payment se for um perfil externo
              <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
                <Payment
                  username={userExternal && userExternal?.name}
                  className="relative z-50 p-8 bg-white rounded-lg shadow-lg"
                />
              </div>
            ) : (
              // Exibe as informações do usuário se for o próprio perfil
              <div className="flex items-center gap-4">
                <img
                  className="rounded-full aspect-square object-cover w-12 md:w-24 mb-2"
                  src={userPicture ? userPicture : ""}
                  alt="Author"
                />
                <div>
                  <p className="text-primary text-xl">
                    {user?.name} {user?.surname}
                  </p>
                  <span className="text-gray text-lg">
                    {user?.city || "Cubatão"}
                  </span>
                </div>
              </div>
            )}
            {!isExternalProfile && ( //adicionar ! (negação) na validação
              <div className="flex flex-col items-center justify-center gap-4 mt-4">
                <Button
                  classname="bg-primaryLight"
                  children={
                    <div
                      className="flex gap-2 items-center justify-center w-52 p-2 text-primary rounded-md"
                      onClick={openProfilePicForm}
                    >
                      <span>Trocar foto do perfil</span>
                      <Icon name="addItem" size={24} color="#5030E5"></Icon>
                    </div>
                  }
                />
                <Button
                  classname="bg-primaryLight"
                  children={
                    <div className="flex gap-2 items-center justify-center w-52 p-2 text-primary rounded-md">
                      <span>Editar informações</span>
                      <Icon name="addItem" size={24} color="#5030E5"></Icon>
                    </div>
                  }
                />
              </div>
            )}
          </section>
          {!isExternalProfile && (
            <p className="bg-white rounded-md p-4 max-w-[560px] border-[1px] border-primary ">
              Sou o Vinnicius, um entusiasta da tecnologia e inovação,
              atualmente cursando Análise e Desenvolvimento de Sistemas. Morando
              em Cubatão, me dedico a aprender e aplicar meus conhecimentos para
              criar soluções que possam beneficiar a comunidade. Estou sempre em
              busca de novos desafios e oportunidades para contribuir com causas
              importantes.{" "}
            </p>
          )}
        </section>
        <div className="flex justify-center gap-10 fixed right-7">
          {isProfilePicFormOpen && (
            <ProfilePicForm
              onClose={closeProfilePicForm}
              onUpdatePicture={handleUpdatePicture}
            />
          )}
        </div>
      </div>
      {publication ? (
        <div className="border-t-[1px] border-primaryLight mt-20">
          <Publication {...publication} />
        </div>
      ) : null}
      {!publication &&
        user?.role_id === parseInt(Role.Beneficiario) &&
        publication == 0 && (
          <div className="max-w-[560px] mt-20 pt-20 border-t-[1px] border-primaryLight">
            <div className="flex flex-col items-center justify-center bg-primaryLight text-primary text-xl rounded-md p-4 text-center">
              <p>
                VOCÊ AINDA NÃO PUBLICOU NADA, CRIE SUA PRIMEIRA PUBLICAÇÃO PARA
                RECEBER DOAÇÕES
              </p>
              <Button
                classname="my-12 text-lg md:text-2xl font-semibold md:font-bold text-primary bg-white hover:text-white hover:bg-primary w-[380px] md:py-2"
                href="/platform/create-pub"
                children={"CRIAR PUBLICAÇÃO"}
              />
            </div>
          </div>
        )}

      <Button
        classname="my-12 text-lg md:text-2xl font-semibold md:font-bold text-white bg-primary hover:text-primary hover:bg-white w-[500px] md:py-2"
        href="/"
        children={"VOLTAR PARA A PÁGINA INICIAL"}
      />
    </div>
  );
}
