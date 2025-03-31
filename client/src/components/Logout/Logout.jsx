import { useNavigate } from "react-router";
import { useLogout } from "../../api/authApi";
import { useEffect, useRef } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

export default function Logout() {
    const navigate = useNavigate();
    const { userLogoutHandler } = useUserContext();
    const { logout, isAuthenticated } = useLogout();
    const hasLoggedOut = useRef(false);

    useEffect(() => {
        (async () => {
            if (hasLoggedOut.current) return; 
            hasLoggedOut.current = true;
            try {
                await logout();
                navigate(-1);
                toast.success('Successfully logged out!');
            } catch (err) {
                toast.error(err.message);
            }
            finally {
                userLogoutHandler();
            }
        })()
    }, [logout, userLogoutHandler, navigate])

    return (
        <>
            {isAuthenticated && <Spinner /> //TODO: spinner 
            }
        </>
    )
}