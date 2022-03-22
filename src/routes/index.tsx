import App from "../app";
import APage from "../pages/aPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function RootRoute () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/aPage" element={<APage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RootRoute;