import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../service/api";
import Loading from "../layout/Loading";
import { useState } from "react";

interface DescriptionResult {
  description: string;
}
interface DescriptionProps {
  onClose: () => void;
  description: string;
  onSave: (description: string) => void;
}

export default function Description({ onClose, description, onSave }: DescriptionProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<DescriptionResult>({ defaultValues: { description } })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<DescriptionResult> = async (data) => {
    setIsLoading(true)
    try {
      const result = await api.sendDescription(data.description);
      console.log(result);
      onSave(data.description)
      onClose();
    }
    catch (error) {
      throw new Error;
    }
  }

  if (isLoading) {
    return <Loading size={60} />;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      <div className="relative z-50 p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-sans font-semibold mb-4 text-primary">EDITAR DESCRIÇÃO</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="description"
              {...register("description", { required: "A descrição é obrigatória" })}
              className="text-zinc-800 font-sans mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 py-2 px-4 bg-primary text-white rounded-md hover:bg-gray-600 w-24"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark w-24"
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}