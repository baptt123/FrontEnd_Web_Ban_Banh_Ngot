import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { addToCart } from "../../store/actions/action";
import './shop-page.css';
import FilterSidebar from './filterSlideBar.jsx';

const ShopPageSection = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [priceFilter, setPriceFilter] = useState('');

    // Thêm trạng thái cho phân trang:
    const [page, setPage] = useState(0);
    const [size] = useState(8);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchCategories();
        fetchStores();

    }, []);

    useEffect(() => {
        fetchProducts(selectedStore, selectedCategory, priceFilter, page, size);
    }, [selectedStore, selectedCategory, priceFilter, page, size]);

    const fetchProducts = async (storeId = null, categoryId = null, price = '', pageNum = 0, pageSize = 12) => {
        try {
            setIsLoading(true);
            let url = `http://localhost:8080/api/products?deleted=0&page=${pageNum}&size=${pageSize}`;

            if (storeId) url += `&storeId=${storeId}`;
            if (categoryId) url += `&categoryId=${categoryId}`;

            if (price === '1') url += `&maxPrice=100000`;
            else if (price === '2') url += `&minPrice=100000&maxPrice=500000`;
            else if (price === '3') url += `&minPrice=500000`;

            const apiCall = axios.get(url);
            const delay = new Promise(resolve => setTimeout(resolve, 300));
            const [response] = await Promise.all([apiCall, delay]);

            // Giả sử backend trả về dạng { content: [...], totalPages: n, number: currentPage }
            const data = response.data;

            const mappedProducts = data.content.map(item => ({
                productId: item.productId,
                proImg: item.imageUrl,
                name: item.name,
                price: item.price,
            }));

            setProducts(mappedProducts);
            setTotalPages(data.totalPages);
            setPage(data.number);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories');
            setCategories(response.data);
            console.log('Categories fetched:', response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchStores = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/store');
            setStores(response.data);
            console.log('Stores fetched:', response.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
    };

    const handleStoreChange = (storeId) => {
        setSelectedStore(storeId);
        setPage(0);
    };

    const handleCategoryClick = (categoryId, categoryName = '') => {
        setSelectedCategory(categoryId);
        setSelectedCategoryName(categoryName);
        setPage(0);
    };

    const handleFilterChange = (filters) => {
        setPriceFilter(filters.price);
        setPage(0);
    };
    const addToCartProduct = (product, qty = 1) => {
        addToCart(product, qty);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };
    const renderPagination = () => {
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`pagination-page ${page === i ? 'active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i + 1}
                </button>
            );
        }

        return (
            <div className="pagination">
                {pages}
            </div>
        );
    };

    return (
        <div className="myshop-section section-padding">
            <FilterSidebar
                onFilterChange={handleFilterChange} />

            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <div style={{ fontSize: '20px', color: '#4CAF50' }}>
                        Đang tải sản phẩm...
                    </div>
                </div>
            )}

            <h2>Danh mục sản phẩm</h2>
            <div className="category-list">
                <div
                    className={`category-item ${selectedCategory === null ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(null, '')}
                >
                    <img
                        src="https://media.istockphoto.com/id/623709028/vi/anh/b%C3%A0n-v%E1%BB%9Bi-nhi%E1%BB%81u-lo%E1%BA%A1i-b%C3%A1nh-quy-b%C3%A1nh-tart-b%C3%A1nh-ng%E1%BB%8Dt-b%C3%A1nh-cupcake-v%C3%A0-cakepops.jpg?s=1024x1024&w=is&k=20&c=jDseQUaNZhbBTXHdqPiwg7al6qY3YXPSKupfXlk9fq4="
                        alt="All Products"
                    />
                    <p>Tất cả sản phẩm</p>
                </div>

                {categories.map((category) => (
                    <div
                        key={category.categoryId}
                        className={`category-item ${selectedCategory === category.categoryId ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category.categoryId, category.name)}
                    >
                        <img src={category.imageUrl || 'https://via.placeholder.com/150'} alt={category.name} />
                        <p>{category.name}</p>
                    </div>
                ))}
            </div>

            <h2>Chọn cửa hàng:</h2>
            <div className="store-radio-group">
                <label
                    className={`store-radio-item ${selectedStore === null ? 'checked' : ''}`}
                >
                    <input
                        type="radio"
                        name="store"
                        value=""
                        checked={selectedStore === null}
                        onChange={() => handleStoreChange(null)}
                    />
                    Tất cả cửa hàng
                </label>
                {stores.map((store) => (
                    <label key={store.storeId}
                        className={`store-radio-item ${selectedStore === store.storeId ? 'checked' : ''}`}>
                        <input
                            type="radio"
                            name="store"
                            value={store.storeId}
                            checked={selectedStore === store.storeId}
                            onChange={() => handleStoreChange(store.storeId)}
                        />
                        {store.name}
                    </label>
                ))}
            </div>

            <h2>
                {selectedCategory
                    ? `Sản phẩm của: ${selectedCategoryName.toUpperCase()}`
                    : 'Danh sách sản phẩm'}
            </h2>

            <div className="myshop-container">
                <div className="myshop-row">
                    {products.map((product) => (
                        <div className="myshop-col" key={product.productId}>
                            <div className="myshop-product-single">
                                <div className="myshop-product-item">
                                    <div className="myshop-product-img">
                                        <img src={product.proImg} alt={product.name} />
                                    </div>
                                </div>
                                <div className="myshop-product-text">
                                    <h2>
                                        <a href="#">
                                            {product.name}
                                        </a>
                                    </h2>
                                    <div className="myshop-product-price">
                                        <ul>
                                            <li>{product.price ? product.price.toLocaleString('vi-VN') : ''}₫</li>
                                        </ul>
                                    </div>
                                    <button
                                        onClick={() => addToCartProduct(product)}
                                        className="myshop-cart-btn"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {renderPagination()}
        </div>
    );
};

export default connect(null, { addToCart })(ShopPageSection);
