import Input from "../../inputs/Input";
import Button from "../../inputs/Button";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { Comments } from "../../../types/publications/Comments";
import { usePlatform } from "../../../pages/Platform/usePlatform";
import { PublicationType } from "../../../types/publications";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../service/api";
import Loading from "../../layout/Loading";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Filter } from "bad-words";
import { toast } from "react-toastify";
import NoProfilePicture from "../../icons/source/NoProfilePicture";

export default function Publication({ post, comments }: PublicationType) {
  const { handleComment, handleDeleteComment } = usePlatform();
  const { register, handleSubmit, reset } = useForm<Comments>({
    defaultValues: { post_id: post.id },
  });
  const [userPicture, setUserPicture] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setUserInternalPicture] = useState<string | undefined>(undefined);
  const { user } = useAuth();

  const [photoPublication, setPhotoPublication] = useState<string | undefined>(
    undefined
  );
  const [photoComments, setPhotoComments] = useState<{ [key: number]: string }>(
    {}
  );

  const [showAllComments, setShowAllComments] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const displayedComments = showAllComments ? comments : comments?.slice(0, 4);
  const hasMoreComments = comments?.length > 4;
  const filter = new Filter();
  filter.addWords("fdp", "Corinthiano");

  useEffect(() => {
    const fetchUserPicture = async () => {
      if (post?.user_picture) {
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

  const onSubmit = async (data: Comments) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (filter.isProfane(data.content)) {
        toast.error("Seu comentário contém palavras ofensivas");
        return;
      } else {
        await handleComment(data);
        reset({ content: "", post_id: post.id });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[560px] my-8 md:my-20 px-4 md:px-0">
      {/* Author section */}
      <div className="flex gap-3 md:gap-6 items-center">
        <Link to={`/platform/profile/${post.user_id}`}>
          {userPicture ? (
            <img
              className="rounded-full aspect-square object-cover w-10 h-10 md:w-16 md:h-16 cursor-pointer"
              src={userPicture}
              alt="Author"
            />
          ) : (
            <NoProfilePicture className="rounded-full aspect-square object-cover w-10 h-10 md:w-16 md:h-16 cursor-pointer" />
          )}
        </Link>
        <div>
          <p className="text-primary text-sm md:text-base">
            {post.author_name}
            {post.user_id === user?.id && (
              <span className="text-gray-500 text-xs md:text-sm ml-1">
                (você)
              </span>
            )}
          </p>
          <span className="text-gray text-xs md:text-sm">{post.user_city}</span>
        </div>
      </div>

      {/* Publication content */}
      <div className="w-full mt-2 md:mt-4">
        <p className="text-xs md:text-sm my-2 md:my-3">
          {post.description || ""}
        </p>
        <div className="w-full border border-lightGray rounded-t-lg overflow-hidden">
          {isLoading ? (
            <Loading size={40} />
          ) : (
            <img
              className="w-full aspect-square object-cover"
              src={photoPublication || "/cestaBasica.jpg"}
              alt="foto da publicação"
            />
          )}
          {post.user_id !== user?.id && (
            <div className="relative">
              <Button
                href={`/platform/profile/${post.user_id}/pay?publicationId=${post.id}`}
                classname="absolute bottom-4 md:bottom-8 right-4 md:right-8 text-base md:text-2xl text-white bg-primary px-4 md:px-12 py-1 md:py-2 font-bold md:font-extrabold rounded-md"
              >
                DOAR
              </Button>
            </div>
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
            className="flex flex-col border-b-[2px] px-3 md:px-4 py-2 md:py-3 gap-1 md:gap-2 border-[#e9e9e9]"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <Link to={`/platform/profile/${comment.user_id}`}>
                {photoComments[comment.id] ? (
                  <img
                    className="rounded-full aspect-square object-cover w-8 h-8 md:w-10 md:h-10 cursor-pointer"
                    src={photoComments[comment.id]}
                    alt=""
                  />
                ) : (
                  <NoProfilePicture className="rounded-full aspect-square object-cover w-8 h-8 md:w-10 md:h-10 cursor-pointer" />
                )}
              </Link>
              <p className="text-primary text-sm md:text-base">
                {comment.author_name}
              </p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-xs md:text-sm flex-1">
                {comment.content}
              </span>
              {comment.user_id === Number(user?.id) && post.id && (
                <button
                  onClick={() => handleDeleteComment(comment.id, post.id!)}
                  className="p-1.5 md:p-2 transition-colors group relative shrink-0"
                >
                  <DeleteOutlineIcon
                    className="w-4 h-4 md:w-5 md:h-5 bg-blend-color text-primary transition-colors group-hover:text-red-500"
                    fontSize="medium"
                  />
                </button>
              )}
            </div>
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
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row w-full items-start md:items-center gap-4 md:gap-2 py-2 px-4"
        >
          <div className="flex w-full items-center gap-4">
            {user?.user_picture ? (
              <img
                className="rounded-full aspect-square object-cover w-10 h-10 md:w-12 md:h-12 shrink-0"
                src={
                  user?.user_picture
                    ? api.getPicture(user.user_picture)
                    : "/fotodeperfilVinni.jpg"
                }
                alt="Imagem do usuario"
              />
            ) : (
              <NoProfilePicture className="rounded-full aspect-square object-cover w-10 h-10 md:w-12 md:h-12 shrink-0" />
            )}

            <Input
              className="w-full py-2 md:py-0 h-12"
              containerClassName="md:w-full"
              placeholder="Digite seu comentário..."
              name="content"
              register={register}
            />
          </div>
          <Button
            type="submit"
            classname="w-full h-12 mt-1 md:w-20 py-2 md:py-3 bg-white border-[1px] border-primary text-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
