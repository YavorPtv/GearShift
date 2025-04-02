import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import "./Footer.css";

export default function Footer() {
    const { isAuthenticated } = useAuth();
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Logo & Description */}
                <div className="footer-column">
                    <Link to="/" className="footer-logo">GearShift</Link>
                    <p>Your go-to platform for exploring and listing cars.</p>
                </div>

                {/* Contact Info */}
                <div className="footer-column">
                    <h3>Contact</h3>
                    <div className="footer-contact">
                        <p>Email: <Link to="mailto:contact@gearshift.com">contact@gearshift.com</Link></p>
                        <p>Phone: <Link to="tel:+1234567890">0876567456</Link></p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <div className="footer-links">
                        <Link to="/cars">Browse Cars</Link>
                        <Link to="/about">About Us</Link>
                        {isAuthenticated 
                            ? <Link to="/cars/create">Create a Listing</Link>
                            : <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        }
                    </div>
                </div>

                {/* Social Media */}
                <div className="footer-column">
                    <h3>Follow Us</h3>
                    <div className="footer-social">
                        <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-facebook"></i>
                        </Link>
                        <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-instagram"></i>
                        </Link>
                        <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-linkedin"></i>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-copyright">
                <p>© {new Date().getFullYear()} GearShift. All rights reserved.</p>
            </div>
        </footer>
    );
}
