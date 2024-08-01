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
                <>
                    <Container>
                        <Navbar />
                        <Outlet />
                    </Container>
                    <Footer />
                </>
            }
        >
            <Route index element={<LandingPage />} />
            <Route path="/404-page" element={<BuildingPage />} />
        </Route>
    )
);
