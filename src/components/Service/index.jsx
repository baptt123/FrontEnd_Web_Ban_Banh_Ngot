import React from 'react'
import serviceimg from '../../images/support/1.png'
import serviceimg2 from '../../images/support/2.png'
import serviceimg3 from '../../images/support/3.png'


const Service = (props) => {
    return(
        <div className="service-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="service-item">
                            <div className="service-icon">
                                <span><img draggable="false" src={serviceimg} alt=""/></span>
                            </div>
                            <div className="service-icon-text">
                                <h2>Giao Hàng Miễn Phí</h2>
                                <span>Đơn hàng trên 500.000đ</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="service-item">
                            <div className="service-icon">
                                <span><img draggable="false" src={serviceimg2} alt=""/></span>
                            </div>
                            <div className="service-icon-text">
                                <h2>Thanh Toán Dễ Dàng</h2>
                                <span>Bảo mật 100%</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="service-item">
                            <div className="service-icon">
                                <span><img draggable="false" src={serviceimg3} alt=""/></span>
                            </div>
                            <div className="service-icon-text">
                                <h2>Hỗ Trợ 24/7</h2>
                                <span>Hỗ trợ mọi lúc</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service;