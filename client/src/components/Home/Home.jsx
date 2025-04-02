import { Link } from "react-router";

export default function Home() {
    return (
        <section id="home" className="welcome-hero">
            <div className="container">
                <div className="welcome-hero-txt">
                    <h2>Shift Into High Gear</h2>
                    <p>Discover, showcase, and discuss the world's best rides.</p>
                    <Link to="/cars" className="welcome-btn">Explore cars</Link>
                    <Link to="/about" className="welcome-btn">About Us</Link>
                </div>
            </div>
        </section>
    );
}