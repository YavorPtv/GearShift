import Navigation from "./components/Navigation/Navigation";
import Search from "./components/Search/Search";


export default function App() {

    return (
        <>
            <section id="home" className="welcome-hero">
                {/* top-area Start */}
                    <Navigation />
                {/* top-area End */}
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
                <Search />
            </section>
            
            {/*featured-cars start */}
            <section id="featured-cars" className="featured-cars">
                <div className="container">
                    <div className="section-header">
                        <p>
                            checkout <span>the</span> featured cars
                        </p>
                        <h2>featured cars</h2>
                    </div>
                    {/*/.section-header*/}
                    <div className="featured-cars-content">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="single-featured-cars">
                                    <div className="featured-img-box">
                                        <div className="featured-cars-img">
                                            <img src="assets/images/featured-cars/fc1.png" alt="cars" />
                                        </div>
                                        <div className="featured-model-info">
                                            <p>
                                                model: 2017
                                                <span className="featured-mi-span"> 3100 mi</span>
                                                <span className="featured-hp-span"> 240HP</span>
                                                automatic
                                            </p>
                                        </div>
                                    </div>
                                    <div className="featured-cars-txt">
                                        <h2>
                                            <a href="#">BMW 6-series gran coupe</a>
                                        </h2>
                                        <h3>$89,395</h3>
                                        <p>
                                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                            amet, consectetur, adipisci velit, sed quia non.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="single-featured-cars">
                                    <div className="featured-img-box">
                                        <div className="featured-cars-img">
                                            <img src="assets/images/featured-cars/fc2.png" alt="cars" />
                                        </div>
                                        <div className="featured-model-info">
                                            <p>
                                                model: 2017
                                                <span className="featured-mi-span"> 3100 mi</span>
                                                <span className="featured-hp-span"> 240HP</span>
                                                automatic
                                            </p>
                                        </div>
                                    </div>
                                    <div className="featured-cars-txt">
                                        <h2>
                                            <a href="#">
                                                chevrolet camaro <span>wmv20</span>
                                            </a>
                                        </h2>
                                        <h3>$66,575</h3>
                                        <p>
                                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                            amet, consectetur, adipisci velit, sed quia non.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="single-featured-cars">
                                    <div className="featured-img-box">
                                        <div className="featured-cars-img">
                                            <img src="assets/images/featured-cars/fc3.png" alt="cars" />
                                        </div>
                                        <div className="featured-model-info">
                                            <p>
                                                model: 2017
                                                <span className="featured-mi-span"> 3100 mi</span>
                                                <span className="featured-hp-span"> 240HP</span>
                                                automatic
                                            </p>
                                        </div>
                                    </div>
                                    <div className="featured-cars-txt">
                                        <h2>
                                            <a href="#">
                                                lamborghini <span>v520</span>
                                            </a>
                                        </h2>
                                        <h3>$125,250</h3>
                                        <p>
                                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                            amet, consectetur, adipisci velit, sed quia non.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="single-featured-cars">
                                    <div className="featured-img-box">
                                        <div className="featured-cars-img">
                                            <img src="assets/images/featured-cars/fc4.png" alt="cars" />
                                        </div>
                                        <div className="featured-model-info">
                                            <p>
                                                model: 2017
                                                <span className="featured-mi-span"> 3100 mi</span>
                                                <span className="featured-hp-span"> 240HP</span>
                                                automatic
                                            </p>
                                        </div>
                                    </div>
                                    <div className="featured-cars-txt">
                                        <h2>
                                            <a href="#">
                                                audi <span> a3</span> sedan
                                            </a>
                                        </h2>
                                        <h3>$95,500</h3>
                                        <p>
                                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                            amet, consectetur, adipisci velit, sed quia non.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="single-featured-cars">
                                    <div className="featured-img-box">
                                        <div className="featured-cars-img">
                                            <img src="assets/images/featured-cars/fc4.png" alt="cars" />
                                        </div>
                                        <div className="featured-model-info">
                                            <p>
                                                model: 2017
                                                <span className="featured-mi-span"> 3100 mi</span>
                                                <span className="featured-hp-span"> 240HP</span>
                                                automatic
                                            </p>
                                        </div>
                                    </div>
                                    <div className="featured-cars-txt">
                                        <h2>
                                            <a href="#">
                                                infiniti <span>z5</span>
                                            </a>
                                        </h2>
                                        <h3>$36,850</h3>
                                        <p>
                                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                            amet, consectetur, adipisci velit, sed quia non.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="single-featured-cars">
                                    <div className="featured-img-box">
                                        <div className="featured-cars-img">
                                            <img src="assets/images/featured-cars/fc5.png" alt="cars" />
                                        </div>
                                        <div className="featured-model-info">
                                            <p>
                                                model: 2017
                                                <span className="featured-mi-span"> 3100 mi</span>
                                                <span className="featured-hp-span"> 240HP</span>
                                                automatic
                                            </p>
                                        </div>
                                    </div>
                                    <div className="featured-cars-txt">
                                        <h2>
                                            <a href="#">
                                                porsche <span>718</span> cayman
                                            </a>
                                        </h2>
                                        <h3>$48,500</h3>
                                        <p>
                                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                            amet, consectetur, adipisci velit, sed quia non.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="single-featured-cars">
                                    <div className="featured-img-box">
                                        <div className="featured-cars-img">
                                            <img src="assets/images/featured-cars/fc7.png" alt="cars" />
                                        </div>
                                        <div className="featured-model-info">
                                            <p>
                                                model: 2017
                                                <span className="featured-mi-span"> 3100 mi</span>
                                                <span className="featured-hp-span"> 240HP</span>
                                                automatic
                                            </p>
                                        </div>
                                    </div>
                                    <div className="featured-cars-txt">
                                        <h2>
                                            <a href="#">
                                                <span>bmw 8-</span>series coupe
                                            </a>
                                        </h2>
                                        <h3>$56,000</h3>
                                        <p>
                                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                            amet, consectetur, adipisci velit, sed quia non.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="single-featured-cars">
                                    <div className="featured-img-box">
                                        <div className="featured-cars-img">
                                            <img src="assets/images/featured-cars/fc8.png" alt="cars" />
                                        </div>
                                        <div className="featured-model-info">
                                            <p>
                                                model: 2017
                                                <span className="featured-mi-span"> 3100 mi</span>
                                                <span className="featured-hp-span"> 240HP</span>
                                                automatic
                                            </p>
                                        </div>
                                    </div>
                                    <div className="featured-cars-txt">
                                        <h2>
                                            <a href="#">
                                                BMW <span> x</span>series-6
                                            </a>
                                        </h2>
                                        <h3>$75,800</h3>
                                        <p>
                                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                            amet, consectetur, adipisci velit, sed quia non.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*/.container*/}
            </section>
            {/*/.featured-cars*/}
            {/*featured-cars end */}
            
            {/*contact start*/}
            <footer id="contact" className="contact">
                <div className="container">
                    <div className="footer-top">
                        <div className="row">
                            <div className="col-md-3 col-sm-6">
                                <div className="single-footer-widget">
                                    <div className="footer-logo">
                                        <a href="index.html">carvilla</a>
                                    </div>
                                    <p>
                                        Ased do eiusm tempor incidi ut labore et dolore magnaian aliqua.
                                        Ut enim ad minim veniam.
                                    </p>
                                    <div className="footer-contact">
                                        <p>info@themesine.com</p>
                                        <p>+1 (885) 2563154554</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-6">
                                <div className="single-footer-widget">
                                    <h2>about devloon</h2>
                                    <ul>
                                        <li>
                                            <a href="#">about us</a>
                                        </li>
                                        <li>
                                            <a href="#">career</a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                terms <span> of service</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">privacy policy</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-xs-12">
                                <div className="single-footer-widget">
                                    <h2>top brands</h2>
                                    <div className="row">
                                        <div className="col-md-7 col-xs-6">
                                            <ul>
                                                <li>
                                                    <a href="#">BMW</a>
                                                </li>
                                                <li>
                                                    <a href="#">lamborghini</a>
                                                </li>
                                                <li>
                                                    <a href="#">camaro</a>
                                                </li>
                                                <li>
                                                    <a href="#">audi</a>
                                                </li>
                                                <li>
                                                    <a href="#">infiniti</a>
                                                </li>
                                                <li>
                                                    <a href="#">nissan</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-5 col-xs-6">
                                            <ul>
                                                <li>
                                                    <a href="#">ferrari</a>
                                                </li>
                                                <li>
                                                    <a href="#">porsche</a>
                                                </li>
                                                <li>
                                                    <a href="#">land rover</a>
                                                </li>
                                                <li>
                                                    <a href="#">aston martin</a>
                                                </li>
                                                <li>
                                                    <a href="#">mersedes</a>
                                                </li>
                                                <li>
                                                    <a href="#">opel</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-offset-1 col-md-3 col-sm-6">
                                <div className="single-footer-widget">
                                    <h2>news letter</h2>
                                    <div className="footer-newsletter">
                                        <p>Subscribe to get latest news update and informations</p>
                                    </div>
                                    <div className="hm-foot-email">
                                        <div className="foot-email-box">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Add Email"
                                            />
                                        </div>
                                        {/*/.foot-email-box*/}
                                        <div className="foot-email-subscribe">
                                            <span>
                                                <i className="fa fa-arrow-right" />
                                            </span>
                                        </div>
                                        {/*/.foot-email-icon*/}
                                    </div>
                                    {/*/.hm-foot-email*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <div className="row">
                            <div className="col-sm-6">
                                <p>
                                    © copyright.designed and developed by{" "}
                                    <a href="https://www.themesine.com/">themesine</a>.
                                </p>
                                {/*/p*/}
                            </div>
                            <div className="col-sm-6">
                                <div className="footer-social">
                                    <a href="#">
                                        <i className="fa fa-facebook" />
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-instagram" />
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-linkedin" />
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-pinterest-p" />
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-behance" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*/.footer-copyright*/}
                </div>
                {/*/.container*/}
                
            </footer>
            {/*/.contact*/}
        </>

    )
}