/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
}

const UserProfile = () => {
    const [userData, setUserData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
    });

    const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));

        console.log(e.target.name);
    };

    const [updateMessage, setUpdateMessage] = useState<string | null>(null);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        apiClient
            .post("/user-update", {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                mobile: userData.mobile,
                password: userData.password,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.status === "success") {
                    setUpdateMessage("Profile has been updated successfully");
                    setTimeout(() => {
                        setUpdateMessage(null);
                    }, 2000);
                }
            })
            .catch((e) => {
                console.log(e.message);
            });
    };

    useEffect(() => {
        apiClient
            .get("/user-profile")
            .then((res) => {
                if (res.data.status === "success") {
                    const { firstName, lastName, email, mobile, password } =
                        res.data.data;
                    setUserData({
                        firstName,
                        lastName,
                        email,
                        mobile,
                        password,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div id="contentRef" className="content">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="card animated fadeIn w-100 p-3">
                            <div className="card-body">
                                <h4>User Profile</h4>
                                <hr />
                                <div className="container-fluid m-0 p-0">
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="row m-0 p-0">
                                            <div className="col-md-4 p-2">
                                                <label>Email Address</label>
                                                <input
                                                    readOnly
                                                    id="email"
                                                    placeholder="User Email"
                                                    className="form-control"
                                                    type="email"
                                                    value={userData.email}
                                                    onChange={
                                                        handleUserDataChange
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>First Name</label>
                                                <input
                                                    id="firstName"
                                                    placeholder="First Name"
                                                    className="form-control"
                                                    type="text"
                                                    name="firstName"
                                                    value={userData.firstName}
                                                    onChange={
                                                        handleUserDataChange
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>Last Name</label>
                                                <input
                                                    id="lastName"
                                                    placeholder="Last Name"
                                                    className="form-control"
                                                    type="text"
                                                    name="lastName"
                                                    value={userData.lastName}
                                                    onChange={
                                                        handleUserDataChange
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>Mobile Number</label>
                                                <input
                                                    id="mobile"
                                                    placeholder="Mobile"
                                                    className="form-control"
                                                    type="mobile"
                                                    name="mobile"
                                                    value={userData.mobile}
                                                    onChange={
                                                        handleUserDataChange
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>Password</label>
                                                <input
                                                    id="password"
                                                    placeholder="New Password"
                                                    className="form-control"
                                                    type="password"
                                                    name="password"
                                                    value={userData.password}
                                                    onChange={
                                                        handleUserDataChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="row m-0 p-0">
                                            <div className="col-md-4 p-2">
                                                <button className="btn mt-3 w-100  bg-primary text-white">
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                        {updateMessage && (
                                            <div className="row m-0 p-0">
                                                <p className="text-success">
                                                    {updateMessage}
                                                </p>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* <div className="card animated fadeIn w-100 p-3">
                            <div className="card-body">
                                <h4>Change Password</h4>
                                <hr />
                                <div className="container-fluid m-0 p-0">
                                    <div className="row m-0 p-0">
                                        <div className="col-md-4 p-2">
                                            <label>Old Password</label>
                                            <input
                                                id="password"
                                                placeholder="New Password"
                                                className="form-control"
                                                type="password"
                                                value={password}
                                                onChange={handlePassword}
                                            />
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>New Password</label>
                                            <input
                                                id="password"
                                                placeholder="New Password"
                                                className="form-control"
                                                type="password"
                                                value={password}
                                                onChange={handlePassword}
                                            />
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Repeat New Password</label>
                                            <input
                                                id="password"
                                                placeholder="New Password"
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
                                                disabled
                                                className="btn mt-3 w-100  bg-primary text-white"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
