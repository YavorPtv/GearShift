import request from "../utils/request";
import useAuth from "../hooks/useAuth";
import { useOptimistic } from "react";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/users`;

export const useLogin = () => {
    // const abortRef = useRef(new AbortController());
    const [isLoading, setIsLoading] = useOptimistic(false);

    const login = async (email, password) => {
        setIsLoading(true); // Start loading

        try {
            return await request.post(`${baseUrl}/login`, { email, password });
        } finally {
            setIsLoading(false); // Stop loading (runs whether success or error)
        }
    };

    // useEffect(() => {
    //     const abortController = abortRef.current;

    //     return () => abortController.abort();  
    // }, []);

    return {
        login,
        isLoading,
    }
};

export const useRegister = () => {
    const [isLoading, setIsLoading] = useOptimistic(false);
    const register = async (username, email, password) =>{
        setIsLoading(true);
        try {
            return await request.post(`${baseUrl}/register`, { username, email, password });
        } finally {
            setIsLoading(false);
        }
    }

    return {
        register,
        isLoading
    }
};

export const useLogout = () => {
    const { request, isAuthenticated } = useAuth();

    const logout = async () => request.get(`${baseUrl}/logout`);

    return {
        logout,
        isAuthenticated
    };
};