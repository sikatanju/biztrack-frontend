import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
    const navigate = useNavigate();
    const [showSideBar, setShowSideBar] = useState<boolean>(true);

    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/");
    }, [navigate]);

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
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default DashboardLayout;
