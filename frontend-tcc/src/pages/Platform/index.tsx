import Aside from "../../components/layout/Aside";
import Publication from "../../components/partials/Publication";
import { usePlatform } from "./usePlatform";

export default function PlatformPage() {
    const { publications } = usePlatform();
    return (
        <div className="w-full flex flex-col bg-white items-center container mx-auto">
            <Aside />
            <section className="w-[40%]">
                {publications.map((publication) => (
                    <Publication key={publication.post.id} {...publication} />
                ))}
            </section>
        </div>
    );
}
