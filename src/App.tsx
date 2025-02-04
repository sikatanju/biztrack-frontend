/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import DashboardLayout from "./components/DashboardLayout";
import Category from "./pages/Category";

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
                    <Route path="category" element={<Category />} />
                </Route>
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
