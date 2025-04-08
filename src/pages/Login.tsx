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
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);

        if (email && password) {
            console.log(email + " " + password);
            apiClient
                .post("/user-login", {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    if (res.data.status === "success") {
                        localStorage.setItem("token", res.data.token);
                        navigate("/dashboard");
                    } else if (res.data.status === "failed") {
                        setError(true);
                        setErrorMessage(
                            "Email or Password is incorrect! Please try again."
                        );
                    }
                })
                .catch((e) => {
                    console.log(e);
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
                                    type="email"
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
