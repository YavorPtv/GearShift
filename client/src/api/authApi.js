import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";
import useAuth from "../hooks/useAuth";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/users`;

export const useLogin = () => {
    // const abortRef = useRef(new AbortController());

    const login = async (email, password) => 
        request.post(
            `${baseUrl}/login`,
            { email, password },
            // { signal: abortRef.current.signal }
        );

    // useEffect(() => {
    //     const abortController = abortRef.current;

    //     return () => abortController.abort();  
    // }, []);

    return {
        login,
    }
};

export const useRegister = () => {
    const register = (username, email, password) => 
        request.post(`${baseUrl}/register`, { username, email, password });

    return {
        register,
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