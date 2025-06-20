import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/cupakery.png';
import header1 from '../../images/header-shape1.png'
import header2 from '../../images/header-shape2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
const HeaderTop = () => {
    return (
        <div className="topbar">
            <div className="shape-1"><img src={header1} alt="" /></div>
            <div className="shape-2"><img src={header2} alt="" /></div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-3 col-12 d-lg-block d-none">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} alt="" width="250" height="200"/>
                        </Link>
                    </div>
                    <div className="col-lg-9 col-12">
                        <div className="contyact-info-wrap">
                            <div className="contact-info">
                                <div className="icon">
                                   <FontAwesomeIcon icon={faPhone} style={{ color: '#63E6BE' }} />
                                </div>
                                <div className="info-text">
                                    <span>Lien he</span>
                                    <p>00 567 458 796 47</p>
                                </div>
                            </div>
                            <div className="contact-info">
                                <div className="icon">
                                 <FontAwesomeIcon icon={faEnvelope} style={{color: "#63E6BE",}} />
                                </div>
                                <div className="info-text">
                                    <span>Email</span>
                                    <p>infoorgco@gmail.com</p>
                                </div>
                            </div>
                            <div className="contact-info">
                                <div className="icon">
                                 <FontAwesomeIcon icon={faLocationDot} style={{color: "#63E6BE",}} />
                                </div>
                                <div className="info-text">
                                    <span>Dia chi:</span>
                                    <p>Chua xac dinh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;