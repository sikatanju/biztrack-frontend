import { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
    const navigate = useNavigate();
    const [showSideBar, setShowSideBar] = useState<boolean>(true);
    const handleSideBar = () => {
        setShowSideBar(!showSideBar);
    };
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to={"/login/"} />;
    const handleLogout = () => {
        localStorage.removeItem("token");
        setTimeout(() => {
            navigate("/");
        }, 500);
    };

    return (
        <>
            <Navbar handleSideBar={handleSideBar} handleLogout={handleLogout} />
            <div
                id="sideNavRef"
                className={showSideBar ? "side-nav-open" : "side-nav-close"}
            >
                <Sidebar />
            </div>
            <div
                id="contentRef"
                className={showSideBar ? "content" : "content-expand"}
            >
                <Outlet />
            </div>
        </>
    );
};

export default DashboardLayout;
