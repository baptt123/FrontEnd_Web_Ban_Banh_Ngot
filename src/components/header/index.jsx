import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import MobileMenu from "../MobileMenu";
import min3 from "../../images/shop/mini-cart/bee2.png";
import {totalPrice} from "../../utils";
import { removeFromCart,removeFromWishList } from "../../store/actions/action";

const menus = [
    {
        id: 1,
        title: 'Trang chủ',
        link: '/home',
    },

    {
        id: 2,
        title: 'Về chúng tôi',
        link: '/about',
    },
    {
        id: 3,
        title: 'Cửa hàng',
        link: '/shop',
    },

    {
        id: 6,
        title: 'Sản phẩm',
        link: '/',
        submenu: [
            {
                id: 41,
                title: 'Sản phẩm',
                link: '/shop'
            },
            {
                id: 45,
                title: 'Chi tiết sản phẩm',
                link: '/product-single/1'
            },
            
        ]
    },
    {
        id: 5,
        title: 'Tin tức',
        link: '/blog',
        submenu: [
            {
                id: 51,
                title: 'Tin tức',
                link: '/blog'
            },
            {
                id: 52,
                title: 'Tin tức sidebar trái',
                link: '/blog-left-sidebar'
            },
            {
                id: 53,
                title: 'Tin tức full width',
                link: '/blog-fullwidth'
            },
            {
                id: 54,
                title: 'Chi tiết tin tức',
                link: '/blog-single/1'
            },
            {
                id: 55,
                title: 'Chi tiết tin tức sidebar trái',
                link: '/blog-single-left-sidebar/1'
            },
            {
                id: 56,
                title: 'Chi tiết tin tức full width',
                link: '/blog-single-fullwidth/1'
            },
        ]
    },
    {
        id: 88,
        title: 'Liên hệ',
        link: '/contact',
    }
]

class Header extends Component {
  state = {
    isCartShow: false,
    isWishlistShow: false,
  };

  cartHandler = () => {
    this.setState({
      isCartShow: !this.state.isCartShow,
    });
  };

