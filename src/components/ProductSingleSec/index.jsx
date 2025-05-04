import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ProductTabMenu from "../ProductTabMenu";

const ProductSingleSec = ({ item, addToCart }) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const [qty, setQty] = useState(1);

  return (
    <div className="product-single-section section-padding">
      <div className="container">
        <div className="product-details">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="product-single-img">
                <div className="product-active">
                  <div className="item">
                    <Zoom>
                      <img
                        alt="Bánh cupcake"
                        src={item.proImg ? item.proImg : ""}
                        width="500"
                      />
                    </Zoom>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="product-single-content">
                <h5>{item.title}</h5>
                <div className="price">
                  <h6>{Number(item.price).toLocaleString('vi-VN')}₫ (~${(item.price * 0.000041).toFixed(2)})</h6>
                </div>
                <ul className="rating">
                  <li>
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </li>
                </ul>
                <p>
                  {item.title} được làm từ những nguyên liệu tươi ngon nhất, kết hợp với công thức độc đáo tạo nên hương vị thơm ngon khó quên. Mỗi chiếc bánh đều được trang trí tỉ mỉ, tạo nên một tác phẩm nghệ thuật ẩm thực. Bánh mềm mịn, thơm ngon, phù hợp cho mọi dịp từ tiệc sinh nhật đến các buổi họp mặt gia đình.
                </p>
                <div className="product-filter-item color">
                  <div className="color-name">
                    <span>Màu sắc :</span>
                    <ul>
                      <li className="color1">
                        <input id="a1" type="radio" name="color" value="30" />
                        <label htmlFor="a1"></label>
                      </li>
                      <li className="color2">
                        <input id="a2" type="radio" name="color" value="30" />
                        <label htmlFor="a2"></label>
                      </li>
                      <li className="color3">
                        <input id="a3" type="radio" name="color" value="30" />
                        <label htmlFor="a3"></label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-filter-item color filter-size">
                  <div className="color-name">
                    <span>Kích thước :</span>
                    <ul>
                      <li className="color">
                        <input id="wa1" type="radio" name="size" value="30" />
                        <label htmlFor="wa1">Nhỏ</label>
                      </li>
                      <li className="color">
                        <input id="wa2" type="radio" name="size" value="30" />
                        <label htmlFor="wa2">Vừa</label>
                      </li>
                      <li className="color">
                        <input id="wa3" type="radio" name="size" value="30" />
                        <label htmlFor="wa3">Lớn</label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pro-single-btn">
                  <Grid className="quantity cart-plus-minus">
                    <Button
                      className="dec qtybutton"
                      onClick={() => setQty(qty <= 1 ? 1 : qty - 1)}
                    >
                      -
                    </Button>
                    <input
                      value={qty}
                      onChange={() => setQty(qty)}
                      type="text"
                    />
                    <Button
                      className="inc qtybutton"
                      onClick={() => setQty(qty + 1)}
                    >
                      +
                    </Button>
                  </Grid>
                  <button
                    className="theme-btn"
                    onClick={() => addToCart(item, qty)}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
                <div className="social-share">
                  <span>Chia sẻ : </span>
                  <ul className="socialLinks">
                    <li>
                      <Link onClick={ClickHandler} to="/product-single">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/product-single">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/product-single">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/product-single">
                        <i className="fa fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/product-single">
                        <i className="fa fa-youtube-play"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductTabMenu />
      </div>
    </div>
  );
};

export default ProductSingleSec;
