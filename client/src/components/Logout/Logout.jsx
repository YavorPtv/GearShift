import { Navigate } from "react-router";
import { useLogout } from "../../api/authApi";

export default function Logout() {
    const { isLoggedIn } = useLogout();
    return isLoggedIn
        ? null // spinner is better
        : <Navigate to="/" />
}