import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";

interface UserData {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    mobile: string;
}

const UserProfile = () => {
    const [userData, setUserData] = useState<UserData>({
        id: -1,
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
    });

    const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const [updateMessage, setUpdateMessage] = useState<string | null>(null);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        apiClient
            .put("auth/users/me/", {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                mobile: userData.mobile,
            })
            .then((res) => {
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
            .get("auth/users/me")
            .then((res) => {
                if (res.status  === 200)    {
                    const {
                        id,
                        username,
                        first_name,
                        last_name,
                        email,
                        mobile,
                    } = res.data;
                    setUserData({
                        id: id,
                        username: username,
                        email: email,
                        firstName: first_name,
                        lastName: last_name,
                        mobile: mobile,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
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
                                                <label htmlFor="username">
                                                    Username
                                                </label>
                                                <input
                                                    readOnly
                                                    id="username"
                                                    placeholder="User Email"
                                                    className="form-control"
                                                    type="text"
                                                    value={userData.username}
                                                    onChange={
                                                        handleUserDataChange
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label htmlFor="email">
                                                    Email Address
                                                </label>
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
                                                <label htmlFor="firstName">
                                                    First Name
                                                </label>
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
                                                <label htmlFor="lastName">
                                                    Last Name
                                                </label>
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
                                                <label htmlFor="mobile">
                                                    Mobile Number
                                                </label>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
