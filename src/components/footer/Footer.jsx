import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TopShape from '../../images/ft-bg.png'
import logo from '../../images/footer-logo.svg'
import FtShape1 from '../../images/footer/bread-svgrepo-com.svg'
import FtShape2 from '../../images/footer/birthday-cake-svgrepo-com.svg'
import Btnicon from '../../images/pointer.svg'

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const styles = `
    .wpo-site-footer {
        background: linear-gradient(135deg, #2c5530 0%, #4a7c59 50%, #2c5530 100%);
        position: relative;
        overflow: hidden;
    }

    .wpo-upper-footer {
        background: rgba(76, 175, 80, 0.1);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(76, 175, 80, 0.3);
    }

    .wpo-lower-footer {
        background: rgba(46, 125, 50, 0.8);
    }

    .social-widget ul li a {
        transition: all 0.3s ease;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(76, 175, 80, 0.2);
        border: 2px solid #4CAF50;
    }

    .social-widget ul li a:hover {
        background: #4CAF50 !important;
        color: #ffffff !important;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
        border-color: #4CAF50;
    }

    .link-widget ul li a {
        transition: all 0.3s ease;
        color: #ffffff;
        text-decoration: none;
        padding: 5px 0;
        display: inline-block;
    }

    .link-widget ul li a:hover {
        color: #4CAF50 !important;
        padding-left: 10px;
        transform: translateX(5px);
    }

    .wpo-contact-widget .contact-ft ul li {
        color: #ffffff;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
    }

    .wpo-contact-widget .contact-ft ul li i {
        color: #4CAF50;
        margin-right: 10px;
        font-size: 18px;
        transition: all 0.3s ease;
    }

    .wpo-contact-widget .contact-ft ul li:hover i {
        color: #66BB6A;
        transform: scale(1.1);
    }

    .newsletter-widget .input-1 {
        position: relative;
        margin-bottom: 15px;
    }

    .newsletter-widget .input-1 input {
        background: green;
        border: 2px solid rgba(76, 175, 80, 0.3);
        color: #ffffff;
        padding: 12px 50px 12px 15px;
        border-radius: 25px;
        transition: all 0.3s ease;
        width: 100%;
    }

    .newsletter-widget .input-1 input:focus {
        border-color: #4CAF50;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
        outline: none;
    }

    .newsletter-widget .input-1 input::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }

    .newsletter-widget .submit {
        position: absolute;
        right: 5px;
        top: 5px;
    }

    .newsletter-widget .submit button {
        background: #4CAF50;
        border: 2px solid #66BB6A;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        cursor: pointer;
        padding: 0;
        box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
    }

    .newsletter-widget .submit button:hover {
        background: #66BB6A;
        border-color: #81C784;
        transform: scale(1.1);
        box-shadow: 0 5px 15px rgba(76, 175, 80, 0.5);
    }

    .newsletter-widget .submit button img {
        width: 16px;
        height: 16px;
        filter: brightness(0) invert(1);
        transition: all 0.3s ease;
    }

    .newsletter-widget .submit button:hover img {
        transform: translateX(2px);
    }

    .widget-title h3 {
        color: #4CAF50;
        position: relative;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }

    .widget-title h3::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50px;
        height: 2px;
        background: linear-gradient(90deg, #4CAF50, #66BB6A);
    }

    .about-widget p {
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
    }

    .newsletter-widget p {
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 20px;
    }

    .error-message {
        color: #ff5252 !important;
        font-size: 14px;
        margin-top: 5px;
        animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    .copyright {
        color: rgba(255, 255, 255, 0.8);
    }

    .copyright span {
        color: #4CAF50;
    }

    .link a {
        color: rgba(255, 255, 255, 0.8);
        transition: all 0.3s ease;
        text-decoration: none;
    }

    .link a:hover {
        color: #4CAF50;
    }

    .ft-shape-1, .ft-shape-2 {
        opacity: 0.1;
        filter: hue-rotate(90deg);
    }

    .footer-shape {
        opacity: 0.3;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .newsletter-widget .input-1 {
            position: relative;
        }
        
        .newsletter-widget .submit {
            position: relative;
            right: auto;
            top: auto;
            margin-top: 10px;
        }
        
        .newsletter-widget .input-1 input {
            padding-right: 15px;
        }
    }
`;

