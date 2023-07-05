import main from '../../assets/main.png';
import about from '../../assets/about.jpg';
import home from '../../assets/home-1.jpg';
import Cart from '../../components/Cart';

function Home() {
    return (
        <>
            <div id="carouselExampleSlidesOnly" className="carousel slide m-0 p-0" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={main} className="d-block w-100 " alt="..." />
                        <div className="carousel-caption">
                            <h5>Find your home with the people you trust</h5>
                            <p>Sell your dated house for the best price in an auction</p>
                        </div>
                    </div>
                </div>
            </div>
            <section className="p-5" id="about-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-12 d-flex align-items-center">
                            <div className="about-img">
                                <img alt="" className="img-fluid" src={about} />
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12 col-12 ps-lg-5 mt-md-5">
                            <div className="about-text">
                                <h2>We Provide the Best Quality<br />Services Ever</h2>
                                <p>Discover the difference of working with a trusted real estate agency. Contact us today to learn more about our services and how we can assist you in achieving your real estate objectives. Your dream property awaits!</p>
                                <a className="btn btn-warning" href="#">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-5" id="value-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg col-md-12 col-12">
                            <div className="about-text">
                                <h2>Value We Give To You</h2>
                                <p>We are always ready to help by providing the best service for you. We believe that a good place to live can make your life better with the best interest rates in the market.</p>
                            </div>
                        </div>
                        <div className="col-lg col-md-12 col-12 d-flex align-items-center justify-content-center">
                            <div className="about-img">
                                <img alt="" src={home} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-5" id="get-started-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12 ps-lg-5 mt-md-5">
                            <div className="get-started">
                                <h2>Get Started with HouseHuntur</h2>
                                <p>Subscribe and find super attractive price quotes from us, find your residence soon.</p>
                                <div className="payment">
                                    <Cart amount={100} description={"WALLET"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
