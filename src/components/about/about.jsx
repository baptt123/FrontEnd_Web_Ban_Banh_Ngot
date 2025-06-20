import React from 'react';
import { Link } from 'react-router-dom';

// hình ảnh
import Ab from '../../images/about/ab.jpg';
import Abd1 from '../../images/about/cake.jpg';
import Abd2 from '../../images/about/4.png';
import Abd3 from '../../images/about/5.png';

const About = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    return (
        <section className={"about-section " + props.hclass} style={{ position: 'relative', overflow: 'hidden', padding: '60px 0' }}>
            <div className="container-fluid">
                <div className="row align-items-center">
                    {/* Phần hình ảnh */}
                    <div className="col-lg-4 col-md-12 col-12">
                        <div style={{ position: 'relative', padding: '20px' }}>
                            {/* Hình ảnh chính */}
                            <div style={{
                                overflow: 'hidden',
                                borderRadius: '10px',
                                height: '400px',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                            }}>
                                <img
                                    src={Ab}
                                    alt="Về chúng tôi"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>

                            {/* Hình bánh kem trong vòng tròn */}
                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                right: '40px',
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '5px solid white',
                                boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                                transform: 'translateY(50%)',
                                aspectRatio: '1/1',
                                backgroundColor: '#fff'
                            }}>
                                <img
                                    src={Abd1}
                                    alt="Logo bánh"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center center',
                                        transform: 'scale(1.1)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Phần nội dung */}
                    <div className="col-lg-8 col-md-12 col-12">
                        <div style={{
                            position: 'relative',
                            padding: '60px 40px',
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                            marginLeft: { md: '20px', xs: '0' }
                        }}>
                            <span style={{
                                color: '#4CAF50',
                                fontSize: '18px',
                                fontWeight: '600',
                                fontStyle: 'italic'
                            }}>
                                "<span style={{ fontStyle: 'normal' }}>VỀ CHÚNG TÔI</span>"
                            </span>

                            <h2 style={{
                                fontSize: '36px',
                                fontWeight: '700',
                                margin: '20px 0',
                                color: '#333'
                            }}>
                                Kết nối của chúng tôi với trái cây và rau hữu cơ.
                            </h2>

                            <p style={{
                                fontSize: '16px',
                                lineHeight: '1.6',
                                color: '#666',
                                marginBottom: '30px'
                            }}>
                                Lorem Ipsum đã trở thành đoạn văn mẫu tiêu chuẩn của ngành in ấn kể từ khi một thợ in vô danh lấy một bản in mẫu và xáo trộn nó để tạo ra một quyển mẫu. Nó đã tồn tại qua hơn năm thế kỷ.
                            </p>

                            <ul style={{
                                listStyle: 'none',
                                paddingLeft: '0',
                                marginBottom: '30px'
                            }}>
                                <li style={{
                                    marginBottom: '15px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        marginRight: '15px',
                                        width: '25px',
                                        height: '25px',
                                        flexShrink: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <img
                                            src={Abd2}
                                            alt="Biểu tượng đánh dấu"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                maxWidth: '100%'
                                            }}
                                        />
                                    </div>
                                    <span>Nó đã tồn tại qua nhiều thế kỷ và vẫn tiếp tục phát triển.</span>
                                </li>
                                <li style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        marginRight: '15px',
                                        width: '25px',
                                        height: '25px',
                                        flexShrink: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <img
                                            src={Abd3}
                                            alt="Biểu tượng đánh dấu"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                maxWidth: '100%'
                                            }}
                                        />
                                    </div>
                                    <span>Nó đã tồn tại qua nhiều thế kỷ và vẫn tiếp tục phát triển.</span>
                                </li>
                            </ul>

                            <Link
                                onClick={ClickHandler}
                                to="/about"
                                style={{
                                    display: 'inline-block',
                                    marginTop: '20px',
                                    padding: '12px 30px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    borderRadius: '30px',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Liên hệ ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
