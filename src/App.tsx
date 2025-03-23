/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import UserProfile from "./pages/UserProfile";
import DashboardLayout from "./components/DashboardLayout";
import Category from "./pages/dashboard/Category";
import Customer from "./pages/dashboard/Customer";
import Product from "./pages/dashboard/ProductPage";
import Sale from "./pages/dashboard/Sale";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="" element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/customer" element={<Customer />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/sale" element={<Sale />} />
                </Route>
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
