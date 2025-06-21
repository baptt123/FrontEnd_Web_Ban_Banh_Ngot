import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MobileMenu from '../MobileMenu/MobileMenu';
import { totalPrice } from '../../utils';

const Header = (props) => {
    const [menuActive, setMenuState] = useState(false);
    const [cartActive, setCartState] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartDetails, setCartDetails] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(savedCart);
    }, []);

    useEffect(() => {
        if (!cartItems.length) return;

        fetch('http://localhost:8080/api/cart/get-cart', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartItems),
        })
            .then((res) => res.json())
            .then((data) => {
                const merged = data.map((item) => {
                    const found = cartItems.find(
                        (i) => i.productId === item.productId && i.storeId === item.storeId
                    );
                    return { ...item, quantity: found?.quantity || 1 };
                });
                setCartDetails(merged);
            })
            .catch(() => setCartDetails([]));
    }, [cartItems]);

    // Lấy thông tin người dùng nếu đã đăng nhập
    useEffect(() => {
        fetch('http://localhost:8080/api/auth/me', {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => setUser(data))
            .catch(() => setUser(null));
    }, []);

    const ClickHandler = () => window.scrollTo(10, 0);

    const removeFromCart = (productId, storeId) => {
        const updated = cartItems.filter(
            (item) => !(item.productId === productId && item.storeId === storeId)
        );
        setCartItems(updated);
        localStorage.setItem('cartItems', JSON.stringify(updated));
        setCartDetails((prev) =>
            prev.filter((item) => !(item.productId === productId && item.storeId === storeId))
        );
    };

    const handleLogout = () => {
        fetch('http://localhost:8080/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        })
            .then(() => {
                setUser(null);
                navigate('/login');
            })
            .catch((err) => console.error('Logout failed:', err));
    };

    return (
        <header id="header">
            <div className={props.hclass}>
                <nav className="navigation navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                                <MobileMenu />
                            </div>
                            <div className="col-md-6 col-6 d-lg-none dl-block">
                                <div className="navbar-header">
                                    <Link onClick={ClickHandler} className="navbar-brand" to="/home">
                                        <img src={props.Logo} alt="" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-1 col-1">
                                <div id="navbar" className="collapse navbar-collapse navigation-holder">
                                    <ul className="nav navbar-nav mb-2 mb-lg-0">
                                        <li><Link onClick={ClickHandler} to="/about">Về chúng tôi</Link></li>
                                        <li className="menu-item-has-children">
                                            <Link onClick={ClickHandler} to="#">Pages</Link>
                                            <ul className="sub-menu">
                                                <li><Link onClick={ClickHandler} to="/services">Dịch vụ</Link></li>
                                                <li><Link onClick={ClickHandler} to="/testimonial">Khách hàng mới</Link></li>
                                                {
                                                    user ? (
                                                        <li><span style={{ padding: '8px 20px', color: '#333' }}>Xin chào, {user.username}</span></li>
                                                    ) : (
                                                        <li><Link onClick={ClickHandler} to="/login">Đăng nhập</Link></li>
                                                    )
                                                }
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <Link onClick={ClickHandler} to="#">Sản phẩm</Link>
                                            <ul className="sub-menu">
                                                <li><Link onClick={ClickHandler} to="/products">Sản phẩm</Link></li>
                                                <li><Link onClick={ClickHandler} to="/cart">Giỏ hàng</Link></li>
                                                <li><Link onClick={ClickHandler} to="/checkout">Thanh toán</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link onClick={ClickHandler} to="/contact">Liên hệ</Link></li>
                                        {
                                            user && (
                                                <li><button className="btn btn-sm btn-warning" onClick={handleLogout}>Đăng xuất</button></li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-2 col-2">
                                <div className="header-right">
                                    {/* Tìm kiếm */}
                                    <div className="header-search-form-wrapper">
                                        <div className="cart-search-contact">
                                            <button onClick={() => setMenuState(!menuActive)} className="search-toggle-btn">
                                                <i className={`fi ${menuActive ? 'ti-close' : 'flaticon-loupe'}`}></i>
                                            </button>
                                            <div className={`header-search-form ${menuActive ? 'header-search-content-toggle' : ''}`}>
                                                <form onSubmit={(e) => e.preventDefault()}>
                                                    <div>
                                                        <input type="text" className="form-control" placeholder="Search here..." />
                                                        <button type="submit"><i className="fi flaticon-loupe"></i></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Giỏ hàng */}
                                    <div className="mini-cart">
                                        <button className="cart-toggle-btn" onClick={() => setCartState(!cartActive)}>
                                            <i className="flaticon-shopping-cart"></i>
                                            <span className="cart-count">{cartDetails.length}</span>
                                        </button>
                                        <div className={`mini-cart-content ${cartActive ? 'mini-cart-content-toggle' : ''}`}>
                                            <button className="mini-cart-close" onClick={() => setCartState(false)}>
                                                <i className="ti-close"></i>
                                            </button>
                                            <div className="mini-cart-items">
                                                {cartDetails.length > 0 ? (
                                                    cartDetails.map((item, index) => (
                                                        <div className="mini-cart-item clearfix" key={`${item.productId}_${item.storeId}_${index}`}>
                                                            <div className="mini-cart-item-image">
                                                                <span>
                                                                    <img
                                                                        src={item.imageUrl || '/default-product.jpg'}
                                                                        alt={item.productName}
                                                                        onError={(e) => (e.target.src = '/default-product.jpg')}
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="mini-cart-item-des">
                                                                <p className="fw-bold">{item.productName}</p>
                                                                <span className="mini-cart-item-price">
                                                                    {item.price.toLocaleString('vi-VN', {
                                                                        style: 'currency',
                                                                        currency: 'VND',
                                                                    })} x {item.quantity}
                                                                </span>
                                                                <span className="mini-cart-item-quantity">
                                                                    <button
                                                                        onClick={() => removeFromCart(item.productId, item.storeId)}
                                                                        className="btn btn-sm btn-danger"
                                                                    >
                                                                        <i className="ti-close"></i>
                                                                    </button>
                                                                </span>
                                                                <p className="text-muted" style={{ fontSize: '12px' }}>{item.storeName}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div style={{ padding: '15px', textAlign: 'center', color: '#888' }}>
                                                        Giỏ hàng trống
                                                    </div>
                                                )}
                                            </div>

                                            {cartDetails.length > 0 && (
                                                <div className="mini-cart-action clearfix">
                                                    <span className="mini-checkout-price">
                                                        Tổng tiền:{' '}
                                                        <span>
                                                            {cartDetails
                                                                .reduce((total, item) => total + item.price * item.quantity, 0)
                                                                .toLocaleString('vi-VN', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                })}
                                                        </span>
                                                    </span>
                                                    <div className="mini-btn">
                                                        <Link to="/checkout" className="view-cart-btn s1">Thanh toán</Link>
                                                        <Link to="/cart" className="view-cart-btn">Giỏ hàng</Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="close-form">
                                        <Link onClick={ClickHandler} className="theme-btn" to="/products">
                                            Quay lại mua hàng
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
