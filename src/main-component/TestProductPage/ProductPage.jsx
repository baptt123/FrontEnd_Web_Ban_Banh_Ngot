import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/ProductAPI.jsx';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Lỗi khi tải sản phẩm');
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = storedCart.find(item => item.productId === product.productId);

    let updatedCart;
    if (existingItem) {
      updatedCart = storedCart.map(item =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...storedCart,
        {
          productId: product.productId,
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1
        }
      ];
    }

    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    alert(`Đã thêm "${product.name}" vào giỏ hàng.`);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Danh sách sản phẩm</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.productId} className="border rounded shadow p-4 flex flex-col">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
              <p className="text-gray-700 text-sm mb-2">{product.description}</p>
              <p className="text-blue-600 font-bold mb-1">{product.price?.toLocaleString()}₫</p>
              <p className="text-sm text-gray-500">Còn lại: {product.stock}</p>
              <p className="text-sm text-gray-500 mb-3">
                Danh mục: {product.categoryName || product.category?.name || 'Không rõ'}
              </p>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">Không có sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
