import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import SectionTitle from '../SectionTitle/SectionTitle';
import api from "../../api";
import { addToCart } from "../../store/actions/action";
import PopupQuickview from '../PopupQuickview/PopupQuickview';

import Shape1 from '../../images/product/shape-1.png';
import Shape2 from '../../images/product/shape-2.png';

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const ProductSection = ({ addToCart }) => {
    const [filter, setFilter] = useState('*');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseClick = () => {
        setSelectedProduct(null);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const productsArray = await api();
            setProducts(productsArray);
        };
        fetchProducts();
    }, []);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const filteredProducts = products.filter((product) =>
        filter === '*' || (product.category && product.category.includes(filter.slice(1)))
    );

    const addToCartProduct = (product, qty = 1) => {
        addToCart(product, qty);
    };

    return (
        <section className="orico-product-section section-padding">
            <div className="p-shape-1"><img src={Shape1} alt="" /></div>
            <div className="p-shape-2"><img src={Shape2} alt="" /></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <SectionTitle subtitle={'BEST PRODUCT'} title={'Latest Products'} />
                    </div>
                </div>
                <div className="product-wrap">
                    <div className="row">
                        <div className="col col-xs-12 sortable-gallery">
                            <div className="gallery-filters">
                                <ul className="product-filter-btn">
                                    <li>
                                        <button className={`product-btn ${filter === '*' ? 'current' : ''}`} onClick={() => handleFilterChange('*')}>
                                            all
                                        </button>
                                    </li>
                                    <li>
                                        <button className={`product-btn ${filter === '.fruit' ? 'current' : ''}`} onClick={() => handleFilterChange('.fruit')}>
                                            fruits
                                        </button>
                                    </li>
                                    <li>
                                        <button className={`product-btn ${filter === '.vegetables' ? 'current' : ''}`} onClick={() => handleFilterChange('.vegetables')}>
                                            vegetables
                                        </button>
                                    </li>
                                    <li>
                                        <button className={`product-btn ${filter === '.milk' ? 'current' : ''}`} onClick={() => handleFilterChange('.milk')}>
                                            milk & cream
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="gallery-container gallery-fancybox masonry-gallery row">
                                {filteredProducts.length > 0 &&
                                    filteredProducts.slice(0, 8).map((product, index) => (
                                        <div key={index} className={`col-lg-3 col-md-6 col-12 custom-grid ${product.category}`}>
                                            <div className="orico-product-single">
                                                <div className="orico-product-item">
                                                    <div className="orico-product-img">
                                                        <img src={product.proImg} alt={product.title} />
                                                    </div>
                                                </div>
                                                <div className="orico-product-text">
                                                    <h2><Link onClick={ClickHandler} to={`/shop-single/${product.slug}`}>{product.title}</Link></h2>
                                                    <div className="product-price">
                                                        <ul>
                                                            <li>${product.delPrice}</li>
                                                            {product.delPrice && <li>${product.price}</li>}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="orico-product-text-hide">
                                                    <ul className="orico-product-link">
                                                        <li>
                                                            <a href="/" className="product-icon-hover">
                                                                <i className="fi ti-heart"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <button 
                                                                onClick={() => addToCartProduct(product)} 
                                                                className="product-icon-hover"
                                                            >
                                                                <i className="fi flaticon-shopping-cart" aria-hidden="true"></i>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button 
                                                                onClick={() => handleProductClick(product)} 
                                                                className="product-icon-hover"
                                                            >
                                                                <i className="fi ti-eye"></i>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                    <h2><Link onClick={ClickHandler} to={`/shop-single/${product.slug}`}>{product.title}</Link></h2>
                                                    <div className="product-price">
                                                        <ul>
                                                            <li>${product.delPrice}</li>
                                                            {product.delPrice && <li>${product.price}</li>}
                                                        </ul>
                                                    </div>
                                                    <button 
                                                        onClick={() => addToCartProduct(product)} 
                                                        className="cart-btn product-icon-hover"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PopupQuickview product={selectedProduct} handleCloseClick={handleCloseClick}/>
            
            {/* CSS for hover effect */}
            <style jsx>{`
                .orico-product-single:hover .orico-product-text-hide {
                    background-color: rgba(34, 197, 94, 0.95) !important; /* Green background overlay on hover */
                }

                .product-icon-hover {
                    color: #333; /* Default icon color */
                    border-color: transparent; /* Default border color */
                    transition: color 0.3s ease, border-color 0.3s ease; /* Smooth transition */
                }

                .product-icon-hover:hover {
                    color: #fff !important; /* White color on hover for better contrast */
                    border-color: rgba(255, 255, 255, 0.3) !important; /* Light border on hover */
                }

                .product-icon-hover:hover i {
                    color: #fff !important; /* White icon on hover */
                }

                .cart-btn.product-icon-hover {
                    background-color: rgba(255, 255, 255, 0.2); /* Semi-transparent white background */
                    color: #fff; /* White text */
                    border: 1px solid rgba(255, 255, 255, 0.3); /* Light border */
                }

                .cart-btn.product-icon-hover:hover {
                    background-color: #fff !important; /* White background on hover */
                    color: #22c55e !important; /* Green text on hover */
                    border-color: #fff !important; /* White border on hover */
                }
            `}</style>
        </section>
    );
};

export default connect(null, { addToCart })(ProductSection);