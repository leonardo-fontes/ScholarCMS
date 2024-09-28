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
import { PlatformProvider, pubs } from "./pages/Platform/usePlatform";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ProfilePage from "./pages/Platform/Profile/ProfilePage";
import PaymentPage from "./pages/PaymentPage";
import api from "./service/api";

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
            <Route
                path="/platform"
                loader={async () => {
                    return pubs;
                }}
                element={
                    <PlatformProvider>
                        <PlatformPage />
                    </PlatformProvider>
                }
            />
            <Route path="/privacy-policies" element={<Privacy />} />
            <Route path="verify-email" element={<VerifyEmailPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/payment/:id" element={<PaymentPage />} loader={({ params }: any) => {
                return {
                    external_id: params.id, qr_code: "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"
                }
            }} />
            <Route path="*" element={<BuildingPage />} />
        </Route>
    )
);
