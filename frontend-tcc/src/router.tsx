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
import PlatformPage from "./pages/PlatformPage";
import Privacy from "./pages/Privacy";
import ProfilePage from "./pages/ProfilePage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <main>
          <AuthProvider>
            <Container>
              <Navbar />
              <Outlet />
            </Container>
            <Footer />
          </AuthProvider>
        </main>
      }
    >
      <Route index element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/platform" element={<PlatformPage />} />
      <Route path="/privacy-policies" element={<Privacy />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<BuildingPage />} />
    </Route>
  )
);
