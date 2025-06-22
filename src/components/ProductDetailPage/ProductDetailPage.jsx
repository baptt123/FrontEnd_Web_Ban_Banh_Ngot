import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import Slider from 'react-slick';
import './product-detail.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Spinner() {
    return (
        <div style={{textAlign: 'center', padding: 50}}>
            <div className="loader"></div>
            <p>Đang tải sản phẩm...</p>
        </div>
    );
}

const ProductDetailPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedStoreId, setSelectedStoreId] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [newRating, setNewRating] = useState(5);
    const sliderRef = useRef(null);
    const navigate = useNavigate();
    const detailRef = useRef(null);
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const fetchProductDetail = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/products/${id}`);
            await new Promise(resolve => setTimeout(resolve, 300));
            setProduct(response.data);
            setQuantity(1);
            if (response.data.stores && response.data.stores.length > 0) {
                setSelectedStoreId(response.data.stores[0].storeId);
            }
        } catch (error) {
            console.error('Error fetching product detail:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRatings = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/rating/${id}`, {
                withCredentials: true // Gửi cookie JWT xuống backend
            });
            setRatings(res.data);
        } catch (error) {
            console.error('Lỗi khi lấy đánh giá:', error);
        }
    };

    const handleSubmitRating = async () => {
        try {
            await axios.post(
                `http://localhost:8080/api/rating`,
                {productId: product.productId, rating: newRating},
                {withCredentials: true}
            );
            alert("Đánh giá thành công!");
            fetchRatings();
        } catch (error) {
            if (error.response?.status === 401) {
                alert("Bạn cần đăng nhập để đánh giá.");
            } else {
                alert("Lỗi khi gửi đánh giá.");
            }
        }
    };

    useEffect(() => {
        fetchProductDetail();
    }, [id]);

    useEffect(() => {
        fetchRatings();
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/products?size=20`)
            .then(response => setRelatedProducts(response.data.content || []))
            .catch(error => console.error('Error fetching related products:', error));
    }, []);

    const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);
    const handleIncrease = () => setQuantity(quantity + 1);
    const handleQuantityChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value) || value <= 0) value = 1;
        setQuantity(value);
    };
    const handleStoreChange = (e) => setSelectedStoreId(Number(e.target.value));

    const handleAddToCart = async () => {
        try {
            if (!selectedStoreId) return alert("Vui lòng chọn cửa hàng!");
            const cartItem = {productId: product.productId, storeId: selectedStoreId, quantity};
            await axios.post(`http://localhost:8080/api/cart/validate`, cartItem, {withCredentials: true});

            const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingIndex = localCart.findIndex(
                item => item.productId === product.productId && item.storeId === selectedStoreId
            );
            if (existingIndex !== -1) localCart[existingIndex].quantity += quantity;
            else localCart.push(cartItem);

            localStorage.setItem('cartItems', JSON.stringify(localCart));
            alert("Đã thêm vào giỏ hàng!");
        } catch (error) {
            if (error.response?.status === 401) {
                alert("Bạn cần đăng nhập để thêm vào giỏ hàng.");
            } else if (error.response?.data) {
                alert(error.response.data);
            } else {
                alert("Có lỗi xảy ra.");
            }
        }
    };

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        responsive: [
            {breakpoint: 1024, settings: {slidesToShow: 3, slidesToScroll: 3}},
            {breakpoint: 768, settings: {slidesToShow: 2, slidesToScroll: 2}},
            {breakpoint: 480, settings: {slidesToShow: 1, slidesToScroll: 1}}
        ]
    };

    if (loading || !product) return <Spinner/>;

    return (
        <div className="product-detail-container">
            <h1 className="product-detail-title" ref={detailRef}>Chi tiết sản phẩm</h1>
            <div className="product-detail-main">
                <div className="back-button" onClick={() => navigate('/products')}>
                    ← Quay về trang sản phẩm
                </div>
                <img src={product.imageUrl} alt={product.name} className="main-image"/>
                <div className="product-info">
                    <h2 className="product-title">{product.name?.toUpperCase()}</h2>
                    <p><strong>Danh mục:</strong> {product.categoryName}</p>
                    <div>
                        <label><b>Chọn cửa hàng để mua:</b></label>
                        <select
                            value={selectedStoreId || ""}
                            onChange={handleStoreChange}
                            style={{marginBottom: 12}}
                        >
                            {product.stores.map(store => (
                                <option key={store.storeId} value={store.storeId}>
                                    {store.storeName} (Còn {store.stock})
                                </option>
                            ))}
                        </select>
                    </div>
                    <p><strong>Giá:</strong> {product.price?.toLocaleString('vi-VN')} ₫</p>
                    <p><strong>Mô tả:</strong> {product.description}</p>

                    <div className="quantity-selector">
                        <button onClick={handleDecrease}>-</button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                        />
                        <button onClick={handleIncrease}>+</button>
                    </div>

                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        Thêm vào giỏ hàng
                    </button>

                    <div style={{marginTop: 20}}>
                        <h4>Danh sách cửa hàng có sản phẩm này:</h4>
                        <ul style={{paddingLeft: 15}}>
                            {product.stores.map(store => (
                                <li key={store.storeId}
                                    style={{
                                        fontWeight: selectedStoreId === store.storeId ? 'bold' : 'normal',
                                        color: store.stock > 0 ? '#333' : '#aaa'
                                    }}
                                >
                                    {store.storeName} - Số lượng còn: {store.stock}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ĐÁNH GIÁ SẢN PHẨM */}
            <div className="product-rating-section" style={{marginTop: 40}}>
                <h3 style={{borderBottom: '1px solid #ddd', paddingBottom: 8}}>Đánh giá sản phẩm</h3>

                {/* Gửi đánh giá mới */}
                <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                    <label style={{marginRight: 8}}>Chọn số sao:</label>
                    <select
                        value={newRating}
                        onChange={e => setNewRating(parseInt(e.target.value))}
                        style={{padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc'}}
                    >
                        {[5, 4, 3, 2, 1].map(star => (
                            <option key={star} value={star}>{'★'.repeat(star)} ({star})</option>
                        ))}
                    </select>
                    <button
                        onClick={handleSubmitRating}
                        style={{
                            marginLeft: 12,
                            padding: '6px 12px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer'
                        }}
                    >
                        Gửi đánh giá
                    </button>
                </div>

                {/* Danh sách đánh giá */}
                {ratings.length === 0 ? (
                    <p style={{fontStyle: 'italic', color: '#666'}}>Chưa có đánh giá nào.</p>
                ) : (
                    ratings.map((r, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                marginBottom: 16,
                                borderBottom: '1px solid #eee',
                                paddingBottom: 12
                            }}
                        >
                            <img
                                src={r.avatarUrl}
                                alt="avatar"
                                style={{width: 48, height: 48, borderRadius: '50%', marginRight: 12}}
                            />
                            <div>
                                <div style={{fontWeight: 'bold'}}>{r.fullName}</div>
                                <div style={{color: '#f0a500', margin: '4px 0'}}>
                                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                                </div>
                                <div style={{fontSize: 12, color: '#777'}}>
                                    {new Date(r.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Sản phẩm liên quan */}
            <h3 className="related-title">Sản phẩm liên quan</h3>
            <Slider ref={sliderRef} {...sliderSettings}>
                {relatedProducts.map((item) => {
                    const isActive = item.productId.toString() === id.toString();
                    return (
                        <div
                            key={item.productId}
                            className={`related-product-card ${isActive ? 'active-related' : ''}`}
                            onClick={() => {
                                if (!isActive) navigate(`/products/${item.productId}`);
                            }}
                            style={{cursor: 'pointer'}}
                        >
                            <img src={item.imageUrl} alt={item.name}/>
                            <p className="related-product-name">{item.name}</p>
                            {isActive && <div className="current-label">Đang xem</div>}
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default ProductDetailPage;
