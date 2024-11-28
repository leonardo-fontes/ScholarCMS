import { createPortal } from "react-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Notification } from "../../types/Notification";
import api from "../../service/api";
import { useState, useEffect } from "react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

export const NotificationModal = ({
  isOpen,
  onClose,
  notifications: initialNotifications,
}: NotificationModalProps) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);

  if (!isOpen) return null;

  const formatDate = (date: string) => {
    return format(new Date(date), "d 'de' MMMM 'às' HH:mm", { locale: ptBR });
  };

  const handleMarkAsRead = async (notificationId: number) => {
    if (loadingIds.includes(notificationId)) return;

    setLoadingIds((prev) => [...prev, notificationId]);
    try {
      const success = await api.markNotificationAsRead(notificationId);
      if (success) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId ? { ...n, isRead: true } : n
          )
        );
      }
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== notificationId));
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="relative mt-20 w-[480px] bg-white rounded-lg shadow-xl">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Notificações</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="max-h-[70vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              Nenhuma notificação
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() =>
                    !notification.isRead && handleMarkAsRead(notification.id)
                  }
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    notification.isRead ? "bg-white" : "bg-blue-50"
                  }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={api.getPicture(notification.fromUser.user_picture)}
                      className="w-10 h-10 rounded-full object-cover"
                      alt={`${notification.fromUser.name} ${notification.fromUser.surname}`}
                    />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">
                          {notification.fromUser.name}{" "}
                          {notification.fromUser.surname}
                        </span>{" "}
                        enviou R$ {notification.transaction.amount.toFixed(2)} a
                        você.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(notification.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center">
                      {loadingIds.includes(notification.id) && (
                        <span className="text-xs text-blue-500">
                          Marcando como lida...
                        </span>
                      )}
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
