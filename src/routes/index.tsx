import APage from "../pages/aPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/homePage";

function RootRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/aPage" element={<APage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RootRoute;
