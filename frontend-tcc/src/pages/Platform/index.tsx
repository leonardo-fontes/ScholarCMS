import Publication from "../../components/partials/Publication";
import { usePlatform } from "./usePlatform";

export default function PlatformPage() {
    const { publications } = usePlatform();
    return (
        <section className="w-[50%] m-20">
            {publications.map((publication) => (
                <Publication {...publication} />
            ))}
        </section>
    );
}
