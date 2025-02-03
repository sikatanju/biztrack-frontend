/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router";

interface Props {
    handleSideBar: () => void;
    handleLogout: () => void;
}

const Navbar = ({ handleSideBar, handleLogout }: Props) => {
    return (
        <nav className="navbar fixed-top px-0 shadow-sm bg-white">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <span className="icon-nav m-0 h5" onClick={handleSideBar}>
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
                            <Link to={"/profile"}>
                                <a href="#" className="side-bar-item">
                                    <span className="side-bar-item-caption">
                                        Profile
                                    </span>
                                </a>
                            </Link>
                            <a onClick={handleLogout} className="side-bar-item">
                                <span className="side-bar-item-caption">
                                    Logout
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
