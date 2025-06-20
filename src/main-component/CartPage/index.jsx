// import React, { Fragment, useEffect, useState } from "react";
// import HeaderTopS2 from '../../components/HeaderTopS2/HeaderTopS2.jsx';
// import Navbar from '../../components/Navbar/Navbar';
// import PageTitle from "../../components/pagetitle/PageTitle";
// import Scrollbar from "../../components/scrollbar/scrollbar";
// import { Link } from "react-router-dom";
// import Footer from "../../components/footer/Footer";
// import Logo from '../../images/logo.svg';
// import { totalPrice } from "../../utils";
//
// const CartPage = () => {
//   const ClickHandler = () => window.scrollTo(10, 0);
//   const [carts, setCarts] = useState([]);
//
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
//     setCarts(storedCart);
//   }, []);
//
//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(carts));
//   }, [carts]);
//
//   const checkProductStock = async (productId, storeId, quantity) => {
//     try {
//       const res = await fetch("/api/cart/check", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ productId, storeId, quantity })
//       });
//       return res.ok;
//     } catch (err) {
//       return false;
//     }
//   };
//
//   const incrementQuantity = async (id) => {
//     const item = carts.find(p => p.productId === id);
//     const newQty = item.quantity + 1;
//     const isValid = await checkProductStock(item.productId, item.storeId, newQty);
//     if (!isValid) {
//       alert("Sản phẩm vượt quá tồn kho.");
//       return;
//     }
//
//     setCarts(prev => prev.map(i =>
//         i.productId === id ? { ...i, quantity: newQty } : i
//     ));
//   };
//
//   const decrementQuantity = async (id) => {
//     const item = carts.find(p => p.productId === id);
//     const newQty = item.quantity > 1 ? item.quantity - 1 : 1;
//
//     const isValid = await checkProductStock(item.productId, item.storeId, newQty);
//     if (!isValid) {
//       alert("Không thể cập nhật số lượng.");
//       return;
//     }
//
//     setCarts(prev => prev.map(i =>
//         i.productId === id ? { ...i, quantity: newQty } : i
//     ));
//   };
//
//   const removeFromCart = (id) => {
//     setCarts(prev => prev.filter(item => item.productId !== id));
//   };
//
//   const updateCart = () => {
//     setCarts(prev => [...prev]);
//     console.log('Cập nhật giỏ hàng thành công');
//   };
//
//   return (
//       <Fragment>
//         <HeaderTopS2 />
//         <Navbar hclass={'wpo-site-header'} Logo={Logo} />
//         <PageTitle pageTitle={"Giỏ Hàng"} pagesub={"Giỏ Hàng"} />
//         <div className="cart-area section-padding">
//           <div className="container">
//             <div className="form">
//               <div className="cart-wrapper">
//                 <div className="row">
//                   <div className="col-12">
//                     <form action="cart">
//                       <table className="table-responsive cart-wrap">
//                         <thead>
//                         <tr>
//                           <th className="images images-b">Hình ảnh</th>
//                           <th className="product-2">Tên sản phẩm</th>
//                           <th className="pr">Số lượng</th>
//                           <th className="ptice">Giá</th>
//                           <th className="stock">Thành tiền</th>
//                           <th className="remove remove-b">Hành động</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {carts && carts.length > 0 ? (
//                             carts.map((catItem, crt) => (
//                                 <tr key={catItem.productId || crt}>
//                                   <td className="images">
//                                     <img
//                                         src={catItem.imageUrl || '/default-product.jpg'}
//                                         alt={catItem.name || 'Sản phẩm'}
//                                         onError={(e) => {
//                                           e.target.src = '/default-product.jpg';
//                                         }}
//                                     />
//                                   </td>
//                                   <td className="product">
//                                     <ul>
//                                       <li className="first-cart">{catItem.name || 'Sản phẩm chưa xác định'}</li>
//                                     </ul>
//                                   </td>
//                                   <td className="stock">
//                                     <div className="pro-single-btn">
//                                       <div className="quantity cart-plus-minus">
//                                     <span
//                                         className="dec qtybutton"
//                                         onClick={() => decrementQuantity(catItem.productId)}
//                                         style={{ cursor: 'pointer', userSelect: 'none' }}
//                                     >
//                                       -
//                                     </span>
//                                         <input
//                                             value={catItem.quantity || 1}
//                                             type="text"
//                                             readOnly
//                                         />
//                                         <span
//                                             className="inc qtybutton"
//                                             onClick={() => incrementQuantity(catItem.productId)}
//                                             style={{ cursor: 'pointer', userSelect: 'none' }}
//                                         >
//                                       +
//                                     </span>
//                                       </div>
//                                     </div>
//                                   </td>
//                                   <td className="ptice">
//                                     {(catItem.price * catItem.quantity).toLocaleString('vi-VN', {
//                                       style: 'currency',
//                                       currency: 'VND',
//                                     })}
//                                   </td>
//                                   <td className="stock">
//                                     {(catItem.price * catItem.quantity).toLocaleString('vi-VN', {
//                                       style: 'currency',
//                                       currency: 'VND',
//                                     })}
//                                   </td>
//                                   <td className="action">
//                                     <ul>
//                                       <li
//                                           className="w-btn"
//                                           onClick={() => removeFromCart(catItem.productId)}
//                                           style={{ cursor: 'pointer' }}
//                                       >
//                                         <i className="fi ti-trash"></i>
//                                       </li>
//                                     </ul>
//                                   </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                               <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
//                                 Giỏ hàng của bạn đang trống
//                               </td>
//                             </tr>
//                         )}
//                         </tbody>
//                       </table>
//                     </form>
//                     <div className="submit-btn-area">
//                       <ul>
//                         <li>
//                           <Link onClick={ClickHandler} className="theme-btn" to="/shop">
//                             Tiếp tục mua hàng
//                           </Link>
//                         </li>
//                         <li>
//                           <button
//                               type="button"
//                               className="theme-btn"
//                               onClick={updateCart}
//                           >
//                             Cập nhật giỏ hàng
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="cart-product-list">
//                       <ul>
//                         <li>Tổng sản phẩm <span>( {carts?.length || 0} )</span></li>
//                         <li>
//                           Tạm tính{" "}
//                           <span>
//                           {totalPrice(carts || []).toLocaleString('vi-VN', {
//                             style: 'currency',
//                             currency: 'VND',
//                           })}
//                         </span>
//                         </li>
//                         <li>Thuế VAT <span>0₫</span></li>
//                         <li>Thuế môi trường <span>0₫</span></li>
//                         <li>Phí giao hàng <span>0₫</span></li>
//                         <li className="cart-b">
//                           Tổng cộng{" "}
//                           <span>
//                           {totalPrice(carts || []).toLocaleString('vi-VN', {
//                             style: 'currency',
//                             currency: 'VND',
//                           })}
//                         </span>
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="submit-btn-area">
//                       <ul>
//                         <li>
//                           <Link
//                               onClick={ClickHandler}
//                               className="theme-btn"
//                               to="/checkout"
//                           >
//                             Tiến hành thanh toán
//                           </Link>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//         <Scrollbar />
//       </Fragment>
//   );
// };
//
// export default CartPage;


