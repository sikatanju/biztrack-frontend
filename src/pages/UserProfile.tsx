/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";

const UserProfile = () => {
    const [firstName, setFirstName] = useState<string | undefined>();
    const [lastName, setLastName] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [mobile, setMobile] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

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

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    };

    useEffect(() => {
        apiClient
            .get("/user-profile")
            .then((res) => {
                if (res.data.status === "success") {
                    const data = res.data.data;
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setEmail(data.email);
                    setMobile(data.mobile);
                    setPassword(data.password);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div id="contentRef" className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <div className="card animated fadeIn w-100 p-3">
                                <div className="card-body">
                                    <h4>
                                        {firstName
                                            ? `${firstName}'s Profile`
                                            : "User Profile"}
                                    </h4>
                                    <hr />
                                    <div className="container-fluid m-0 p-0">
                                        <div className="row m-0 p-0">
                                            <div className="col-md-4 p-2">
                                                <label>Email Address</label>
                                                <input
                                                    readOnly
                                                    id="email"
                                                    placeholder="User Email"
                                                    className="form-control"
                                                    type="email"
                                                    value={email}
                                                    onChange={handleEmail}
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>First Name</label>
                                                <input
                                                    id="firstName"
                                                    placeholder="First Name"
                                                    className="form-control"
                                                    type="text"
                                                    value={firstName}
                                                    onChange={handleFirstName}
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>Last Name</label>
                                                <input
                                                    id="lastName"
                                                    placeholder="Last Name"
                                                    className="form-control"
                                                    type="text"
                                                    value={lastName}
                                                    onChange={handleLastName}
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>Mobile Number</label>
                                                <input
                                                    id="mobile"
                                                    placeholder="Mobile"
                                                    className="form-control"
                                                    type="mobile"
                                                    value={mobile}
                                                    onChange={handleMobile}
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>Password</label>
                                                <input
                                                    id="password"
                                                    placeholder="User Password"
                                                    className="form-control"
                                                    type="password"
                                                    value={password}
                                                    onChange={handlePassword}
                                                />
                                            </div>
                                        </div>
                                        <div className="row m-0 p-0">
                                            <div className="col-md-4 p-2">
                                                <button
                                                    onClick={() =>
                                                        console.log("hello")
                                                    }
                                                    className="btn mt-3 w-100  bg-gradient-primary"
                                                >
                                                    Update
                                                </button>
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

export default UserProfile;
