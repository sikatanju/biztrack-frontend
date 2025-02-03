import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
    const navigate = useNavigate();
    const [showSideBar, setShowSideBar] = useState<boolean>(true);

    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/");
    }, []);

    const handleSideBar = () => {
        setShowSideBar(!showSideBar);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setTimeout(() => {
            navigate("/");
        }, 500);
    };

    return (
        <>
            <Navbar handleLogout={handleLogout} handleSideBar={handleSideBar} />
            <Sidebar />
            <Outlet />
        </>
    );
};

export default DashboardLayout;
