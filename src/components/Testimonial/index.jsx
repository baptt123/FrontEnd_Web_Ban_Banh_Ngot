import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import test1 from '../../images/testimonial/1.png'
import test2 from '../../images/testimonial/3.png'
import test3 from '../../images/testimonial/2.png'




class Testimonial extends Component {

    
    render() {
        var settings = {
            dots: false,
            arrows: true,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2500,
            fade: true
        };

        return (
            <section className="testimonial-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="section-title">
                                <h2>Đánh Giá <span>Từ Khách Hàng</span></h2>
                                <p>Chúng tôi luôn lắng nghe ý kiến của khách hàng để không ngừng cải thiện chất lượng sản phẩm và dịch vụ.</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-wrap">
                        <div className="testimonial-active">
                            <Slider {...settings}>
                                <div className="testimonial-item">
                                    <div className="testimonial-img">
                                        <img src={test1} alt=""/>
                                        <div className="t-quote">
                                            <i className="fi flaticon-left-quote"></i>
                                        </div>
                                    </div>
                                    <div className="testimonial-content">
                                        <p>Tôi rất ấn tượng với chất lượng bánh ở đây. Bánh kem tươi ngon, trang trí đẹp mắt và giá cả hợp lý. Đặc biệt là dịch vụ giao hàng rất nhanh chóng và chuyên nghiệp.</p>
                                        <div className="testimonial-author">
                                            <h3>Nguyễn Thị Hương</h3>
                                            <span>Khách hàng thân thiết</span>
                                        </div>
                                        <div className="t-content-quote">
                                            <i className="fi flaticon-left-quote"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-item">
                                    <div className="testimonial-img">
                                        <img src={test2} alt=""/>
                                        <div className="t-quote">
                                            <i className="fi flaticon-left-quote"></i>
                                        </div>
                                    </div>
                                    <div className="testimonial-content">
                                        <p>Bánh ở đây thực sự rất ngon! Tôi đã thử nhiều loại bánh khác nhau và đều rất hài lòng. Nguyên liệu tươi ngon, hương vị đậm đà và giá cả phải chăng. Chắc chắn sẽ quay lại!</p>
                                        <div className="testimonial-author">
                                            <h3>Trần Văn Minh</h3>
                                            <span>Food Blogger</span>
                                        </div>
                                        <div className="t-content-quote">
                                            <i className="fi flaticon-left-quote"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-item">
                                    <div className="testimonial-img">
                                        <img src={test3} alt=""/>
                                        <div className="t-quote">
                                            <i className="fi flaticon-left-quote"></i>
                                        </div>
                                    </div>
                                    <div className="testimonial-content">
                                        <p>Đây là nơi tôi thường xuyên đặt bánh cho các dịp đặc biệt. Bánh luôn tươi ngon, trang trí đẹp mắt và đúng yêu cầu. Nhân viên phục vụ rất nhiệt tình và chu đáo.</p>
                                        <div className="testimonial-author">
                                            <h3>Lê Thị Mai</h3>
                                            <span>Khách hàng thường xuyên</span>
                                        </div>
                                        <div className="t-content-quote">
                                            <i className="fi flaticon-left-quote"></i>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Testimonial;