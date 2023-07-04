import './footer.css';


function Footer() {
    return (
        <>
            <footer className="deneb_footer">
                <div className="widget_wrapper" >

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="widget widegt_about">
                                    <div className="widget_title">
                                        <h4>House<span className='text-warning'>Hunters</span></h4>
                                    </div>

                                    <ul className="social">
                                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="widget widget_link">
                                    <div className="widget_title">
                                        <h4>Links</h4>
                                    </div>
                                    <ul>
                                        <li><a href="#">About Us</a></li>
                                        <li><a href="#">Services</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="widget widget_contact">
                                    <div className="widget_title">
                                        <h4>Contact Us</h4>
                                    </div>
                                    <div className="contact_info">
                                        <div className="single_info">
                                            <div className="icon">
                                                <i className="fas fa-phone-alt"></i>
                                            </div>
                                            <div className="info">
                                                <p><a href="tel:+919246147999">1800-121-3637</a></p>
                                            </div>
                                        </div>

                                        <div className="single_info">
                                            <div className="icon">
                                                <i className="fas fa-envelope"></i>
                                            </div>
                                            <div className="info">
                                                <p><a href="/contactUs">contact Us</a></p>
                                            </div>
                                        </div>

                                        <div className="single_info">
                                            <div className="icon">
                                                <i className="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div className="info">
                                                <p>125, Park street aven, Brocklyn,<span>Newyork.</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copyright_area rounded-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="copyright_text">
                                    <p>Copyright &copy; 2023 All rights reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer;