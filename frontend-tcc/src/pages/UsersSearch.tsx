import { useEffect, useState } from "react";
import api from "../service/api";
import { useAuth } from "../hooks/useAuth";
import { usePlatform } from "./Platform/usePlatform";
import Publication from "../components/partials/Publication";
import Button from "../components/inputs/Button";
import { User } from "../types/User";
import { PublicationType } from "../types/publications";
import { Post } from "../types/publications/Post";
import Input from "../components/inputs/Input";
import { register } from "module";
import { useForm } from "react-hook-form";
import Loading from "../components/layout/Loading";
import Modal from "../components/modals/ModalPublications";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function UsersSearch() {
  const { user } = useAuth() as { user: User };
  const { publications, setPublications } = usePlatform();
  const [city, setCity] = useState(user?.city || '');
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchGetPublications = async (city?: string) => {
    try {
      setIsLoading(true)
      const response = await api.getPublications(city);

      const limitedResponse = response.slice(0, 10);
      const formattedPublications: PublicationType[] = limitedResponse.map((post: Post) => ({
        post: {
          id: post.id,
          user_id: post.user_id,
          author_name: post.author_name,
          author_photo: post.user_picture,
          description: post.description,
          photos: post.photos,
          created_at: post.created_at,
          updated_at: post.updated_at,
          author_city: post.author_city,
          user_picture: post.user_picture
        },
        comments: post.comments || []
      }));
      setPublications(formattedPublications);
      setIsLoading(false)

      if (formattedPublications.length === 0) {
        setShowModal(true)
      }
      reset({ city: '' });
      setCity('');
    } catch (error) {
      console.error("Ocorreu um erro ao buscar as publicações", error);
    }
  };

  useEffect(() => {
    fetchGetPublications(user.city);
  }, [user.city]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    fetchGetPublications(city);
    setSearchParams({ city });
  };

  if (isLoading) {
    return <> <Loading size={60} /> </>
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="w-full flex flex-col bg-white items-center container mx-auto">
      <form onSubmit={handleSearch} className="mb-2 mt-4 flex items-center space-x-2">
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite a cidade que deseja pesquisar"
          name="Digite a cidade que deseja pesquisar"
          className="py-2 min-w-80 mb-2"
          register={register}
        />
        <Button
          type="submit"
          classname="w-28 py-2 space-x-2 bg-white border-[1px]  border-primary text-primary"
          children="Pesquisar"
        />
      </form>
      <div>
        {publications.map((publication) => (
          <Publication key={publication.post.id} {...publication} />
        ))}
      </div>
      {showModal && (
        <Modal message="Nenhuma publicação foi encontrada na cidade especificada." onClose={handleCloseModal} />
      )}
    </div>
  );
}