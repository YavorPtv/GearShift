import { NavLink } from "react-router";

export default function Navigation() {
    const navItems = [
        { name: 'Home', to: '/', exact: true },
        { name: 'Catalog', to: '/cars' },
        { name: 'Add Post', to: '/cars/create' },
        { name: 'Profile', to: '#featured-cars' },
        { name: 'Contacts', to: '#contact' },
        { name: 'Log In', to: '#contact' },
        { name: 'Sign In', to: '#contact' }
    ];

    return (
        <div className="top-area">
            <div className="header-area">
                {/* Start Navigation */}
                <nav className="navbar navbar-default bootsnav navbar-sticky navbar-scrollspy">
                    <div className="container">
                        {/* Start Header Navigation */}
                        <div className="navbar-header">
                            <button
                                type="button"
                                className="navbar-toggle"
                                data-toggle="collapse"
                                data-target="#navbar-menu"
                            >
                                <i className="fa fa-bars" />
                            </button>
                            <a className="navbar-brand" href="/">
                                gearshift
                                <span />
                            </a>
                        </div>
                        {/*/.navbar-header*/}

                        {/* Navbar Links */}
                        <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu">
                            <ul className="nav navbar-nav navbar-right">
                                {navItems.map((item, index) => (
                                    <li key={index} className="scroll">
                                        <NavLink
                                            to={item.to}
                                            exact={item.exact}
                                            className="nav-link"
                                            activeClassName="active"
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
                {/*/nav*/}
                {/* End Navigation */}
            </div>
            {/*/.header-area*/}
            <div className="clearfix" />
        </div>
        /* /.top-area */
    );
}
