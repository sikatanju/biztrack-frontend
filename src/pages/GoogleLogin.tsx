import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GoogleLogin = () => {
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get("code");
        const state = query.get("state");

        console.log("code:", code);
        console.log("state:", state);

        axios
            .post("http://localhost:8000/api/auth/google/callback/", {
                code: code,
                redirect_uri: "http://localhost:8000/api/auth/google/callback/",
            })
            .then((res) => console.log(res.data))
            .catch((e) => console.log(e));
        // TODO: send `code` to your backend here
    }, [location.search]); // <-- add dependency

    return <div>Google Login Callback</div>;
};

export default GoogleLogin;
