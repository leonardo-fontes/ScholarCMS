import { motion } from "framer-motion";

export default function EmptyState({ message, actionText, onAction }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-8 text-center space-y-4 mt-64"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 4h6"
        />
      </svg>
      <p className="text-gray-600 text-lg">{message}</p>
      {actionText && onAction && (
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-blue-600"
          onClick={onAction}
        >
          {actionText}
        </button>
      )}
    </motion.div>
  );
};