import axios from "axios";

export const BASE_URL = "http://localhost:5000";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export const setAuthHeader = (token, api) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
}

// --- NEW: Global Axios Interceptor ---
api.interceptors.response.use(
    (response) => {
        // If the request is successful, let it pass through to your Redux slice
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;
            // We check the error string because your Feign client wrapped the invalid token error inside a 500 status
            const errorText = JSON.stringify(error.response.data).toLowerCase();

            if (status === 401 || status === 403 || errorText.includes("invalid token")) {
                console.warn("Session expired. Logging out automatically.");
                
                // 1. Delete the bad token from the user's browser automatically
                localStorage.removeItem("jwt");
                
                // 2. Redirect them to the login page (Update "/" to "/login" if that is your login route)
                window.location.href = "/"; 
            }
        }
        return Promise.reject(error);
    }
);