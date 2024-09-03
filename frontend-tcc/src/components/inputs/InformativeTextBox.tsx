interface InformativeTextBox {
  texto: string;
}
export default function InformativeTextBox({ texto }: InformativeTextBox) {
  return (
    <div className="bg-primary p-6 rounded-3xl shadow-lg max-w-2xl mx-auto my-8 w-full h-36">
      <p className="text-lightGrey leading-relaxed text-sm">
        {texto}
      </p>
    </div>
  );
};