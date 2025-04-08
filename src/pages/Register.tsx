/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import apiClient from "../utils/apiClient";

const Register = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState<string | undefined>();
    const [lastName, setLastName] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [mobile, setMobile] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [repeatPassword, setRepeatPassword] = useState<string | undefined>();
    const [registrationComplete, setRegistrationComplete] = useState(false);

    const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };
    const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMobile(e.target.value);
    };

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

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        apiClient
            .post("/user-registration", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                mobile: mobile,
            })
            .then((res) => {
                if (res.data.status === "failed") {
                    setRegistrationComplete(true);
                    handleNavigation();
                } else if (res.data.status === "success") {
                    setRegistrationComplete(true);
                    navigate("/login");
                }
            })
            .catch((e) => console.log(e.message));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
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
                                                <label>
                                                    <h6>First Name</h6>
                                                </label>
                                                <input
                                                    id="firstName"
                                                    placeholder="First Name"
                                                    className="form-control"
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) =>
                                                        handleFirstName(e)
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>
                                                    <h6>Last Name</h6>
                                                </label>
                                                <input
                                                    id="lastName"
                                                    placeholder="Last Name"
                                                    className="form-control"
                                                    type="text"
                                                    value={lastName}
                                                    onChange={(e) =>
                                                        handleLastName(e)
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="row m-0 p-0">
                                            <div className="col-md-4 p-2">
                                                <label>
                                                    <h6>Email Address</h6>
                                                </label>
                                                <input
                                                    id="email"
                                                    placeholder="User Email"
                                                    className="form-control"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        handleEmail(e)
                                                    }
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-4 p-2">
                                                <label>
                                                    <h6>Mobile Number</h6>
                                                </label>
                                                <input
                                                    id="mobile"
                                                    placeholder="Mobile"
                                                    className="form-control"
                                                    type="mobile"
                                                    value={mobile}
                                                    onChange={(e) =>
                                                        handleMobile(e)
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row m-0 p-0">
                                            <div className="col-md-4 p-2">
                                                <label>
                                                    <h6>Password</h6>
                                                </label>
                                                <input
                                                    id="password"
                                                    placeholder="Password"
                                                    className="form-control"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) =>
                                                        handlePassword(e)
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>
                                                    <h6>Repeat Password</h6>
                                                </label>
                                                <input
                                                    id="repeat-password"
                                                    placeholder="Repeat Password"
                                                    className="form-control"
                                                    type="password"
                                                    value={repeatPassword}
                                                    onChange={(e) =>
                                                        handleRepeatPassword(e)
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
