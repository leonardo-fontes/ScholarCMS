import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";
import Icon from "../../../components/icons";
import Button from "../../../components/inputs/Button";
import Publication from "../../../components/partials/Publication";
import { Role } from "../../../types/User";
import ProfilePicForm from "../../../components/modals/ProfilePicForm";
import api from "../../../service/api";
import Loading from "../../../components/layout/Loading";
import { PlatformProvider, usePlatform } from "../usePlatform";
import Description from "../../../components/modals/Description";
import NoProfilePicture from "../../../components/icons/source/NoProfilePicture";
import { toast } from "react-toastify";

interface ProfileData {
  name: string;
  surname: string;
  description?: string;
  user_picture?: string;
  city?: string;
  role_id: number;
  id: string;
}

export default function ProfilePage() {
  const { id } = useLoaderData() as { id: string };
  const { user } = useAuth();
  const isExternalProfile = user && id && id !== user.id.toString();

  return (
    <PlatformProvider userId={id}>
      <ProfilePageContent
        userId={id}
        isExternalProfile={Boolean(isExternalProfile)}
      />
    </PlatformProvider>
  );
}

function ProfilePageContent({
  userId,
  isExternalProfile,
}: {
  userId?: string;
  isExternalProfile?: boolean;
}) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isProfilePicFormOpen, setIsProfilePicFormOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const { publications, fetchPublications } = usePlatform();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [refresh, setRefresh] = useState(false);
  // const [firstPublication, setFirstPublication] = useState<PublicationType | null>(null);


  useEffect(() => {
    const getProfileExternal = async (
      isExternalProfile: boolean,
      id: string
    ) => {
      setIsLoading(true);
      if (isExternalProfile) {
        const profileExternal = await api.profile(id);
        const pictureUrl = profileExternal?.user_picture
          ? api.getPicture(profileExternal.user_picture)
          : "";

        setProfileData({
          city: profileExternal!.city,
          name: profileExternal!.name,
          description: profileExternal!.description,
          surname: profileExternal!.surname,
          role_id: profileExternal!.role_id,
          id: profileExternal!.id,
          user_picture: pictureUrl,
        });
      } else {
        const pictureUrl = user?.user_picture
          ? api.getPicture(user.user_picture)
          : "";
        setProfileData({
          city: user!.city,
          name: user!.name,
          description: user!.description,
          surname: user!.surname,
          role_id: user!.role_id,
          id: user!.id,
          user_picture: pictureUrl,
        });
      }
      setIsLoading(false);
    };

    getProfileExternal(Boolean(isExternalProfile), userId!);
  }, [isExternalProfile, user, userId]);

  useEffect(() => {
    if (refresh == true) fetchPublications();
    setRefresh(false)
  }, [refresh]);


  // Feature descontinuada
  // useEffect(() => {
  //   if (publications.length > 0) {
  //     publications && setFirstPublication(publications[0])
  //     console.log("First publication set: ", publications[0]);
  //   };
  // }, [publications]);


  const openProfilePicForm = () => setIsProfilePicFormOpen(true);

  const closeProfilePicForm = () => {
    setIsProfilePicFormOpen(false);
  };

  const handleUpdatePicture = (newPictureUrl: string) => {
    setProfileData((prevData) =>
      prevData ? { ...prevData, user_picture: newPictureUrl } : null
    );
    setRefresh((prev) => !prev);
    closeProfilePicForm();
  };

  const openDescriptionModal = () => setIsDescriptionModalOpen(true);

  const closeDescriptionModal = () => setIsDescriptionModalOpen(false);

  const handleAddDescription = () => {
    openDescriptionModal();
  };

  const handleSaveDescription = async (newDescription: string) => {
    try {
      const response = await api.sendDescription(newDescription)
      setProfileData((prevData) =>
        prevData ? { ...prevData, description: newDescription } : null
      );
      toast.success("Descrição atualizada com sucesso")
      console.log(response)
    }
    catch (error) {
      toast.error("Erro ao atualizar a descrição")
    }
  };

  if (isLoading) {
    return <Loading size={60} />;
  }

  // useEffect(() => {
  //   console.log("isExternaProfile " + isExternalProfile);
  //   console.log("userRoleId " + user?.role_id);
  //   console.log("First publication: ", firstPublication);
  //   console.log("Publications length: ", publications.length);
  //   console.log("usefallback " + useFallBack)
  // }, [isExternalProfile, user?.role_id, firstPublication, publications.length]);

  return (
    <div className={`flex flex-col w-full items-center`}>
      <div className="flex">
        <section className="w-full">
          <section className="md:flex w-full mb-4 mt-20 items-center justify-between relative border-r border-l border-primaryLight">
            <div
              className={`${isExternalProfile
                ? "mx-12 px-12 flex justify-start items-center gap-4"
                : "mx-2 flex items-center gap-4"
                }`}
            >
              {profileData?.user_picture ? (
                <img
                  className="rounded-full aspect-square object-cover w-12 md:w-24 mb-2"
                  src={profileData.user_picture}
                  alt="Author"
                />
              ) : (
                <NoProfilePicture className="rounded-full aspect-square object-cover w-12 md:w-24 mb-2" />
              )}
              <div>
                <p className="text-primary text-xl">
                  {profileData?.name} {profileData?.surname}
                </p>
                <span className="text-gray text-lg">{profileData?.city}</span>
              </div>
            </div>
            {!isExternalProfile && (
              <div className="flex flex-col w-full md:w-auto gap-3 mt-4 px-6 mx-4 md:px-0">
                <Button
                  classname="bg-primaryLight w-full md:w-auto"
                  onClick={openProfilePicForm}
                >
                  <div className="flex items-center justify-center gap-2 w-full md:w-52 py-2 px-3 md:px-4 text-primary rounded-md">
                    <span className="text-sm md:text-base whitespace-nowrap">
                      Trocar foto do perfil
                    </span>
                    <Icon name="addItem" size={16} color="#5030E5" />
                  </div>
                </Button>

                <Button
                  classname="bg-primaryLight w-full md:w-auto"
                  onClick={handleAddDescription}
                >
                  <div className="flex items-center justify-center gap-2 w-full md:w-52 py-2 px-3 md:px-4 text-primary rounded-md">
                    <span className="text-sm md:text-base whitespace-nowrap">
                      Editar informações
                    </span>
                    <Icon name="addItem" size={16} color="#5030E5" />
                  </div>
                </Button>

                {user?.role_id === parseInt(Role.Beneficiario) && (
                  <Button
                    classname="bg-primaryLight w-full md:w-auto"
                    href="/platform/create-pub"
                  >
                    <div className="flex items-center justify-center gap-2 w-full md:w-52 py-2 px-3 md:px-4 text-primary rounded-md">
                      <span className="text-sm md:text-base whitespace-nowrap">
                        Criar nova publicação
                      </span>
                      <Icon name="addItem" size={16} color="#5030E5" />
                    </div>
                  </Button>
                )}
              </div>
            )}
          </section>
          {profileData?.description && (
            <p className="bg-white rounded-md p-4 max-w-[620px] mt-4 block w-full border border-purple-200 shadow-sm">
              {profileData?.description}
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

          {isDescriptionModalOpen && (
            <Description
              onClose={closeDescriptionModal}
              description={
                profileData?.description ? profileData.description : ""
              }
              onSave={handleSaveDescription}
            />
          )}
        </div>
      </div>

      {publications.length > 0 ? (
        <div className="w-full align-middle max-w-[560px]">
          {publications.map((publication) => (
            <div
              key={publication.post.id}
              className="border-t-[1px] border-primaryLight mt-8"
            >
              <Publication {...publication} />
            </div>
          ))}
        </div>
      ) : (
        !isExternalProfile &&
        user?.role_id === parseInt(Role.Beneficiario) && (
          <div className="max-w-[560px] mt-20 pt-20 border-t-[1px] border-primaryLight mb-8">
            <div className="flex flex-col items-center justify-center bg-primaryLight text-primary text-xl rounded-md p-4 text-center">
              <p>
                VOCÊ AINDA NÃO PUBLICOU NADA, CRIE SUA PRIMEIRA PUBLICAÇÃO PARA
                RECEBER DOAÇÕES
              </p>
            </div>
          </div>
        )
      )}

      {//Feature descontinuada
      /* {!isExternalProfile && user?.role_id !== parseInt(Role.Beneficiario) && useFallBack && (
        <div className="w-full align-middle max-w-[560px] mt-8">
          {firstPublication && (
            <div className="border-t-[1px] border-primaryLight mt-8">
              <Publication {...firstPublication} />
            </div>
          )}
        </div>
      )} */}

      <Button
        classname={`w-full p-4 mb-16 text-lg md:text-2xl font-semibold md:font-bold text-white bg-primary hover:text-primary hover:bg-white md:w-[500px] md:py-2 ${publications.length === 0 ? "mt-auto" : ""
          }`}
        href="/platform"
        children={"VOLTAR PARA A PÁGINA INICIAL"}
      />
    </div>
  );
}