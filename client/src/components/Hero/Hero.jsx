import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";

export default function Hero() {
    return (
        <section id="home" className="welcome-hero">
            <Navigation />
            <div className="container">
                <div className="welcome-hero-txt">
                    <h2>Shift Into High Gear</h2>
                    <p>Discover, showcase, and discuss the world's best rides.</p>
                    <button className="welcome-btn" href="window.location.href='#'">
                        Explore cars
                    </button>
                    <button className="welcome-btn" href="window.location.href='#'">
                        Join the Community
                    </button>
                </div>
            </div>
            {/* <Search /> */}
        </section>
    );
}