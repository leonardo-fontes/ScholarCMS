interface Invite {
    title: string;
    text: string;
    sourceImage: string;
    titleButton: string;
    rightImage?: boolean;
}
import Button from "../../inputs/Button";
export default function Invite({
    title,
    text,
    sourceImage,
    titleButton,
    rightImage = false,
}: Invite) {
    return (
        <div className="flex flex-col md:flex-row md:items-center mb-8">
            <img
                className={
                    rightImage
                        ? `md:hidden`
                        : `bg-gray-300 mt-20 rounded-lg mx-7 md:w-[50%]`
                }
                src={sourceImage}
                alt=""
            />
            <div className="flex flex-col md:gap-8">
                <div className="flex md:flex flex-col px-7 py-8 gap-6">
                    <h1 className="text-3xl md:text-4xl font-semibold">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl">{text}</p>
                </div>

                <Button
                    isLink={true}
                    link="/register"
                    text={titleButton}
                    classname="text-lg md:text-xl md:px-40 md:py-2 font-semibold md:self-center text-white bg-gray-500 mx-7 mt-4"
                />
            </div>
            <img
                className={
                    rightImage
                        ? `bg-gray-300 mt-20 rounded-lg mx-7 md:w-[50%] md:block hidden`
                        : `hidden`
                }
                src={sourceImage}
                alt=""
            />
        </div>
    );
}
