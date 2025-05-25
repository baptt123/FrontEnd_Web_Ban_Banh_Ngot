// import React, { Fragment } from "react";
// import HeaderTop from '../../components/HeaderTop/HeaderTop';
// import Navbar from '../../components/Navbar/Navbar';
// import PageTitle from "../../components/pagetitle/PageTitle";
// import Scrollbar from "../../components/scrollbar/scrollbar";
// import {  Grid } from "@mui/material";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { totalPrice } from "../../utils";
// import {
//   removeFromCart,
//   incrementQuantity,
//   decrementQuantity,
// } from "../../store/actions/action";
// import Footer from "../../components/footer/Footer";
// import Logo from '../../images/logo.svg'

// const CartPage = (props) => {
//   const ClickHandler = () => {
//     window.scrollTo(10, 0);
//   };

//   const { carts } = props;

//   return (
//     <Fragment>
//       <HeaderTop />
//       <Navbar hclass={'wpo-site-header'} Logo={Logo} />
//       <PageTitle pageTitle={"Cart"} pagesub={"Cart"} />
//       <div className="cart-area section-padding">
//         <div className="container">
//           <div className="form">
//             <div className="cart-wrapper">
//               <div className="row">
//                 <div className="col-12">
//                   <form action="cart">
//                     <table className="table-responsive cart-wrap">
//                       <thead>
//                         <tr>
//                           <th className="images images-b">Image</th>
//                           <th className="product-2">Product Name</th>
//                           <th className="pr">Quantity</th>
//                           <th className="ptice">Price</th>
//                           <th className="stock">Total Price</th>
//                           <th className="remove remove-b">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {carts &&
//                           carts.length > 0 &&
//                           carts.map((catItem, crt) => (
//                             <tr key={crt}>
//                               <td className="images">
//                                 <img src={catItem.proImg} alt="" />
//                               </td>
//                               <td className="product">
//                                 <ul>
//                                   <li className="first-cart">
//                                     {catItem.title}
//                                   </li>
//                                   <li>Brand : {catItem.brand}</li>
//                                   <li>Size : {catItem.size}</li>
//                                 </ul>
//                               </td>
//                               <td className="stock">
//                                 <div className="pro-single-btn">
//                                   <Grid className="quantity cart-plus-minus">
//                                     <span
//                                       className="dec qtybutton"
//                                       onClick={() =>
//                                         props.decrementQuantity(catItem.id)
//                                       }
//                                     >
//                                       -
//                                     </span>
//                                     <input value={catItem.qty} type="text" />
//                                     <span
//                                       className="inc qtybutton"
//                                       onClick={() =>
//                                         props.incrementQuantity(catItem.id)
//                                       }
//                                     >
//                                       +
//                                     </span>
//                                   </Grid>
//                                 </div>
//                               </td>
//                               <td className="ptice">${catItem.qty * catItem.price}</td>
//                               <td className="stock">${catItem.qty * catItem.price}</td>
//                               <td className="action">
//                                 <ul>
//                                   <li
//                                     className="w-btn"
//                                     onClick={() =>
//                                       props.removeFromCart(catItem.id)
//                                     }
//                                   >
//                                     <i className="fi ti-trash"></i>
//                                   </li>
//                                 </ul>
//                               </td>
//                             </tr>
//                           ))}
//                       </tbody>
//                     </table>
//                   </form>
//                   <div className="submit-btn-area">
//                     <ul>
//                       <li>
//                         <Link
//                           onClick={ClickHandler}
//                           className="theme-btn"
//                           to="/shop"
//                         >
//                           Continue Shopping{" "}
//                         </Link>
//                       </li>
//                       <li>
//                         <button type="submit" className="theme-btn">Update Cart</button>
//                       </li>
//                     </ul>
//                   </div>
//                   <div className="cart-product-list">
//                     <ul>
//                       <li>
//                         Total product<span>( {carts.length} )</span>
//                       </li>
//                       <li>
//                         Sub Price<span>${totalPrice(carts)}</span>
//                       </li>
//                       <li>
//                         Vat<span>$0</span>
//                       </li>
//                       <li>
//                         Eco Tax<span>$0</span>
//                       </li>
//                       <li>
//                         Delivery Charge<span>$0</span>
//                       </li>
//                       <li className="cart-b">
//                         Total Price<span>${totalPrice(carts)}</span>
//                       </li>
//                     </ul>
//                   </div>
//                   <div className="submit-btn-area">
//                     <ul>
//                       <li>
//                         <Link
//                           onClick={ClickHandler}
//                           className="theme-btn"
//                           to="/checkout"
//                         >
//                           Proceed to Checkout{" "}
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//       <Scrollbar />
//     </Fragment>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     carts: state.cartList.cart,
//   };
// };
// export default connect(mapStateToProps, {
//   removeFromCart,
//   incrementQuantity,
//   decrementQuantity,
// })(CartPage);

