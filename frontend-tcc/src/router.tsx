/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import BuildingPage from "./pages/BuildingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/Auth/AuthProvider";
import PlatformPage from "./pages/Platform";
import Privacy from "./pages/Privacy";
import { PlatformProvider } from "./pages/Platform/usePlatform";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ProfilePage from "./pages/Platform/Profile/ProfilePage";
import PaymentPage from "./pages/Platform/PaymentPage";
import CreatePubPage from "./pages/Platform/CreatePubPage";
import UsersSearch from "./pages/UsersSearch";
import Payment from "./components/modals/Payment";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <main>
          <AuthProvider>
            <Navbar />
            <Container>
              <Outlet />
            </Container>
            <Footer />
          </AuthProvider>
        </main>
      }
    >
      <Route path="/" index element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/platform"
        element={
          <PlatformProvider>
            <Outlet />
          </PlatformProvider>
        }
      >
        <Route index element={<PlatformPage />} />
        <Route path="create-pub" element={<CreatePubPage />} />
        <Route
          path="profile/:id"
          element={<ProfilePage />}
          loader={({ params }: any) => {
            return {
              id: params.id,
            };
          }}
        />
        <Route
          path="profile/:id/pay"
          element={
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
              <Payment className="relative z-50 p-8 bg-white rounded-lg shadow-lg" />
            </div>
          }
          loader={({ params }: any) => {
            return {
              external_id: params.id,
            };
          }}
        />
        <Route
          path="payment/:id"
          element={<PaymentPage />}
          loader={({ params }: any) => {
            return {
              external_id: params.id,
            };
          }}
        />
        <Route path="filter" element={<UsersSearch />} />
      </Route>
      <Route path="/privacy-policies" element={<Privacy />} />
      <Route path="verify-email" element={<VerifyEmailPage />} />

      <Route path="*" element={<BuildingPage />} />
    </Route>
  )
);
