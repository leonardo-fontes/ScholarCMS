import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import api from "../../service/api"

interface PictureResult {
  created_at: string;
  id: number;
  path: string;
  updated_at: string;
  user_id: number;
}
interface ProfilePicFormProps {
  onClose: () => void;
  onUpdatePicture: (newPictureUrl: string) => void;
}
export default function ProfilePicForm({ onClose, onUpdatePicture }: ProfilePicFormProps) {
  const { updateUserPicture } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    const file = data.profilePicture[0]
    if (file) {
      const result: PictureResult = await api.changePicture(file);
      result ? console.log("Foto de perfil alterada com sucesso") : console.log("Erro ao alterar a foto de perfil");
      if (result && result?.path) {
        onUpdatePicture(result.path);
        updateUserPicture(result.path)
        console.log('Foto de perfil atualizada com sucesso');
      } else console.log('Erro ao atualizar foto de perfil');
    }
    onClose();
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl mb-4">Trocar Foto do Perfil</h2>
          <input type="file" {...register('profilePicture')} className="mb-4" />
          <div className="flex justify-end gap-4">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Salvar</button>
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}