import { useCallback, useEffect, useState } from "react";
import api from "../service/api";
import { useAuth } from "../hooks/useAuth";
import { usePlatform } from "./Platform/usePlatform";
import Publication from "../components/partials/Publication";
import Button from "../components/inputs/Button";
import { User } from "../types/User";
import { PublicationType } from "../types/publications";
import { Post } from "../types/publications/Post";
import Input from "../components/inputs/Input";
import { useForm } from "react-hook-form";
import Loading from "../components/layout/Loading";
import Modal from "../components/modals/ModalPublications";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../components/EmptyState/EmptyState";

export default function UsersSearch() {
  const { user } = useAuth() as { user: User };
  const { publications, setPublications } = usePlatform();
  const [city, setCity] = useState(user?.city || "");
  const { register, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchGetPublications = useCallback(
    async (city?: string, isFallback = false) => {
      try {
        setIsLoading(true);
        const response = await api.getPublications(city);

        const limitedResponse = response.slice(0, 10);

        const formattedPublications: PublicationType[] = limitedResponse.map(
          (post: Post) => ({
            post: {
              id: post.id,
              user_id: post.user_id,
              author_name: post.author_name,
              author_photo: post.user_picture,
              description: post.description,
              photos: post.photos,
              created_at: post.created_at,
              updated_at: post.updated_at,
              user_city: post.user_city,
              user_picture: post.user_picture,
            },
            comments: post.comments || [],
          })
        );
        setPublications(formattedPublications);
        if (formattedPublications.length === 0) {
          if (isFallback) {
            setNoResults(true)
          }
          else {
            setShowModal(true);
            reset({ city: "" });
          }
        }
        reset({ city: "" });
        setCity("");
        console.log("valor de noResults " + noResults)
      } catch (error) {
        console.error("Ocorreu um erro ao buscar as publicações", error);
      }
      finally {
        setIsLoading(false)
      }
    },
    [reset, setPublications]
  );

  useEffect(() => {
    const cityParam = searchParams.get("city") || user.city;
    if (publications.length === 0 && !noResults) {
      fetchGetPublications(cityParam, true);
    }
  }, [fetchGetPublications, searchParams, user.city, publications.length]);



  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setNoResults(false)
    await fetchGetPublications(city);
    setSearchParams({ city });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (publications.length === 0 && city !== user?.city && !showModal && !noResults) {
      fetchGetPublications(user.city);
      setSearchParams({ city });
    }
  }, [city, user.city, showModal, fetchGetPublications]);

  if (isLoading) {
    return <Loading size={60} />;
  }

  return (
    <div className="w-full min-h-screen bg-white mb-20">
      <div className="max-w-[600px] mx-auto px-4 md:px-6 pt-8 md:pt-12">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="w-full flex items-center gap-2">
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Digite a cidade para pesquisar"
            name="Digite a cidade para pesquisar"
            className="h-14 border-none bg-customGray text-black"
            containerClassName="w-full"
            register={register}
          />
          <Button
            type="submit"
            classname="w-36 h-12 mt-1 md:w-auto px-6 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            Pesquisar
          </Button>
        </form>

        {/* Publications List */}
        {noResults ? ( // Linha adicionada
          <EmptyState message="Nenhuma publicação foi encontrada." /> // Linha adicionada
        ) : (
          <div className="w-full space-y-6">
            {publications.map((publication) => (
              <Publication key={publication.post.id} {...publication} />
            ))}
          </div>
        )}

        {showModal && (
          <Modal
            message="Nenhuma publicação foi encontrada na cidade especificada."
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}
