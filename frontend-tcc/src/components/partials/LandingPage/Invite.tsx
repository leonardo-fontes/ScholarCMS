interface Invite {
    title: string;
    p1: string;
    p2?: string;
    p3?: string;
    sourceImage: string;
    titleButton: string;
    rightImage?: boolean;
}
import Button from "../../inputs/Button";
export default function Invite({
    title,
    p1,
    p2,
    p3,
    sourceImage,
    titleButton,
    rightImage = false,
}: Invite) {
    return (
        <section className="flex flex-col md:flex-row md:items-center mb-8">
            <img
                className={
                    rightImage
                        ? `md:hidden`
                        : `bg-gray-300 mt-20 rounded-3xl mx-7 md:w-[50%]`
                }
                src={sourceImage}
                alt="imagem ilustrativa de jovens"
            />
            <div className="flex flex-col md:gap-8">
                <div className="flex md:flex flex-col px-7 py-8 gap-3">
                    <h1 className="text-3xl md:text-5xl font-semibold md:font-bold text-primary mb-4">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl">{p1}</p>
                    <p className="text-lg md:text-xl">{p2}</p>
                    <p className="text-lg md:text-xl">{p3}</p>
                </div>

                <Button
                    isLink
                    link="/register"
                    children={titleButton}
                    classname="text-lg md:text-xl w-80 md:py-2 font-semibold md:font-bold md:self-center text-white bg-primary hover:text-primary hover:bg-white mx-7 "
                />
            </div>
            <img
                className={
                    rightImage
                        ? `bg-primaryLight mt-20 rounded-3xl mx-7 md:w-[50%] md:block hidden`
                        : `hidden`
                }
                src={sourceImage}
                alt="imagem ilustrativa de jovens"
            />
        </section>
    );
}
