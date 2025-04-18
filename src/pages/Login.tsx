import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import apiClient from "../utils/apiClient";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            apiClient
                .post("auth/jwt/verify/", {
                    token: token.substring(3),
                })
                .then((res) => {
                    if (res.status === 200) {
                        console.log("Okay -- " + res);
                        navigate("/dashboard");
                    }
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                });
        }
    }, [navigate]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);

        if (email && password) {
            apiClient
                .post("auth/jwt/create", {
                    username: email,
                    password: password,
                })
                .then((res) => {
                    if (res.data.access && res.data.refresh) {
                        const token = "JWT " + res.data.access;
                        localStorage.setItem("token", token);
                        localStorage.setItem("refreshToken", res.data.refresh);
                    }
                    navigate("/dashboard");
                })
                .catch(() => {
                    setErrorMessage("Error Message");
                });
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 animated fadeIn col-lg-6 center-screen">
                    <div className="card w-90  p-4">
                        <div className="card-body">
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <h4>SIGN IN</h4>
                                <br />
                                <input
                                    id="email"
                                    placeholder="User Email"
                                    className="form-control"
                                    type="username"
                                    value={email}
                                    onChange={(e) => handleEmail(e)}
                                />
                                <br />
                                <input
                                    id="password"
                                    placeholder="User Password"
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(e) => handlePassword(e)}
                                />
                                <br />
                                <button
                                    type="submit"
                                    className="btn w-100 bg-primary text-white"
                                >
                                    Next
                                </button>
                            </form>
                            <hr />
                            {error && (
                                <div className="float-end mt-3">
                                    <span>
                                        <p className="text-center ms-3 h6 text-danger">
                                            {errorMessage}
                                        </p>
                                    </span>
                                </div>
                            )}
                            <div className="float-end mt-3">
                                <span>
                                    <Link to="/register">
                                        <a className="text-center ms-3 h6">
                                            Sign Up
                                        </a>
                                    </Link>
                                    <span className="ms-1">|</span>
                                    <a
                                        className="text-center ms-3 h6"
                                        href="sendOtp.html"
                                    >
                                        Forgot Password ?
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
