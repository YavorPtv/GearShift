import { Link, NavLink } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function Navigation() {
    const isAuth = !!useUserContext().accessToken;

    const navItems = [
        { name: 'Home', to: '/' },
        { name: 'Catalog', to: '/cars' },
        { name: 'Contacts', to: '/contacts' },
    ];

    const authItems = [
        { name: 'Add Post', to: '/cars/create' },
        { name: 'Profile', to: '/profile' },
        { name: 'Logout', to: '/logout' },
    ];

    const guestItems = [
        { name: 'Login', to: '/login' },
        { name: 'Register', to: '/register' },
    ];

    return (
        <div className="top-area">
            <div className="header-area">
                <nav className="navbar navbar-default bootsnav navbar-sticky navbar-scrollspy">
                    <div className="container">
                        <div className="navbar-header">
                            <button
                                type="button"
                                className="navbar-toggle"
                                data-toggle="collapse"
                                data-target="#navbar-menu"
                            >
                                <i className="fa fa-bars" />
                            </button>
                            <Link className="navbar-brand" to="/">
                                gearshift
                                <span />
                            </Link>
                        </div>

                        <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu">
                            <ul className="nav navbar-nav navbar-right">
                                {navItems.map((item, index) => (
                                    <li key={index} className="scroll">
                                        <NavLink
                                            to={item.to}
                                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))}

                                {isAuth
                                    ? authItems.map((item, index) => (
                                        <li key={index} className="scroll">
                                            <NavLink
                                                to={item.to}
                                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                            >
                                                {item.name}
                                            </NavLink>
                                        </li>
                                    ))
                                    : guestItems.map((item, index) => (
                                        <li key={index} className="scroll">
                                            <NavLink
                                                to={item.to}
                                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                            >
                                                {item.name}
                                            </NavLink>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="clearfix" />
        </div>
    );
}
