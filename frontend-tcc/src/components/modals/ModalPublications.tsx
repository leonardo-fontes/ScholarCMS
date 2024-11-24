import React from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-primary text-white rounded-md bg-center"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;