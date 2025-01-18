import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email && password) {
            console.log(email + " " + password);
            axios
                .post("https://inventory-api.teamrabbil.com/api/user-login", {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    return (
        <div>
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
        </div>
    );
};

export default Login;