import React, { Fragment, useEffect, useState } from "react";
import HeaderTop from '../../components/HeaderTop/HeaderTop';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Logo from '../../images/logo.svg';
import { totalPrice } from "../../utils"; // HÀM TÍNH TỔNG ĐÃ CÓ SẴN

const CartPage = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  // Lấy giỏ hàng từ localStorage
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCarts(storedCart);
  }, []);

  // Cập nhật localStorage mỗi khi carts thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(carts));
  }, [carts]);

  const incrementQuantity = (id) => {
    setCarts(prev => prev.map(item =>
      item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (id) => {
    setCarts(prev => prev.map(item => {
      if (item.productId === id) {
        const newQty = item.quantity > 1 ? item.quantity - 1 : 1;
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCarts(prev => prev.filter(item => item.productId !== id));
  };

  return (
    <Fragment>
      <HeaderTop />
      <Navbar hclass={'wpo-site-header'} Logo={Logo} />
      <PageTitle pageTitle={"Cart"} pagesub={"Cart"} />
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
                          <th className="images images-b">Image</th>
                          <th className="product-2">Product Name</th>
                          <th className="pr">Quantity</th>
                          <th className="ptice">Price</th>
                          <th className="stock">Total Price</th>
                          <th className="remove remove-b">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {carts && carts.length > 0 && carts.map((catItem, crt) => (
                          <tr key={crt}>
                            <td className="images">
                              <img src={catItem.imageUrl} alt="" />
                            </td>
                            <td className="product">
                              <ul>
                                <li className="first-cart">{catItem.name}</li>
                              </ul>
                            </td>
                            <td className="stock">
                              <div className="pro-single-btn">
                                <Grid className="quantity cart-plus-minus">
                                  <span className="dec qtybutton" onClick={() => decrementQuantity(catItem.productId)}>-</span>
                                  <input value={catItem.quantity} type="text" readOnly />
                                  <span className="inc qtybutton" onClick={() => incrementQuantity(catItem.productId)}>+</span>
                                </Grid>
                              </div>
                            </td>
                            <td className="ptice">${catItem.quantity * catItem.price}</td>
                            <td className="stock">${catItem.quantity * catItem.price}</td>
                            <td className="action">
                              <ul>
                                <li className="w-btn" onClick={() => removeFromCart(catItem.productId)}>
                                  <i className="fi ti-trash"></i>
                                </li>
                              </ul>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </form>
                  <div className="submit-btn-area">
                    <ul>
                      <li>
                        <Link onClick={ClickHandler} className="theme-btn" to="/shop">Continue Shopping </Link>
                      </li>
                      <li>
                        <button type="button" className="theme-btn" onClick={() => setCarts([...carts])}>Update Cart</button>
                      </li>
                    </ul>
                  </div>
                  <div className="cart-product-list">
                    <ul>
                      <li>Total product<span>( {carts.length} )</span></li>
                      <li>Sub Price<span>${totalPrice(carts)}</span></li>
                      <li>Vat<span>$0</span></li>
                      <li>Eco Tax<span>$0</span></li>
                      <li>Delivery Charge<span>$0</span></li>
                      <li className="cart-b">Total Price<span>${totalPrice(carts)}</span></li>
                    </ul>
                  </div>
                  <div className="submit-btn-area">
                    <ul>
                      <li>
                        <Link onClick={ClickHandler} className="theme-btn" to="/checkout">Proceed to Checkout </Link>
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
