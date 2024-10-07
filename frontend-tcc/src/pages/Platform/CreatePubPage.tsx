import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import Textarea from "../../components/inputs/Textarea";
import FileInput from "../../components/inputs/FileInput";
import { useEffect, useState } from "react";
import Button from "../../components/inputs/Button";

type CreatePub = {
    description: string;
    photos: FileList;
};

export default function CreatePubPage() {
    const { user } = useAuth();
    const { register, handleSubmit, watch, setValue, getValues } =
        useForm<CreatePub>();

    const photos = watch("photos");
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleCreatePub: SubmitHandler<CreatePub> = async (data) => {
        console.log(data);
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
        console.log(photos);
    }, [photos]);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex gap-6 items-center">
                <img
                    className="rounded-full aspect-square object-cover w-12 md:w-16 mb-2"
                    src={user?.profile_picture_url || "/garotos.jpg"}
                    alt="Author"
                />
                <div>
                    <p>{`${user?.name} ${user?.surname}`}</p>
                    <span className="text-gray text-sm">{user?.city}</span>
                </div>
            </div>
            <span className="text-2xl font-semibold mt-8">
                Criar publicação
            </span>
            <form
                className="w-[50%] flex flex-col gap-4"
                onSubmit={handleSubmit(handleCreatePub)}
            >
                <Textarea
                    className="resize-none"
                    rows={4}
                    label="Descrição"
                    name="description"
                    register={register}
                />
                <div className="flex gap-4 items-end justify-between">
                    <div className="flex items-end gap-4">
                        <FileInput
                            label="Adicionar fotos"
                            className={`${
                                imageUrls.length < 3
                                    ? "max-w-32 bg-lightGray"
                                    : "bg-gray border-none cursor-not-allowed"
                            }`}
                            disabled={imageUrls.length >= 3}
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
                                        className="w-28 max-w-28 min-h-[70px] max-h-[70px] object-cover rounded-lg bg-lightGray"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        children="PUBLICAR"
                        classname="bg-primary text-white w-28 max-w-28 h-[70px] justify-self-end"
                    />
                </div>
                <p className="text-xs self-start text-gray">
                    Quantidade maxima de fotos: 3
                </p>
            </form>
        </div>
    );
}
