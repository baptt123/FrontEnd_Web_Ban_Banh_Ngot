import React from 'react'
import {Link}  from 'react-router-dom'
import Logo from '../../images/logo.svg'


const Footer = (props) =>{

    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }

  return(
    <footer className="tp-site-footer">
        <div className="tp-upper-footer">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="widget about-widget">
                            <div className="logo widget-title">
                                <Link onClick={ClickHandler} to="/"><img src={Logo} alt="ft-logo"/> Cupbakery</Link>
                            </div>
                            <p>Cupbakery - Thiên đường của những chiếc bánh thơm ngon. Chúng tôi tự hào mang đến cho khách hàng những trải nghiệm ẩm thực tuyệt vời với các loại bánh được làm từ nguyên liệu chất lượng cao.</p>
                            <ul>
                                <li>
                                    <Link onClick={ClickHandler} to="/">
                                        <i className="ti-facebook"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={ClickHandler} to="/">
                                        <i className="ti-twitter-alt"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={ClickHandler} to="/">
                                        <i className="ti-instagram"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={ClickHandler} to="/">
                                        <i className="ti-google"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="widget tp-service-link-widget">
                            <div className="widget-title">
                                <h3>Liên hệ</h3>
                            </div>
                            <div className="contact-ft">
                                <ul>
                                    <li><i className="fi flaticon-pin"></i>123 Đường Nguyễn Huệ, Quận 1, TP.HCM</li>
                                    <li><i className="fi flaticon-call"></i>+84 28 1234 5678</li>
                                    <li><i className="fi flaticon-envelope"></i>info@cupbakery.vn</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="widget link-widget">
                            <div className="widget-title">
                                <h3>Tài khoản</h3>
                            </div>
                            <ul>
                                <li><Link onClick={ClickHandler} to="/project">Sản phẩm của chúng tôi</Link></li>
                                <li><Link onClick={ClickHandler} to="/shop">Cửa hàng</Link></li>
                                <li><Link onClick={ClickHandler} to="/wishlist">Yêu thích</Link></li>
                                <li><Link onClick={ClickHandler} to="/checkout">Thanh toán</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="widget newsletter-widget">
                            <div className="widget-title">
                                <h3>Bản tin</h3>
                            </div>
                            <p>Đăng ký để nhận thông tin mới nhất về sản phẩm và khuyến mãi.</p>
                            <form>
                                <div className="input-1">
                                    <input type="email" className="form-control" placeholder="Địa chỉ email *" required/>
                                </div>
                                <div className="submit clearfix">
                                    <button type="submit"><i className="ti-email"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <div className="tp-lower-footer">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <p className="copyright"> Bản quyền &copy; 2023 Cupbakery. Đã đăng ký bản quyền.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-shape1">
            <i className="fi flaticon-honeycomb"></i>
        </div>
        <div className="footer-shape2">
            <i className="fi flaticon-honey-1"></i>
        </div>
    </footer>
  )
} 

export default Footer;