import React, { Fragment, useEffect, useState } from "react";
import HeaderTopS2 from '../../components/HeaderTopS2/HeaderTopS2.jsx';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Logo from '../../images/logo.svg';

const CartPage = () => {
  const ClickHandler = () => window.scrollTo(10, 0);
  const [cartItems, setCartItems] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cartItems từ localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, []);

  // Gửi cartItems lên backend để lấy thông tin chi tiết
  useEffect(() => {
    if (!cartItems.length) {
      setCartDetails([]);
      return;
    }

    setLoading(true);

    fetch("http://localhost:8080/api/cart/get-cart", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => setCartDetails(data))
        .catch(() => setCartDetails([]))
        .finally(() => setLoading(false));
  }, [cartItems]);

  // Đồng bộ cartItems vào localStorage
  useEffect(() => {
    if (!cartItems.length) localStorage.removeItem('cartItems');
    else localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const checkProductStock = async (productId, storeId, quantity) => {
    try {
      const res = await fetch("http://localhost:8080/api/cart/validate", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, storeId, quantity })
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const incrementQuantity = async (productId, storeId) => {
    const item = cartItems.find(p => p.productId === productId && p.storeId === storeId);
    if (!item) return;
    const newQty = item.quantity + 1;
    const isValid = await checkProductStock(productId, storeId, newQty);
    if (!isValid) {
      alert("Sản phẩm vượt quá tồn kho.");
      return;
    }
    setCartItems(prev =>
        prev.map(i =>
            i.productId === productId && i.storeId === storeId
                ? { ...i, quantity: newQty }
                : i
        )
    );
  };

  const decrementQuantity = async (productId, storeId) => {
    const item = cartItems.find(p => p.productId === productId && p.storeId === storeId);
    if (!item) return;
    const newQty = item.quantity > 1 ? item.quantity - 1 : 1;
    const isValid = await checkProductStock(productId, storeId, newQty);
    if (!isValid) {
      alert("Không thể cập nhật số lượng.");
      return;
    }
    setCartItems(prev =>
        prev.map(i =>
            i.productId === productId && i.storeId === storeId
                ? { ...i, quantity: newQty }
                : i
        )
    );
  };

  const removeFromCart = (productId, storeId) => {
    setCartItems(prev => prev.filter(item => !(item.productId === productId && item.storeId === storeId)));
  };

  const updateCart = () => {
    setCartItems(prev => [...prev]);
    alert('Cập nhật giỏ hàng thành công');
  };

  const calcTotalPrice = () => {
    return cartDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
      <Fragment>
        <HeaderTopS2 />
        <Navbar hclass={'wpo-site-header'} Logo={Logo} />
        <PageTitle pageTitle={"Giỏ Hàng"} pagesub={"Giỏ Hàng"} />
        <div className="cart-area section-padding">
          <div className="container">
            <div className="form">
              <div className="cart-wrapper">
                <div className="row">
                  <div className="col-12">
                    <form action="cart">
                      <table className="table-responsive cart-wrap">
                        <thead>
                        <tr>
                          <th className="images images-b">Hình ảnh</th>
                          <th className="product-2">Tên sản phẩm</th>
                          <th className="pr">Cửa hàng</th>
                          <th className="pr">Số lượng</th>
                          <th className="ptice">Giá</th>
                          <th className="stock">Thành tiền</th>
                          <th className="remove remove-b">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loading ? (
                            <tr>
                              <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                                Đang tải thông tin giỏ hàng...
                              </td>
                            </tr>
                        ) : cartDetails && cartDetails.length > 0 ? (
                            cartDetails.map((catItem, crt) => (
                                <tr key={`${catItem.productId}_${catItem.storeId}_${crt}`}>
                                  <td className="images">
                                    <img
                                        src={catItem.imageUrl || '/default-product.jpg'}
                                        alt={catItem.productName || 'Sản phẩm'}
                                        onError={(e) => {
                                          e.target.src = '/default-product.jpg';
                                        }}
                                    />
                                  </td>
                                  <td className="product">
                                    <ul>
                                      <li className="first-cart">{catItem.productName || 'Sản phẩm chưa xác định'}</li>
                                    </ul>
                                  </td>
                                  <td className="product">
                                    <ul>
                                      <li>{catItem.storeName || 'N/A'}</li>
                                    </ul>
                                  </td>
                                  <td className="stock">
                                    <div className="pro-single-btn">
                                      <div className="quantity cart-plus-minus">
                                    <span
                                        className="dec qtybutton"
                                        onClick={() => decrementQuantity(catItem.productId, catItem.storeId)}
                                        style={{ cursor: 'pointer', userSelect: 'none' }}
                                    >
                                      -
                                    </span>
                                        <input
                                            value={catItem.quantity || 1}
                                            type="text"
                                            readOnly
                                        />
                                        <span
                                            className="inc qtybutton"
                                            onClick={() => incrementQuantity(catItem.productId, catItem.storeId)}
                                            style={{ cursor: 'pointer', userSelect: 'none' }}
                                        >
                                      +
                                    </span>
                                      </div>
                                    </div>
                                    <div style={{ fontSize: 12, color: '#888' }}>
                                      Tồn kho: {catItem.stock}
                                    </div>
                                  </td>
                                  <td className="ptice">
                                    {(catItem.price).toLocaleString('vi-VN', {
                                      style: 'currency',
                                      currency: 'VND',
                                    })}
                                  </td>
                                  <td className="stock">
                                    {(catItem.price * catItem.quantity).toLocaleString('vi-VN', {
                                      style: 'currency',
                                      currency: 'VND',
                                    })}
                                  </td>
                                  <td className="action">
                                    <ul>
                                      <li
                                          className="w-btn"
                                          onClick={() => removeFromCart(catItem.productId, catItem.storeId)}
                                          style={{ cursor: 'pointer' }}
                                      >
                                        <i className="fi ti-trash"></i>
                                      </li>
                                    </ul>
                                  </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                              <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                                Giỏ hàng của bạn đang trống
                              </td>
                            </tr>
                        )}
                        </tbody>
                      </table>
                    </form>
                    <div className="submit-btn-area">
                      <ul>
                        <li>
                          <Link onClick={ClickHandler} className="theme-btn" to="/shop">
                            Tiếp tục mua hàng
                          </Link>
                        </li>
                        <li>
                          <button
                              type="button"
                              className="theme-btn"
                              onClick={updateCart}
                          >
                            Cập nhật giỏ hàng
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="cart-product-list">
                      <ul>
                        <li>Tổng sản phẩm <span>( {cartDetails?.length || 0} )</span></li>
                        <li>
                          Tạm tính{" "}
                          <span>
                          {calcTotalPrice().toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </span>
                        </li>
                        <li>Thuế VAT <span>0₫</span></li>
                        <li>Thuế môi trường <span>0₫</span></li>
                        <li>Phí giao hàng <span>0₫</span></li>
                        <li className="cart-b">
                          Tổng cộng{" "}
                          <span>
                          {calcTotalPrice().toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </span>
                        </li>
                      </ul>
                    </div>
                    <div className="submit-btn-area">
                      <ul>
                        <li>
                          <Link
                              onClick={ClickHandler}
                              className="theme-btn"
                              to="/checkout"
                          >
                            Tiến hành thanh toán
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Scrollbar />
      </Fragment>
  );
};

export default CartPage;