  wishlistHandler = () => {
    this.setState({
      isWishlistShow: !this.state.isWishlistShow,
    });
  };
  profileHandler = () => {
    this.setState({
      isprofileShow: !this.state.isprofileShow,
    });
  };

  
  render() {
    const { isCartShow, isWishlistShow, isprofileShow } = this.state;
    
    const ClickHandler = () =>{
      window.scrollTo(10, 0);
   }

    const { carts } = this.props;
    const { wishs } = this.props;


    let totalwishlistprice = 0;
    if (wishs && wishs.length > 0) {
      for (let i = 1; i <= wishs.length; i++) {
        totalwishlistprice += Number(wishs[i-1].price);
      }
    }

    console.log(totalPrice)

    return (
      <header id="header" className={`site-header ${this.props.hClass}`}>
        <nav className="navigation navbar navbar-expand-lg">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="navbar-header">
                  <Link onClick={ClickHandler} className="navbar-brand" to="/home">
                    <img src={Logo} alt="icon" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-7">
                <div
                  id="navbar"
                  className="collapse navbar-collapse navigation-holder"
                >
                  <Link onClick={ClickHandler} className="menu-close" to="/">
                    <i className="fi flaticon-cancel"></i>
                  </Link>
                  <ul className="nav navbar-nav me-auto mb-2 mb-lg-0">
                    {menus.map((menu) => (
                      <li key={menu.id}>
                        <Link onClick={ClickHandler} to={menu.link}>
                          {menu.title}
                        </Link>
                        {menu.submenu && (
                          <ul className="sub-menu">
                            {menu.submenu.map((subMenu) => (
                              <li key={subMenu.id}>
                                <Link onClick={ClickHandler} to={subMenu.link}>
                                  {subMenu.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="header-right d-flex">
                  <div className="header-profile-form-wrapper">
                    <button
                      onClick={this.profileHandler}
                      className="profile-toggle-btn"
                    >
                      <i className={`${isprofileShow ? 'fi ti-close' : 'fi flaticon-user'}`}></i>
                    </button>
                    <div
                      className={`header-profile-content ${
                        isprofileShow ? "header-profile-content-toggle" : ""
                      }`}
                    >
                      <ul>
                        <li>
                          <Link onClick={ClickHandler} to="/login">Đăng nhập</Link>
                        </li>
                        <li>
                          <Link onClick={ClickHandler} to="/register">Đăng ký</Link>
                        </li>
                        <li>
                          <Link onClick={ClickHandler} to="/cart">Giỏ hàng</Link>
                        </li>
                        <li>
                          <Link onClick={ClickHandler} to="/wishlist">Yêu thích</Link>
                        </li>
                        <li>
                          <Link onClick={ClickHandler} to="/checkout">Thanh toán</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mini-cart">
                    <button
                      onClick={this.cartHandler}
                      className="cart-toggle-btn"
                    >
                      {" "}
                      <i className="fi flaticon-bag"></i>{" "}
                      <span className="cart-count">{carts.length}</span>
                    </button>
                    <div
                      className={`mini-cart-content ${
                        isCartShow ? "mini-cart-content-toggle" : ""
                      }`}
                    >
                      <button
                        onClick={this.cartHandler}
                        className="mini-cart-close"
                      >
                        <i className="ti-close"></i>
                      </button>
                      <div className="mini-cart-items">
                        {carts &&
                          carts.length > 0 &&
                          carts.map((cart, crt) => (
                            <div className="mini-cart-item clearfix" key={crt}>
                              <div className="mini-cart-item-image">
                                <span>
                                  <img src={cart.proImg} alt="icon" />
                                </span>
                              </div>
                              <div className="mini-cart-item-des">
                                <p>{cart.title} </p>
                                <span className="mini-cart-item-price">
                                  {Number(String(cart.price).replace(/\./g, '')).toLocaleString('vi-VN')}₫ x {cart.qty}
                                </span>
                                <span className="mini-cart-item-quantity">
                                    <button
                                      onClick={() =>
                                        this.props.removeFromCart(cart.id)
                                      }
                                      className="btn btn-sm btn-danger"
                                    >
                                      <i className="ti-close"></i>
                                    </button>{" "}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="mini-cart-action clearfix">
                        <span className="mini-checkout-price">
                          Tổng cộng: {Number(totalPrice(carts)).toLocaleString('vi-VN')}₫
                        </span>
                        <div className="mini-btn">
                          <Link onClick={ClickHandler} to="/checkout" className="view-cart-btn s1">
                            Thanh toán
                          </Link>
                          <Link onClick={ClickHandler} to="/cart" className="view-cart-btn">
                            Xem giỏ hàng
                          </Link>
                        </div>
                      </div>
                      <div className="visible-icon">
                        <img src={min3} alt="icon" />
                      </div>
                    </div>
                  </div>
                  <div className="header-wishlist-form-wrapper">
                    <button
                      onClick={this.wishlistHandler}
                      className="wishlist-toggle-btn"
                    >
                      <i className="fi flaticon-heart"></i>{" "}
                      <span className="cart-count">{wishs.length}</span>{" "}
                    </button>
                    <div
                      className={`mini-wislist-content ${
                        isWishlistShow ? "mini-cart-content-toggle" : ""
                      }`}
                    >
                      <button
                        onClick={this.wishlistHandler}
                        className="mini-cart-close"
                      >
                        <i className="ti-close"></i>
                      </button>
                      <div className="mini-cart-items">
                      {wishs &&
                          wishs.length > 0 &&
                          wishs.map((wish, i) => (
                            <div className="mini-cart-item clearfix" key={i}>
                              <div className="mini-cart-item-image">
                                <span>
                                  <img src={wish.proImg} alt="icon" />
                                </span>
                              </div>
                              <div className="mini-cart-item-des">
                                <p>{wish.title} </p>
                                <span className="mini-cart-item-price">
                                  {Number(String(wish.price).replace(/\./g, '')).toLocaleString('vi-VN')}₫
                                </span>
                                <span className="mini-cart-item-quantity">
                                  <button
                                    onClick={() =>
                                      this.props.removeFromWishList(wish.id)
                                    }
                                    className="btn btn-sm btn-danger"
                                  >
                                    <i className="ti-close"></i>
                                  </button>{" "}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="mini-cart-action clearfix">
                        <span className="mini-checkout-price">
                          Tổng cộng: {Number(totalwishlistprice).toLocaleString('vi-VN')}₫
                        </span>
                        <div className="mini-btn">
                          <Link onClick={ClickHandler} to="/checkout" className="view-cart-btn s1">
                            Thanh toán
                          </Link>
                          <Link onClick={ClickHandler} to="/wishlist" className="view-cart-btn">
                            Xem yêu thích
                          </Link>
                        </div>
                      </div>
                      <div className="visible-icon">
                        <img src={min3} alt="icon" />
                      </div>
                    </div>
                  </div>
                  <MobileMenu />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    carts: state.cartList.cart,
    wishs: state.wishList.w_list,
  };
};


export default connect(mapStateToProps, { removeFromCart,removeFromWishList })(Header);
