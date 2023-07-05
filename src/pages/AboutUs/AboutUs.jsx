import React from 'react'
import './style.css'
import image5 from '../../assets/Amany.jpg'
import imag1 from '../../assets/montaser.jpg'
import imag2 from '../../assets/omar.jpg'
import imag3 from '../../assets/mostafa.jpg'
import imag4 from '../../assets/muhammed .jpg'

import { FaLinkedin } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { FaEnvelope } from 'react-icons/fa';


function AboutUs() {
    return (

        <section className="team">
            <div className="container">
                <div className="center">
                    <h1>Our Team</h1>
                    <p className='desc'> five talents web developers  <pre />we are the gradustes ITI 9-month program open source application developnment
                    </p>
                </div>

                <div className="team-content">
                    <div className="box">
                        <img src={imag1} alt="Team Member 1" />
                        <h3>Montaser Hassan</h3>
                        <h5>software Engineer</h5>
                        <div className="icons">
                            <a href="https://www.linkedin.com/in/montaser-hassan/"><FaLinkedin size={20} /></a>
                            <a href="https://github.com/MontaserHassan"><AiFillGithub size={20} /></a>
                            <a href="montaser.mohamed.hassan@gmail.com"><FaEnvelope size={20} /></a>
                        </div>
                    </div>

                    <div className="box">
                        <img src={imag2} alt="Team Member 2" />
                        <h3>Omar Hesham</h3>
                        <h5>software Engineer</h5>
                        <div className="icons">
                            <a href="https://www.linkedin.com/in/omar-hesham-elhariry/"><FaLinkedin size={20} /></a>
                            <a href="https://github.com/OmarHesham11"><AiFillGithub size={20} /></a>
                            <a href="#"><FaEnvelope size={20} /></a>
                        </div>
                    </div>

                    <div className="box">
                        <img src={imag4} alt="Team Member 3" />
                        <h3>Mohamed Adel</h3>
                        <h5>software Engineer</h5>
                        <div className="icons">
                            <a href="https://www.linkedin.com/in/muhammed-elshall/"><FaLinkedin size={20} /></a>
                            <a href="https://github.com/mhamdadel"><AiFillGithub size={20} /></a>
                            <a href="#"><FaEnvelope size={20} /></a>
                        </div>
                    </div>

                    <div className="box">
                        <img src={imag3} alt="Team Member 4" />
                        <h3>Mostafa Ramadan</h3>
                        <h5>software Engineer</h5>
                        <div className="icons">
                            <a href="https://www.linkedin.com/in/mustafaramadan165/"><FaLinkedin size={20} /></a>
                            <a href="https://github.com/MustafaRamadan1"><AiFillGithub size={20} /></a>
                            <a href="mustafa.ramadan165@gmail.com"><FaEnvelope size={20} /></a>
                        </div>
                    </div>

                    <div className="box">
                        <img src={image5} alt="Team Member 4" />
                        <h3>Amany khaled</h3>
                        <h5>software Engineer</h5>
                        <div className="icons">
                            <a href="https://www.linkedin.com/in/amany-khaled-mohamed/"> <FaLinkedin size={20} /></a>
                            <a href="https://github.com/Amanikhaled"><AiFillGithub size={20} /></a>
                            <a href="#"><FaEnvelope size={20} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs