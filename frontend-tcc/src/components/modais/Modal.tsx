import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { signout } = useAuth();
  if (!isOpen) return null;
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg cursor-pointer">
      <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={onClose}>
        Meu perfil
      </Link>
      <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={onClose}>
        Ir para configurações
      </Link>
      <button
        onClick={() => {
          signout();
          onClose();
        }}
        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
      >
        Sair
      </button>
    </div>
  )
}