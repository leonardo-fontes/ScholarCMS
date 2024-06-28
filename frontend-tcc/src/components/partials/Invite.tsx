interface Invite {
  title: string;
  text: string;
  sourceImage: string;
  titleButton: string;
}
import Button from "../inputs/Button";
export default function Invite({ title, text, sourceImage, titleButton } : Invite) {
  return (
    <>
      <img
        className="bg-gray-300 mt-20 rounded-lg mx-7"
        src={sourceImage}
        alt=""
      />
      <div className="flex flex-col px-7 py-8 gap-6 ">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm">{text}</p>
      </div>
      <Button
        text={titleButton}
        classname="text-lg font-semibold text-white bg-gray-500 mx-7"
      />
    </>
  );
}
