import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import Textarea from "../../components/inputs/Textarea";
import FileInput from "../../components/inputs/FileInput";
import { useEffect, useState } from "react";
import Button from "../../components/inputs/Button";
import api from "../../service/api";
import { CreatePost } from "../../types/publications/Post";
import Loading from "../../components/layout/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NoProfilePicture from "../../components/icons/source/NoProfilePicture";

export default function CreatePubPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreatePost>();

  const photos = watch("photos");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userPicture, setUserPicture] = useState<string | null>(null);

  const handleCreatePub: SubmitHandler<CreatePost> = async (data) => {
    const formData = new FormData();
    formData.append("description", data.description);
    if (user?.name) {
      formData.append("author_name", user.name);
    }

    // Verifica se há fotos, adiciona cada uma delas no formData
    if (data.photos) {
      Array.from(data.photos).forEach((photo) => {
        formData.append("photos", photo);
      });
    }

    try {
      // Faz a requisição com o formData (que inclui as fotos se houver)
      setIsLoading(true);
      const response = await api.createPost(formData);
      setIsLoading(false);
      if (response)
        toast.success("Publicação criada com sucesso", {
          autoClose: 2000,
        });
      setTimeout(() => {
        navigate(`/platform/profile/${user?.id}`);
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro ao criar publicação. Tente novamente.");
      } else {
        toast.error("Erro desconhecido");
      }
      setIsLoading(false);
    }
  };

  const updateFileList = (newFiles: FileList) => {
    const currentFiles = getValues("photos") || [];
    const allFiles = [...currentFiles, ...Array.from(newFiles)];
    const dataTransfer = new DataTransfer();
    allFiles.forEach((file) => dataTransfer.items.add(file));
    setValue("photos", dataTransfer.files);
  };

  const generateImageUrls = (photos: FileList | null) => {
    if (photos && photos.length > 0) {
      const newImageUrls = Array.from(photos).map((photo) =>
        URL.createObjectURL(photo)
      );
      setImageUrls(newImageUrls);
    }
  };

  useEffect(() => {
    generateImageUrls(photos);
  }, [photos]);

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

  if (isLoading) {
    return (
      <>
        {" "}
        <Loading size={60} />{" "}
      </>
    );
  }

  return (
    <div className="w-full flex flex-col items-center my-10">
      <div className="flex gap-6 items-center">
        {userPicture ? (
          <img
            className="rounded-full aspect-square object-cover w-12 md:w-24 mb-2"
            src={userPicture}
            alt="Author"
          />
        ) : (
          <NoProfilePicture className="rounded-full aspect-square object-cover w-12 md:w-24 mb-2" />
        )}
        <div className="px-4">
          <p className="text-lg">{`${user?.name} ${user?.surname}`}</p>
          <span className="text-gray text-base">{user?.city}</span>
        </div>
      </div>
      <span className="inline-block text-2xl font-semibold mt-8 md:mb-2 mb-8 font-sans text-black tracking-wide text-right md:w-2/4 border-r-4 border-primary pr-4">
        {" "}
        CRIAR PUBLICAÇÃO{" "}
      </span>
      <form
        className="md:w-[50%] w-[80%] flex flex-col gap-4"
        onSubmit={handleSubmit(handleCreatePub)}
        encType="multipart/form-data"
      >
        <Textarea
          className="resize-none"
          rows={6}
          label="Descrição"
          name="description"
          register={register("description", {
            required: "Descrição é obrigatória",
          })}
          error={errors?.description?.message}
        />
        <div className="flex w-full md:flex-row flex-col gap-4 md:items-end items-center justify-end md:justify-between">
          <div className="flex w-full items-end gap-4">
            <FileInput
              label="Adicionar fotos"
              className={`min-h-[70px] ${
                imageUrls.length < 1
                  ? "md:max-w-32 bg-primaryLight"
                  : "bg-gray border-none cursor-not-allowed"
              }`}
              disabled={imageUrls.length >= 1}
              name="photos"
              register={register}
              onChange={(e) => {
                if (e.target.files) {
                  updateFileList(e.target.files);
                }
              }}
            />
            {imageUrls.length > 0 && (
              <div className="flex gap-2">
                {imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Foto ${index + 1}`}
                    className="w-28 max-w-28 h-[70px] object-cover rounded-lg bg-lightGray"
                  />
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            children="PUBLICAR"
            classname="bg-primary md:mt-0 mt-6 text-white md:w-28 md:max-w-28 w-full h-[70px] justify-self-end font-semibold"
          />
        </div>
      </form>
    </div>
  );
}
