import { Link } from "react-router";

const Register = () => {
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-10 center-screen">
                        <div className="card animated fadeIn w-100 p-3">
                            <div className="card-body">
                                <h4>Sign Up Form</h4>
                                <hr />
                                <div className="container-fluid m-0 p-0">
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
                                            />
                                        </div>
                                    </div>
                                    <div className="row m-0 p-0">
                                        <div className="col-md-4 p-2">
                                            <label>
                                                <h6>Repeat Password</h6>
                                            </label>
                                            <input
                                                id="password"
                                                placeholder="Password"
                                                className="form-control"
                                                type="password"
                                            />
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>
                                                <h6>Password</h6>
                                            </label>
                                            <input
                                                id="password"
                                                placeholder="Repeat Password"
                                                className="form-control"
                                                type="password"
                                            />
                                        </div>
                                    </div>
                                    <div className="row m-0 p-0">
                                        <div className="col-md-4 p-2 .sign-up-bg-color">
                                            <button className="btn mt-3 w-100 bg-primary text-white">
                                                Sign Up
                                            </button>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <Link to="/">
                                                <button
                                                    // onclick="window.location.href='dashboard.html'"
                                                    className="btn mt-3 w-100  bg-primary text-white"
                                                >
                                                    Back to HomePage
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="row m-0 p-0">
                                        <div className="col-md-4 p-2 .sign-up-bg-color">
                                            <p>
                                                Already got an account ?{" "}
                                                <Link to="/login">
                                                    <a className="mt-3 register-login">
                                                        Log in
                                                    </a>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
