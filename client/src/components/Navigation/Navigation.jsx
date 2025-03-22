export default function Navigation() {
    return (
        <>
            <div className="top-area">
                <div className="header-area">
                    {/* Start Navigation */}
                    <nav
                        className="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy"
                        data-minus-value-desktop={70}
                        data-minus-value-mobile={55}
                        data-speed={1000}
                    >
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
                            {/* End Header Navigation */}
                            {/* Collect the nav links, forms, and other content for toggling */}
                            <div
                                className="collapse navbar-collapse menu-ui-design"
                                id="navbar-menu"
                            >
                                <ul
                                    className="nav navbar-nav navbar-right"
                                    data-in="fadeInDown"
                                    data-out="fadeOutUp"
                                >
                                    <li className=" scroll active">
                                        <a href="/">home</a>
                                    </li>
                                    <li className="scroll">
                                        <a href="/cars">catalog</a>
                                    </li>
                                    <li className="scroll">
                                        <a href="#new-cars">add post</a>
                                    </li>
                                    <li className="scroll">
                                        <a href="#featured-cars">profile</a>
                                    </li>
                                    <li className="scroll">
                                        <a href="#contact">contacts</a>
                                    </li>
                                    <li className="scroll">
                                        <a href="#contact">log in</a>
                                    </li>
                                    <li className="scroll">
                                        <a href="#contact">sign in</a>
                                    </li>
                                </ul>
                                {/*/.nav */}
                            </div>
                            {/* /.navbar-collapse */}
                        </div>
                        {/*/.container*/}
                    </nav>
                    {/*/nav*/}
                    {/* End Navigation */}
                </div>
                {/*/.header-area*/}
                <div className="clearfix" />
            </div>
            {/* /.top-area*/}
        </>

    )
}