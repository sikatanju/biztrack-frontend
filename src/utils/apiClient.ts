import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = token;
        }

        return config;
    },
    (error) => {
        console.log(error);
    }
);

export default apiClient;
