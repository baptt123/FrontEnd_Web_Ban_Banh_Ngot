import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TopShape from '../../images/ft-bg.png'
import logo from '../../images/cupakery.png'
import Btnicon from '../../images/pointer.svg'



const ClickHandler = () => {
    window.scrollTo(10, 0);
}


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
        } else {
            setError('Please enter a valid email address.');
        }
    };

    const { FooterShape = true } = props

    return (
        <div className={'' + props.hclass}>
            {FooterShape && (
                <div className="footer-shape">
                    <img src={TopShape} alt="" />
                </div>
            )}
            <footer className="wpo-site-footer" >
                <div className="wpo-upper-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                                <div className="widget about-widget">
                                    <div className="logo widget-title">
                                        <img src={logo} alt="blog" />
                                    </div>
                                    <p>Không có thông tin chinh xac</p>
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
                                        <h3>Liên ket nhanh</h3>
                                    </div>
                                    <ul>
                                        <li><Link onClick={ClickHandler} to="/about">Về chúng tôi</Link></li>
                                        <li><Link onClick={ClickHandler} to="/blog">Tin tuc</Link></li>
                                        <li><Link onClick={ClickHandler} to="/checkout">Thanh toán</Link></li>
                                        <li><Link onClick={ClickHandler} to="/product">Sản pham</Link></li>
                                        <li><Link onClick={ClickHandler} to="/contact">Lien he</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                                <div className="widget wpo-contact-widget">
                                    <div className="widget-title">
                                        <h3>Lien he</h3>
                                    </div>
                                    <div className="contact-ft">
                                        <ul>
                                            <li><i className="fi flaticon-placeholder"></i>
                                                Chưa xác định
                                            </li>
                                            <li><i className="fi flaticon-phone-call"></i>+1 334 568 774</li>
                                            <li><i className="fi flaticon-email"></i>bapttan123@gmail.com</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                                <div className="widget newsletter-widget">
                                    <div className="widget-title">
                                        <h3>Báo cáo</h3>
                                    </div>
                                    <p>Bạn sẽ được thông báo mỗi khi có cập nhật mới.</p>
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
                                        </div>
                                        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
                                        <div className="submit clearfix">
                                            <button type="submit">
                                                <i>
                                                    <img src={Btnicon} alt="Submit" />
                                                </i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wpo-lower-footer">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12  col-12">
                                <p className="copyright">Copyright &copy;<span>2025</span>
                                    <span className="copyright-icon">|</span> All Rights Reserved.
                                </p>
                            </div>
                            <div className="col-lg-6 col-md-12  col-12">
                                <p className="link"><Link onClick={ClickHandler} to="/blog"></Link> Điều khoản<span>||</span> <a
                                    href="blog">Chinh sách</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="ft-shape-1"><img src={FtShape1} alt="" /></div>
                <div className="ft-shape-2"><img src={FtShape2} alt="" /></div> */}
            </footer>
        </div>
    )
}

export default Footer;