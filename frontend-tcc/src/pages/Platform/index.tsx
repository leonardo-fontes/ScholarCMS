import Publication from "../../components/partials/Publication";
import { usePlatform } from "./usePlatform";

export default function PlatformPage() {
    console.log("PlatformPage renderizado");
    const { publications } = usePlatform();

    return (
        <div className="w-full flex flex-col bg-white items-center container mx-auto">

            <section className="w-[40%]">
                {publications.map((publication) => (
                    <Publication key={publication.post.id} {...publication} />
                ))}
            </section>
        </div>
    );
}
