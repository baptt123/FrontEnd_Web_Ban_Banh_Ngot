import React from 'react';
import {Routes, Route} from "react-router-dom";
import Homepage from '../HomePage/HomePage'
import HomePage2 from '../HomePage2/HomePage2';
import HomePage3 from '../HomePage3/HomePage3';
import AboutPage from '../AboutPage/AboutPage';
import ServicePages from '../ServicePage/ServicePage';
import ServiceSinglePage from '../ServiceSinglePage/ServiceSinglePage';
import TeamPage from '../TeamPage/TeamPage';
import TeamSinglePage from '../TestimonialPage/TestimonialPage';
import ShopPage from '../ShopPage'
import ShopDetailPage from '../ShopPage/product-detail'
import ProductSinglePage from '../ProductSinglePage';
import CartPage from '../CartPage';
import CheckoutPage from '../CheckoutPage';
import OrderRecived from '../OrderRecived';
import BlogPage from '../BlogPage/BlogPage'
import BlogPageLeft from '../BlogPageLeft/BlogPageLeft'
import BlogPageFullwidth from '../BlogPageFullwidth/BlogPageFullwidth'
import BlogDetails from '../BlogDetails/BlogDetails'
import BlogDetailsLeftSiide from '../BlogDetailsLeftSiide/BlogDetailsLeftSiide'
import BlogDetailsFull from '../BlogDetailsFull/BlogDetailsFull'
import ContactPage from '../ContactPage/ContactPage';
import LoginPage from '../LoginPage/index';
import ForgotPassword from '../ForgotPassword/index';
import Register from '../SignUpPage/index';
import ErrorPage from '../ErrorPage/ErrorPage';
import ProductPage from '../TestProductPage/ProductPage';
import OrderHistoryDashboard from '../OrderHistoryPage/OrderHistory.jsx';
import {Form} from "formik";
import Cover from "/src/components/CoverMainUserProfile/Cover.jsx";
import Main from "/src/components/CoverMainUserProfile/Main.jsx";
import ResetPasswordPage from "/src/main-component/ResetPasswordPage/index.jsx";
import VerifyPage from "/src/main-component/VerifyPage/index.jsx";


const AllRoute = () => {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="home" element={<Homepage/>}/>
                <Route path="home-2" element={<HomePage2/>}/>
                <Route path="home-3" element={<HomePage3/>}/>
                <Route path="about" element={<AboutPage/>}/>
                <Route path="services" element={<ServicePages/>}/>
                <Route path="service-single/:slug" element={<ServiceSinglePage/>}/>
                <Route path="team-page" element={<TeamPage/>}/>
                <Route path="testimonial" element={<TeamSinglePage/>}/>
                <Route path="products" element={<ShopPage/>}/>
                <Route path="products/:id" element={<ShopDetailPage/>}/>
                <Route path='shop-single/:slug' element={<ProductSinglePage/>}/>
                <Route path='cart' element={<CartPage/>}/>
                <Route path='checkout' element={<CheckoutPage/>}/>
                <Route path='order_received' element={<OrderRecived/>}/>
                <Route path='blog' element={<BlogPage/>}/>
                <Route path='blog-left-sidebar' element={<BlogPageLeft/>}/>
                <Route path='blog-fullwidth' element={<BlogPageFullwidth/>}/>
                <Route path='blog-single/:slug' element={<BlogDetails/>}/>
                <Route path='blog-single-left-sidebar/:slug' element={<BlogDetailsLeftSiide/>}/>
                <Route path='blog-single-fullwidth/:slug' element={<BlogDetailsFull/>}/>
                <Route path='contact' element={<ContactPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="forgot" element={<ForgotPassword/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path='404' element={<ErrorPage/>}/>
                <Route path="all-products" element={<ProductPage/>}/>
                <Route path="order-history" element={<OrderHistoryDashboard/>}/>
                {/*<Route path="team-admin" element={<Team/>}/>*/}
                {/*<Route path="contacts-admin" element={<Contacts/>}/>*/}
                {/*<Route path="invoices" element={<Invoices/>}/>*/}
                {/*<Route path="form" element={<Form/>}/>*/}
                {/*<Route path="bar" element={<Bar/>}/>*/}
                {/*<Route path="pie" element={<Pie/>}/>*/}
                {/*<Route path="line" element={<Line/>}/>*/}
                {/*<Route path="faq" element={<FAQ/>}/>*/}
                {/*<Route path="calendar" element={<Calendar/>}/>*/}
                {/*<Route path="geography" element={<Geography/>}/>*/}
                <Route path="user-profile" element={
                    <>
                        <Cover/>
                        <Main/>
                    </>
                }/>
                {/*<Route path="contact" element={<ContactPage />} />*/}
                <Route path="login" element={<LoginPage />} />
                <Route path="forgot" element={<ForgotPassword />} />
                <Route path="register" element={<Register />} />
                <Route path="verify" element={<VerifyPage />} />
                <Route path="reset-password" element={<ResetPasswordPage />} />
                <Route path="404" element={<ErrorPage />} />
            </Routes>

        </div>
    );
}

export default AllRoute;