import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import apiClient from "../utils/apiClient";

interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    mobile: string;
}

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User>({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        mobile: "",
    });
    const [password, setPassword] = useState<string | undefined>();
    const [repeatPassword, setRepeatPassword] = useState<string | undefined>();
    const [registrationComplete, setRegistrationComplete] = useState(false);

    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        doesPasswordMatch(newPassword);
    };
    const handleRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setRepeatPassword(newPassword);
        doesPasswordMatch(newPassword);
    };

    const doesPasswordMatch = (newPassword: string) => {
        if (password !== newPassword && repeatPassword !== newPassword) {
            setPasswordMatch(false);
            return false;
        }
        setPasswordMatch(true);
        return true;
    };

    const handleNavigation = () => {
        setRegistrationComplete(true);
        setTimeout(() => {
            navigate("/login");
        }, 3000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user.username && user.email) {
            apiClient
                .post("auth/users/", {
                    username: user.username,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    mobile: user.mobile,
                    email: user.email,
                    password: password,
                })
                .then((res) => {
                    if (res.data.status === "failed") {
                        setRegistrationComplete(true);
                        handleNavigation();
                    } else if (res.data) {
                        setRegistrationComplete(true);
                        navigate("/login");
                    }
                })
                .catch((e) => console.log(e.message));
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-10 center-screen">
                        <div className="card animated fadeIn w-100 p-3">
                            <div className="card-body">
                                <h4>Sign Up Form</h4>
                                <hr />
                                <div className="container-fluid p-0">
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="row m-0 p-0">
                                            <div className="col-md-4 p-2">
                                                <label htmlFor="username">
                                                    <h6>Username</h6>
                                                </label>
                                                <input
                                                    id="username"
                                                    placeholder="User Email"
                                                    className="form-control"
                                                    type="username"
                                                    name="username"
                                                    value={user.username}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label htmlFor="email">
                                                    <h6>Email Address</h6>
                                                </label>
                                                <input
                                                    id="email"
                                                    placeholder="User Email"
                                                    className="form-control"
                                                    type="email"
                                                    name="email"
                                                    value={user.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row m-0 p-0">
                                            <div className="col-md-4 p-2">
                                                <label htmlFor="firstName">
                                                    <h6>First Name</h6>
                                                </label>
                                                <input
                                                    id="firstName"
                                                    placeholder="First Name"
                                                    className="form-control"
                                                    type="text"
                                                    name="firstName"
                                                    value={user.firstName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label htmlFor="lastName">
                                                    <h6>Last Name</h6>
                                                </label>
                                                <input
                                                    id="lastName"
                                                    placeholder="Last Name"
                                                    className="form-control"
                                                    type="text"
                                                    name="lastName"
                                                    value={user.lastName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="row m-0 p-0">
                                            <div className="col-md-4 p-2">
                                                <label htmlFor="mobile">
                                                    <h6>Mobile Number</h6>
                                                </label>
                                                <input
                                                    id="mobile"
                                                    placeholder="Mobile"
                                                    className="form-control"
                                                    type="mobile"
                                                    name="mobile"
                                                    value={user.mobile}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label htmlFor="password">
                                                    <h6>Password</h6>
                                                </label>
                                                <input
                                                    id="password"
                                                    placeholder="Password"
                                                    className="form-control"
                                                    type="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={handlePassword}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label htmlFor="repeat-password">
                                                    <h6>Repeat Password</h6>
                                                </label>
                                                <input
                                                    id="repeat-password"
                                                    placeholder="Repeat Password"
                                                    className="form-control"
                                                    type="password"
                                                    name="repeatPassword"
                                                    value={repeatPassword}
                                                    onChange={
                                                        handleRepeatPassword
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {!passwordMatch && (
                                            <p className="text-danger mx-2">
                                                Password do not match
                                            </p>
                                        )}
                                        <div className="row m-0 p-0">
                                            <div className="col-md-4 p-2 .sign-up-bg-color">
                                                <button
                                                    disabled={!passwordMatch}
                                                    className="btn mt-3 w-100 bg-primary text-white"
                                                >
                                                    Sign Up
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="row m-0 p-0">
                                        <div className="col-md-4 p-2">
                                            <Link to="/">
                                                <button className="btn mt-3 w-100  bg-primary text-white">
                                                    Back to HomePage
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="col-md-4 p-2 mt-4 .sign-up-bg-color">
                                            <p>
                                                Already got an account ?{" "}
                                                <Link to="/login">
                                                    <a className=" mt-3 register-login">
                                                        Log in
                                                    </a>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {registrationComplete && (
                                    <p className="fs-4 text-secondary">
                                        Registration Successful.
                                        <p>
                                            Go to{" "}
                                            <Link to="/login">
                                                <span className="text-primary">
                                                    Log in
                                                </span>
                                            </Link>{" "}
                                            page
                                        </p>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
