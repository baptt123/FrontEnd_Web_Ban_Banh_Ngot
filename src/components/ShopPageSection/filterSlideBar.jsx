import React, { useState } from 'react';
import './shop-page.css';

const FilterSidebar = ({ onFilterChange }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState('');

    const handlePriceChange = (value) => {
        setSelectedPrice(value);
        onFilterChange({ price: value });
         setIsSidebarOpen(false);
    };

    return (
        <>
            <button
                className="filter-toggle-btn"
                onClick={() => setIsSidebarOpen(true)}
            >
                &#9776; Lọc
            </button>

            <div className={`filter-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="filter-sidebar-header">
                    <h3>Bộ lọc</h3>
                    <button onClick={() => setIsSidebarOpen(false)}>Đóng</button>
                </div>

                {/* Filter khoảng giá */}
                <div className="filter-group">
                    <label style={{ fontWeight: 'bold' }}>Khoảng giá:</label>
                    <div className="filter-option">
                        <input
                            type="radio"
                            id="price-all"
                            name="price"
                            checked={selectedPrice === ''}
                            onChange={() => handlePriceChange('')}
                        />
                        <label htmlFor="price-all">Tất cả</label>
                    </div>
                    <div className="filter-option">
                        <input
                            type="radio"
                            id="price-1"
                            name="price"
                            checked={selectedPrice === '1'}
                            onChange={() => handlePriceChange('1')}
                        />
                        <label htmlFor="price-1">Dưới 100k</label>
                    </div>
                    <div className="filter-option">
                        <input
                            type="radio"
                            id="price-2"
                            name="price"
                            checked={selectedPrice === '2'}
                            onChange={() => handlePriceChange('2')}
                        />
                        <label htmlFor="price-2">100k - 500k</label>
                    </div>
                    <div className="filter-option">
                        <input
                            type="radio"
                            id="price-3"
                            name="price"
                            checked={selectedPrice === '3'}
                            onChange={() => handlePriceChange('3')}
                        />
                        <label htmlFor="price-3">Trên 500k</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterSidebar;