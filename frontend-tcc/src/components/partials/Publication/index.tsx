import Input from "../../inputs/Input";
import Button from "../../inputs/Button";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { Comments } from "../../../types/publications/Comments";
import { usePlatform } from "../../../pages/Platform/usePlatform";
import { PublicationType } from "../../../types/publications";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../service/api";
import Loading from "../../layout/Loading";

export default function Publication({ post, comments }: PublicationType) {
  const { handleComment } = usePlatform();
  const { register, handleSubmit } = useForm<Comments>({
    defaultValues: { post_id: post.id },
  });
  const [userPicture, setUserPicture] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInternalPicture, setUserInternalPicture] = useState<
    string | undefined
  >(undefined);
  const { user } = useAuth();
  const [photoPublication, setPhotoPublication] = useState<string | undefined>(
    undefined
  );
  const [photoComments, setPhotoComments] = useState<{ [key: number]: string }>(
    {}
  );
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");

  const [showAllComments, setShowAllComments] = useState(false);
  const displayedComments = showAllComments ? comments : comments?.slice(0, 4);
  const hasMoreComments = comments?.length > 4;

  useEffect(() => {
    const fetchUserPicture = async () => {
      if (post?.user_picture) {
        const limitedPhotos = post.user_picture.slice(0, 10);
        const pictureUrl = await api.getPicture(post?.user_picture); // Define a URL da imagem
        //const pictureUrl = await api.getPicture(limitedPhotos?.map); // Define a URL da imagem
        setUserPicture(pictureUrl);
        setIsLoading(false);
      }
    };
    fetchUserPicture();
  }, [post]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (post?.photos && post.photos.length > 0) {
        const pictureUrl = await api.getPicture(post?.photos[0]);
        if (pictureUrl) {
          setPhotoPublication(pictureUrl);
        }
        setIsLoading(false);
      }
      if (post?.user_picture) {
        //onst limitedPhotos = post.photos.slice(0, 10);
        const userPictureUrl = await api.getPicture(post.user_picture);
        //const userPictureUrl = await api.getPicture(limitedPhotos[0]);
        if (userPictureUrl) setUserInternalPicture(userPictureUrl);
      }
      setIsLoading(false);
    };
    fetchPhotos();
  }, [post]);

  useEffect(() => {
    const fetchCommentPictures = async () => {
      if (comments && comments.length > 0) {
        const validComments = comments.filter(
          (comment) => comment.user_picture
        );
        const photoUrls: { [key: number]: string } = {};
        for (const comment of validComments) {
          const pictureUrl = await api.getPicture(comment.user_picture);
          if (pictureUrl) {
            photoUrls[comment.id] = pictureUrl;
          }
        }
        setPhotoComments(photoUrls);
        setIsLoading(false);
      }
    };
    fetchCommentPictures();
  }, [comments]);

  return (
    <div className="flex flex-col w-full max-w-[560px] mt-20">
      <div className="flex gap-6 items-center">
        <Link to={`/platform/profile/${post.user_id}`}>
          <img
            className="rounded-full aspect-square object-cover w-12 md:w-16 mb-2 cursor-pointer"
            src={userPicture || "/homem_2.jpg"}
            alt="Author"
          />
        </Link>
        <div>
          <p className="text-primary">
            {post.author_name}
            {post.user_id === user?.id && (
              <span className="text-gray-500 text-sm ml-1">(você)</span>
            )}
          </p>
          <span className="text-gray text-sm">{city || user?.city}</span>
        </div>
      </div>
      <div className="w-full">
        <p className="text-sm my-3">{post.description || ""}</p>
        <div className="relative min-w-full border-2 border-lightGray">
          {isLoading ? (
            <Loading size={60} />
          ) : (
            <img
              className="w-full aspect-square object-cover"
              src={photoPublication || "/cestaBasica.jpg"}
              alt="foto da publicação"
            />
          )}
          {post.user_id !== user?.id && (
            <Button
              href={`/platform/profile/${post.user_id}?publicationId=${post.id}`}
              children="DOAR"
              classname="absolute bottom-8 right-8 text-lg md:text-2xl text-white bg-primary px-6 md:px-12 py-1 md:py-2 font-extrabold"
            />
          )}
        </div>
      </div>
      <div className="w-full bg-lightGray flex flex-col">
        <span className="text-gray text-sm text-end pr-4 py-1 border-b-[1px] border-[#e9e9e9]">
          Comentários
        </span>

        {displayedComments?.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col border-b-[2px] px-4 py-2 gap-1 border-[#e9e9e9]"
          >
            <div className="flex items-center gap-3">
              <Link to={`/platform/profile/${comment.user_id}`}>
                <img
                  className="rounded-full aspect-square object-cover w-12 md:w-10 cursor-pointer"
                  src={photoComments[comment.id] || "/fotodeperfilVinni.jpg"}
                  alt=""
                />
              </Link>
              <p className="text-primary">{comment.author_name}</p>
            </div>
            <span className="text-sm">{comment.content}</span>
          </div>
        ))}

        {hasMoreComments && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="text-primary hover:text-primary/80 text-sm py-2 text-center"
          >
            {showAllComments
              ? "Ver menos"
              : `Ver mais ${comments.length - 4} comentários`}
          </button>
        )}

        <form
          onSubmit={handleSubmit(handleComment)}
          className="flex w-full items-center justify-between py-2 px-4"
        >
          <div className="flex">
            <img
              className="rounded-full mr-4 aspect-square object-cover w-16 cursor-pointer"
              src={userInternalPicture || "/fotodeperfilVinni.jpg"}
              alt="Imagem do usuario"
            />
            <Input
              className="py-0 min-w-80"
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
