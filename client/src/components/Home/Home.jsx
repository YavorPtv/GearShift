import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function Home() {
    const { isAuthenticated } = useAuth();
    return (
        <section id="home" className="welcome-hero">
            <div className="container">
                <div className="welcome-hero-txt">
                    <h2>Shift Into High Gear</h2>
                    <p>Discover, showcase, and discuss the world's best rides.</p>
                    <Link to="/cars" className="welcome-btn">Explore cars</Link>
                    {isAuthenticated
                        ? <Link to="/cars/create" className="welcome-btn">Create a Post</Link>
                        : <Link to="/about" className="welcome-btn">About Us</Link>
                    }
                </div>
            </div>
        </section>
    );
}