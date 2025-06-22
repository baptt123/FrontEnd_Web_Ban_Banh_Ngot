import React from "react";
import { Link } from 'react-router-dom'
import SectionTitle from "../SectionTitle/SectionTitle";
import Services from "../../api/Services";

const ServiceSection = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const { SectionTitleShow=true } = props

    return (
        <div className="orico-service-section section-padding">
            <div className="container">
                {SectionTitleShow &&  (
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <SectionTitle subtitle={'Các sản pham theo danh muc'} title={'Danh muc'} />
                    </div>
                </div>
                )}
                <div className="row">
                    {Services.map((service, item) => (
                        <div className="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12" key={item}>
                            <div className="service-item">
                                {/* Khung tròn cho ảnh sản phẩm */}
                                <div className="service-item-img" style={{
                                    width: '150px',
                                    height: '150px',
                                    margin: '0 auto 15px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '2px solid #f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <img 
                                        src={service.simage} 
                                        alt="" 
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center'
                                        }}
                                    />
                                </div>
                                
                                {/* Khung tròn cho icon SVG */}
                                <div className="orico-service-text">
                                    <div className="icon" style={{
                                        width: '60px',
                                        height: '60px',
                                        margin: '0 auto 10px',
                                        borderRadius: '50%',
                                        backgroundColor: '#f8f8f8',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <img 
                                            src={service.icon} 
                                            alt="" 
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </div>
                                    <h4 style={{ marginBottom: '10px' }}>{service.title}</h4>
                                    <Link to={`/service-single/${service.slug}`} onClick={ClickHandler}>
                                        <i className="ti-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ServiceSection;