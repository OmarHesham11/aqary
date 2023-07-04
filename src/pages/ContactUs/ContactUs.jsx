import React from 'react'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import './style.css';
function ContactUs() {

    const form = useRef();
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_acbolqe', 'template_jk3cdss', form.current, 'YOa0hgN-BepcGSHyw')
            .then(
                (result) => {
                    setIsEmailSent(true);
                    setErrorMessage('');
                },
                (error) => {
                    setErrorMessage('An error occurred while sending the email. Please try again.');
                }
            );
        e.target.reset();
    };

    return (
        <section className="vh-100 bg-image">

            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-5">
                                    {isEmailSent ? ( // Display the success message if isEmailSent is true
                                        <div className="alert alert-success mb-4" role="alert" style={{ backgroundColor: 'green' }}>
                                            Email sent successfully!
                                        </div>
                                    ) : null}

                                    {errorMessage && ( // Display the error message if it is not empty
                                        <div className="alert alert-danger mb-4" role="alert">
                                            {errorMessage}
                                        </div>
                                    )}
                                    <h2 className="text-uppercase text-center mb-5">Contact Us</h2>
                                    <form ref={form} onSubmit={sendEmail} className="cart">
                                        <div className="form-outline mb-4">
                                            <input type="text" className="form-outline mb-4" placeholder="Full Name" name="user_name" required />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="email" placeholder='Email' name="user_email" className="form-control form-control-lg" />

                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="text" className="form-outline mb-4" placeholder="Subject" name="user_subject" required />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <textarea className="form-outline mb-4" placeholder="Message" name="message" rows="5" required></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-warning">Send Message</button>
                                    </form>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section >

    )
}

export default ContactUs;