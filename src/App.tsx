import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import DashboardLayout from "./components/DashboardLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<DashboardLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<UserProfile />} />
                </Route>
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
