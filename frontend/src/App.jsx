import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import CreateCourse from "./pages/CreateCourse";
import ProtectedAdminRoute from "./components/ProctedAdminRoute"


function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<UserLogin />} />

                <Route path="/user/login" element={<UserLogin />} />

                <Route path="/user/signup" element={<UserSignup />} />

                <Route path="/admin/login" element={<AdminLogin />} />

                <Route path="/admin/signup" element={<AdminSignup />} />

                <Route element={<ProtectedAdminRoute />}>

                    <Route path="/admin/createCourse"
                           element={<CreateCourse />}
                    />

                </Route>
 

            </Routes>
        </BrowserRouter>
    );
}

export default App;