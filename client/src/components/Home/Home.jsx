export default function Home() {
    return (
        <section id="home" className="welcome-hero">
            <div className="container">
                <div className="welcome-hero-txt">
                    <h2>Shift Into High Gear</h2>
                    <p>Discover, showcase, and discuss the world's best rides.</p>
                    <button className="welcome-btn" href="/catalog">
                        Explore cars
                    </button>
                    <button className="welcome-btn" href="/register">
                        Join the Community
                    </button>
                </div>
            </div>
        </section>
    );
}