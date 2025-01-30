import { useState } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const navigate = useNavigate();
    const [showSideBar, setShowSideBar] = useState<boolean>(true);
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
            <nav className="navbar fixed-top px-0 shadow-sm bg-white">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <span
                            className="icon-nav m-0 h5"
                            onClick={handleSideBar}
                        >
                            <img
                                className="nav-logo-sm mx-2"
                                src="./images/menu.svg"
                                alt="logo"
                            />
                        </span>
                        <img
                            className="nav-logo  mx-2"
                            src="./images/BizTrack_Logo.png "
                            alt="logo"
                        />
                    </a>

                    <div className="float-right h-auto d-flex">
                        <div className="user-dropdown">
                            <img
                                className="icon-nav-img"
                                src="./images/user.webp"
                                alt=""
                            />
                            <div className="user-dropdown-content ">
                                <div className="mt-4 text-center">
                                    <img
                                        className="icon-nav-img"
                                        src="./images/user.webp"
                                        alt=""
                                    />
                                    <h6>User Name</h6>
                                    <hr className="user-dropdown-divider  p-0" />
                                </div>
                                <a href="#" className="side-bar-item">
                                    <span className="side-bar-item-caption">
                                        Profile
                                    </span>
                                </a>
                                <a
                                    onClick={handleLogout}
                                    className="side-bar-item"
                                >
                                    <span className="side-bar-item-caption">
                                        Logout
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {showSideBar && (
                <div id="sideNavRef" className="side-nav-open">
                    <a href="#" className="side-bar-item">
                        <i className="bi bi-graph-up"></i>
                        <span className="side-bar-item-caption">Dashboard</span>
                    </a>

                    <a href="#" className="side-bar-item">
                        <i className="bi bi-people"></i>
                        <span className="side-bar-item-caption">Customer</span>
                    </a>

                    <a href="#" className="side-bar-item">
                        <i className="bi bi-list-nested"></i>
                        <span className="side-bar-item-caption">Category</span>
                    </a>

                    <a href="#" className="side-bar-item">
                        <i className="bi bi-bag"></i>
                        <span className="side-bar-item-caption">Product</span>
                    </a>

                    <a href="#" className="side-bar-item">
                        <i className="bi bi-currency-dollar"></i>
                        <span className="side-bar-item-caption">
                            Create Sale
                        </span>
                    </a>

                    <a href="#" className="side-bar-item">
                        <i className="bi bi-receipt"></i>
                        <span className="side-bar-item-caption">Invoice</span>
                    </a>

                    <a href="#" className="side-bar-item">
                        <i className="bi bi-file-earmark-bar-graph"></i>
                        <span className="side-bar-item-caption">Report</span>
                    </a>
                </div>
            )}

            <div id="contentRef" className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                            <div className="card card-plain h-100 bg-white">
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                            <div>
                                                <h5 className="mb-0 text-capitalize font-weight-bold">
                                                    <span id="product">0</span>
                                                </h5>
                                                <p className="mb-0 text-sm">
                                                    Product
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                            <div className="icon icon-shape bg-gradient-primary shadow float-end border-radius-md">
                                                <img
                                                    className="w-100 "
                                                    src="./images/icon.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                            <div className="card card-plain h-100 bg-white">
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                            <div>
                                                <h5 className="mb-0 text-capitalize font-weight-bold">
                                                    <span id="category">1</span>
                                                </h5>
                                                <p className="mb-0 text-sm">
                                                    Category
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                            <div className="icon icon-shape bg-gradient-primary shadow float-end border-radius-md">
                                                <img
                                                    className="w-100 "
                                                    src="./images/icon.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                            <div className="card card-plain h-100 bg-white">
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                            <div>
                                                <h5 className="mb-0 text-capitalize font-weight-bold">
                                                    <span id="customer">1</span>
                                                </h5>
                                                <p className="mb-0 text-sm">
                                                    Customer
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                            <div className="icon icon-shape bg-gradient-primary shadow float-end border-radius-md">
                                                <img
                                                    className="w-100 "
                                                    src="./images/icon.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                            <div className="card card-plain h-100  bg-white">
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                            <div>
                                                <h5 className="mb-0 text-capitalize font-weight-bold">
                                                    <span id="invoice">0</span>
                                                </h5>
                                                <p className="mb-0 text-sm">
                                                    Invoice
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                            <div className="icon icon-shape bg-gradient-primary shadow float-end border-radius-md">
                                                <img
                                                    className="w-100 "
                                                    src="./images/icon.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                            <div className="card card-plain h-100 bg-white">
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                            <div>
                                                <h5 className="mb-0 text-capitalize font-weight-bold">
                                                    $ <span id="total">0</span>
                                                </h5>
                                                <p className="mb-0 text-sm">
                                                    Total Sale
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                            <div className="icon icon-shape bg-gradient-primary shadow float-end border-radius-md">
                                                <img
                                                    className="w-100 "
                                                    src="./images/icon.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                            <div className="card card-plain h-100  bg-white">
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                            <div>
                                                <h5 className="mb-0 text-capitalize font-weight-bold">
                                                    $ <span id="vat">0</span>
                                                </h5>
                                                <p className="mb-0 text-sm">
                                                    Vat Collection
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                            <div className="icon icon-shape bg-gradient-primary shadow float-end border-radius-md">
                                                <img
                                                    className="w-100 "
                                                    src="./images/icon.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                            <div className="card card-plain h-100  bg-white">
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                            <div>
                                                <h5 className="mb-0 text-capitalize font-weight-bold">
                                                    ${" "}
                                                    <span id="payable">0</span>
                                                </h5>
                                                <p className="mb-0 text-sm">
                                                    Total Collection
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                            <div className="icon icon-shape bg-gradient-primary shadow float-end border-radius-md">
                                                <img
                                                    className="w-100 "
                                                    src="./images/icon.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
