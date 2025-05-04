import React from 'react'
import {Link} from 'react-router-dom'
import abimg from '../../images/honey.png'

const OfferSection = (props) => {
    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }
    return(
        <section className="offer-area section-padding">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="offer-img">
                           <img src={abimg} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="offer-wrap">
                            <div className="offer-title">
                                <small>Ưu đãi đặc biệt</small>
                                <h2>Bánh Kem <span>Mới Giảm Giá</span> <br/> Lên đến 58%.</h2>
                            </div>
                            <p>Đừng bỏ lỡ cơ hội thưởng thức những chiếc bánh kem thơm ngon với mức giá ưu đãi hấp dẫn. Chúng tôi cam kết mang đến cho bạn những sản phẩm chất lượng nhất với hương vị tuyệt hảo.</p>
                            <Link onClick={ClickHandler} to="/shop" className="btn theme-btn">Mua ngay <i className="fa fa-angle-double-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OfferSection;