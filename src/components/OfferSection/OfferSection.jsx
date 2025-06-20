import React from 'react';
import { Link } from 'react-router-dom';
import Cake from '../../images/funfact/cake_svg_funfact.svg'


const OfferSection = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }
    return (
        <section className="orico-product-offer-section section-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-12">
                        <div className="orico-product-offer-text">
                            {/* <h2>“<span>80% OFF</span>”</h2> */}
                            <h3>- 100% Bánh nguyên chất-</h3>
                            <div className="btns">
                                <Link onClick={ClickHandler} to="/shop" className="theme-btn-s2">Shop Now <i className="ti-arrow-right"
                                    aria-hidden="true"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-shape-1"><img src={Cake} alt=""/></div>
            <div className="p-shape-2"><img src={Cake} alt=""/></div>
        </section>
    );
};

export default OfferSection;