import React from 'react'
import {Link} from 'react-router-dom'
import VideoModal from '../ModalVideo'
import abimg from '../../images/abou2.jpg'


const About = (props) => {
    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }
    return(
        <section className="about-section section-padding p-t-0">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col col-lg-5 col-12">
                        <div className="video-area">
                            <img src={abimg} alt="" />
                            <div className="video-holder">
                                <VideoModal/>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-7 col-12">
                        <div className="about-area">
                            <div className="about-wrap">
                                <div className="about-title">
                                    <small>Về chúng tôi</small>
                                    <h2>Thiên đường <span>của những</span> chiếc bánh</h2>
                                </div>
                                <p>Chúng tôi tự hào là một trong những tiệm bánh hàng đầu, mang đến cho khách hàng những trải nghiệm ẩm thực tuyệt vời. Với đội ngũ đầu bếp tài năng và nguyên liệu chất lượng cao, mỗi chiếc bánh của chúng tôi đều được chế biến tỉ mỉ và trang trí tinh tế. Từ những chiếc bánh ngọt thơm ngon đến các loại bánh mặn đậm đà, chúng tôi cam kết mang đến hương vị tuyệt hảo cho mọi thực khách.</p>
                                <Link onClick={ClickHandler} to="/about" className="btn theme-btn" >Xem thêm<i className="fa fa-angle-double-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;