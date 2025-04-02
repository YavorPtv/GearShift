import { Link } from "react-router";
import "./AboutUs.css";

export default function AboutUs() {
    return (
        <section className="about-container">
            <div className="about-content">
                <h1 className="about-title">Welcome to GearShift 🚗⚙️</h1>
                <p className="about-text">
                    GearShift is more than just a website—it's a <strong>community</strong> for car enthusiasts! Whether you're into <strong>classic cars, modern supercars, JDM legends, or rugged off-roaders</strong>, GearShift is the place to explore and discuss your favorite vehicles.
                </p>
                
                <h2 className="about-subtitle">What Can You Do on GearShift?</h2>
                <ul className="about-list">
                    <li>🔍 <strong>Discover</strong> and browse a collection of cars shared by users.</li>
                    <li>💬 <strong>Engage</strong> in discussions and share your thoughts about different models.</li>
                    <li>👍👎 <strong>Like or Dislike</strong> cars to show your appreciation or critique.</li>
                    <li>📸 <strong>Share your own cars</strong> and receive feedback from the community.</li>
                </ul>

                <h2 className="about-subtitle">Why GearShift?</h2>
                <p className="about-text">
                    We created GearShift to bring <strong>car lovers together</strong>—a place where you can <strong>connect, debate, and appreciate</strong> all things automotive.  
                    Whether you're here to <strong>learn, showcase, or just admire</strong>, GearShift is the ultimate <strong>pit stop</strong> for car enthusiasts!
                </p>

                <p className="about-text">Ready to hit the road? Join the GearShift community today!</p>
                <Link to="/register" className="welcome-btn">Join the community!</Link>
            </div>
        </section>
    );
}
