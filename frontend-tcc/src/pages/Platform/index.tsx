import EmptyState from "../../components/EmptyState/EmptyState";
import Publication from "../../components/partials/Publication";
import { usePlatform } from "./usePlatform";
import { useNavigate } from "react-router-dom";

export default function PlatformPage() {
  const { publications } = usePlatform();
  const navigate = useNavigate();

  const handleActionClick = () => {
    navigate("/platform/filter");
  };

  return (
    <div className="w-full flex flex-col bg-white items-center container mx-auto">
      <section className="md:w-[40%]">
        {publications.length === 0 ? (
          <EmptyState
            message="Nenhuma publicação foi encontrada."
            actionText="Buscar cidades"
            onAction={handleActionClick} // Passa a função de callback corretamente
          />
        ) : (
          publications.map((publication) => (
            <Publication key={publication.post.id} {...publication} />
          ))
        )}
      </section>
    </div>
  );
}
