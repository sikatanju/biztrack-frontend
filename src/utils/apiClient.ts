import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://inventory-api.teamrabbil.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["token"] = token;
        }

        return config;
    },
    (error) => {
        console.log(error);
    }
);

export default apiClient;