const Footer = (props) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            setError('');
            console.log('Email is valid:', email);
            // Thêm hiệu ứng thành công
            setEmail('');
        } else {
            setError('Please enter a valid email address.');
        }
    };

    const { FooterShape = true } = props

    return (
        <>
            <style>{styles}</style>
            <div className={'' + props.hclass}>
                {FooterShape && (
                    <div className="footer-shape">
                        <img src={TopShape} alt="" />
                    </div>
                )}
                <footer className="wpo-site-footer">
                    <div className="wpo-upper-footer">
                        <div className="container">
                            <div className="row">
                                <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="widget about-widget">
                                        <div className="logo widget-title">
                                            <img src={logo} alt="blog" />
                                        </div>
                                        <p>It was popularised in the 1960s with the
                                            release of Letraset sheets containing Lorem
                                            passages and more recently with desktop
                                            publishing software like including.</p>
                                        <div className="social-widget">
                                            <ul>
                                                <li><Link onClick={ClickHandler} to="#"><i className="ti-facebook" aria-hidden="true"></i></Link></li>
                                                <li><Link onClick={ClickHandler} to="#"><i className="ti-twitter" aria-hidden="true"></i></Link></li>
                                                <li><Link onClick={ClickHandler} to="#"><i className="ti-skype" aria-hidden="true"></i></Link></li>
                                                <li><Link onClick={ClickHandler} to="#"><i className="ti-linkedin" aria-hidden="true"></i></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="widget link-widget">
                                        <div className="widget-title">
                                            <h3>Quick Links</h3>
                                        </div>
                                        <ul>
                                            <li><Link onClick={ClickHandler} to="/about">About Us</Link></li>
                                            <li><Link onClick={ClickHandler} to="/blog">Newsroom </Link></li>
                                            <li><Link onClick={ClickHandler} to="/checkout">Checkout</Link></li>
                                            <li><Link onClick={ClickHandler} to="/product">Product</Link></li>
                                            <li><Link onClick={ClickHandler} to="/contact">Contact Us</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="widget wpo-contact-widget">
                                        <div className="widget-title">
                                            <h3>Contact</h3>
                                        </div>
                                        <div className="contact-ft">
                                            <ul>
                                                <li><i className="fi flaticon-placeholder"></i>7 Green Lake Street Crawfordsville,
                                                    IN 47933
                                                </li>
                                                <li><i className="fi flaticon-phone-call"></i>+1 800 123 456 789</li>
                                                <li><i className="fi flaticon-email"></i>Organtio@gmail.com</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="widget newsletter-widget">
                                        <div className="widget-title">
                                            <h3>Newsletter</h3>
                                        </div>
                                        <p>You will be notified when something new will appear.</p>
                                        <form onSubmit={handleSubmit}>
                                            <div className="input-1">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email Address *"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <div className="submit clearfix">
                                                    <button type="submit">
                                                        <img src={Btnicon} alt="Submit" />
                                                    </button>
                                                </div>
                                            </div>
                                            {error && <div className="error-message">{error}</div>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wpo-lower-footer">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-12 col-12">
                                    <p className="copyright">Copyright &copy;<span>2024</span>
                                        <span className="copyright-icon">|</span> All Rights Reserved.
                                    </p>
                                </div>
                                <div className="col-lg-6 col-md-12 col-12">
                                    <p className="link"><Link onClick={ClickHandler} to="/blog">Term and Service</Link> <span>||</span> <a
                                        href="blog">Privacy Policy</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="ft-shape-1"><img src={FtShape1} alt="" /></div>
                    <div className="ft-shape-2"><img src={FtShape2} alt="" /></div> */}
                </footer>
            </div>
        </>
    )
}

export default Footer;