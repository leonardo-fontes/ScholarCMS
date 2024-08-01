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

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={
                <main>
                    <Container>
                        <Navbar />
                        <Outlet />
                    </Container>
                    <Footer />
                </main>
            }
        >
            <Route index element={<LandingPage />} />
            <Route path="*" element={<BuildingPage />} />
        </Route>
    )
);
