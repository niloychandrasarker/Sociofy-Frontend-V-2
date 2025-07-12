import axios from "axios";

export const API_BASE_URL = "http://localhost:5454";

const getJwtToken = () => localStorage.getItem("jwt");

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
    (config) => {
        const token = getJwtToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("jwt");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);