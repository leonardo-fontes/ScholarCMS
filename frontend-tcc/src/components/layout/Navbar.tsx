import { Link, useLocation } from "react-router-dom";
import Icon from "../icons";
import Button from "../inputs/Button";
import { useAuth } from "../../hooks/useAuth";
import { Role } from "../../types/User";
import { useState, useEffect, useRef } from "react";
import { NotificationModal } from "../modals/NotificationModal";
import { Notification } from "../../types/Notification";
import api from "../../service/api";

export default function Navbar() {
  const { signout, user } = useAuth();
  const { pathname } = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const linkClassname =
    "flex text-lg min-w-64 justify-center items-center font-light hover:font-bold duration-100 transition-all gap-2 px-6 py-1 md:py-2 border-[1px] rounded-lg text-white";
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!user || isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const data = await api.getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    !["verify-email"].filter((page) => pathname.includes(page)).length && (
      <div className="bg-primary flex flex-col md:flex-row justify-between px-4 md:px-7 items-center py-4 z-10 fixed w-full top-0 shadow-lg">
        {/* Top bar with logo and hamburger */}
        <div className="w-full flex justify-between items-center md:w-auto">
          <Link to={user ? "/platform" : "/"}>
            <Icon
              className="hover:cursor-pointer w-20 md:w-28"
              name="logo"
              size={120}
            />
          </Link>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Desktop navigation - centered */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          {user && (
            <div className="flex items-center gap-8">
              <Link className={linkClassname} to={"platform/filter"}>
                Buscar perfis
                <Icon name="magnifyingGlass" size={20} color="white" />
              </Link>

              <Link
                className={linkClassname}
                to={`/platform/profile/${user.id}`}
              >
                Meu perfil
                <Icon name="profileIcon" size={24} color="white" />
              </Link>

              {user?.role_id === parseInt(Role.Beneficiario) && (
                <Link className={linkClassname} to={"/platform/create-pub"}>
                  Criar Publicação
                  <Icon name="addItem" size={24} color="white" />
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Move notifications and logout to right side */}
        <div className="hidden md:flex items-center">
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowNotifications(true)}
                className="p-2 hover:bg-gray-700 rounded-full relative mx-4"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>

                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                  {isLoading && (
                    <div className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </div>
              </button>

              <NotificationModal
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
                notifications={notifications}
              />
            </div>
          )}
          <Button
            href="/login"
            classname="text-lg md:text-xl text-primary bg-white px-6 md:px-8 py-1 md:py-2 font-semibold"
            onClick={user ? signout : undefined}
          >
            {user ? "Sair" : "Entrar"}
          </Button>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } md:hidden flex-col w-full pt-4 gap-4`}
        >
          {user && (
            <>
              <Link
                to={"platform/filter"}
                className="flex items-center justify-center gap-2 text-white py-3 hover:bg-primary-dark"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Buscar perfis
                <Icon name="magnifyingGlass" size={20} color="white" />
              </Link>

              {user?.role_id === parseInt(Role.Beneficiario) && (
                <Link
                  to={"/platform/create-pub"}
                  className="flex items-center justify-center gap-2 text-white py-3 hover:bg-primary-dark"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Criar Publicação
                  <Icon name="addItem" size={24} color="white" />
                </Link>
              )}

              <Link
                to={`/platform/profile/${user.id}`}
                className="flex items-center justify-center gap-2 text-white py-3 hover:bg-primary-dark"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Meu perfil
                <Icon name="profileIcon" size={24} color="white" />
              </Link>

              <div className="flex justify-center py-3">
                <button
                  onClick={() => {
                    setShowNotifications(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="relative p-2 hover:bg-primary-dark rounded-full"
                >
                  <div className="w-6 h-6">
                    <svg
                      className="text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </button>
              </div>
            </>
          )}

          <Button
            href="/login"
            classname="text-lg text-primary bg-white px-6 py-2 font-semibold mx-4 mb-4"
            onClick={() => {
              if (user) signout();
              setIsMobileMenuOpen(false);
            }}
          >
            {user ? "Sair" : "Entrar"}
          </Button>
        </div>
      </div>
    )
  );
}
