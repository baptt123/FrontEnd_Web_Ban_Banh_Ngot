import React from "react";
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom'
import hero1 from '../../images/slider/slide-1.jpg'
import hero2 from '../../images/slider/slide-4.jpg'
// import Cake from '../../images/img-bakery/bread.png'
// import Cake2 from '../../images/img-bakery/circle.png'
// import Cake3 from '../../images/img-bakery/croiisant.png'
// import Cake4 from '../../images/img-bakery/donut.png'
import Cake5 from '../../images/service/break-cake.svg'

const HeroSlider = () => {
    return (
        <section className="wpo-hero-slider" >
            <Swiper
                // install Swiper modules
                modules={[Navigation, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                speed={1800}
                parallax={true}
                navigation
            >
                <SwiperSlide>
                    <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${hero1})` }}>
                        <div className="container-fluid">
                            <div className="slide-content">
                                {/* <div className="slide-sub-title">
                                    <p>“<span>100% PURE VEGETABLES</span>”</p>
                                </div> */}
                                <div className="slide-title">
                                    <h2>Các loại bánh ngọt <span>và</span> mọi thứ thuộc về bạn</h2>
                                </div>
                                <div className="slide-text">
                                    <p>Bánh ngon nguyên chất.</p>
                                </div>
                                <div className="slide-btns">
                                    <Link to="/about" className="theme-btn">Explore more</Link>
                                </div>
                            </div>
                        </div>
                        <div className="shape s1"><img src={Cake5} alt=""/></div>
                        <div className="shape s2"><img src={Cake5} alt=""/></div>
                        <div className="shape s3"><img src={Cake5} alt=""/></div>
                        <div className="shape s4"><img src={Cake5} alt=""/></div>
                        <div className="shape s5"><img src={Cake5} alt=""/></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${hero2})` }}>
                        <div className="container-fluid">
                            <div className="slide-content">
                                <div className="slide-sub-title">
                                    <p>“<span>Bánh ngọt</span>”</p>
                                </div>
                                <div className="slide-title">
                                    <h2>Bánh ngọt cho mọi nhà<span>And</span> </h2>
                                </div>
                                <div className="slide-text">
                                    <p>Bánh ngot</p>
                                </div>
                                <div className="slide-btns">
                                    <Link to="/about" className="theme-btn">Explore more</Link>
                                </div>
                            </div>
                        </div>
                        <div className="shape s1"><img src={Cake5} alt=""/></div>
                        <div className="shape s2"><img src={Cake5} alt=""/></div>
                        <div className="shape s3"><img src={Cake5} alt=""/></div>
                        <div className="shape s4"><img src={Cake5} alt=""/></div>
                        <div className="shape s5"><img src={Cake5} alt=""/></div>
                    </div>
                </SwiperSlide>
               
                ...
            </Swiper>
        </section>
    );
};

export default HeroSlider;