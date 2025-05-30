import React from 'react';

const SectionTitle = ({ title, subtitle }) => {
    return (
        <div className="orico-section-title">
            <span>“<span style={{ color: 'green' }}>{subtitle}</span>”</span>
            <h2>{title}</h2>
        </div>
    );
};

export default SectionTitle;