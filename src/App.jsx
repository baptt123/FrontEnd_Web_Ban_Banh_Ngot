import PropTypes from "prop-types";
import { useEffect } from 'react';
import React, { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { GoogleLogin } from "@react-oauth/google";

// Import các trang home hiện có
const HomeGridBanner = lazy(() => import("./pages/home/HomeGridBanner"));
const HomeAutoParts = lazy(() => import("./pages/home/HomeAutoParts"));

const HomeCakeShop = lazy(() => import("./pages/home/HomeCakeShop"));
const HomeBlackFriday = lazy(() => import("./pages/home/HomeBlackFriday"));
const HomeBlackFridayTwo = lazy(() => import("./pages/home/HomeBlackFridayTwo"));

// Import các trang shop
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopGridFilter = lazy(() => import("./pages/shop/ShopGridFilter"));
const ShopGridTwoColumn = lazy(() => import("./pages/shop/ShopGridTwoColumn"));
const ShopGridNoSidebar = lazy(() => import("./pages/shop/ShopGridNoSidebar"));
const ShopGridFullWidth = lazy(() => import("./pages/shop/ShopGridFullWidth"));
const ShopGridRightSidebar = lazy(() => import("./pages/shop/ShopGridRightSidebar"));
const ShopListStandard = lazy(() => import("./pages/shop/ShopListStandard"));
const ShopListFullWidth = lazy(() => import("./pages/shop/ShopListFullWidth"));
const ShopListTwoColumn = lazy(() => import("./pages/shop/ShopListTwoColumn"));

// Import các trang product
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() => import("./pages/shop-product/ProductTabLeft"));
const ProductTabRight = lazy(() => import("./pages/shop-product/ProductTabRight"));
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() => import("./pages/shop-product/ProductFixedImage"));

// Import các trang blog
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = lazy(() => import("./pages/blog/BlogDetailsStandard"));

// Import các trang other
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const NotFound = lazy(() => import("./pages/other/NotFound"));

// Import trang PayPal Checkout
const PaypalCheckout = lazy(() => import("./pages/PaypalCheckout"));

// Component cho trang Google Login (tạm thời không sử dụng lazy để đơn giản hóa)
const GoogleLoginPage = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Đăng nhập với Google</h2>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
    </div>
  );
};

const App = (props) => {
  // Đảm bảo sử dụng đúng biến môi trường với tiền tố VITE_
  console.log("Env variable:", import.meta.env.VITE_PUBLIC_URL);

  useEffect(() => {
    const loadTranslations = async () => {
      const en = await import("./translations/english.json");
      const fn = await import("./translations/french.json");
      const de = await import("./translations/germany.json");
      const vi = await import("./translations/vietnamese.json");

      props.dispatch(
        loadLanguages({
          languages: {
            en: en.default,
            fn: fn.default,
            de: de.default,
            vi: vi.default
          }
        })
      );
    };

    loadTranslations();
  }, [props]);

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Routes>
                {/* Route mặc định */}
                <Route
                  path={`/`}
                  element={<HomeCakeShop />}
                />

                {/* Các route cho Homepages */}
                <Route
                  path={`/home-grid-banner`}
                  element={<HomeGridBanner />}
                />
                <Route
                  path={`/home-auto-parts`}
                  element={<HomeAutoParts />}
                />
                <Route
                  path={`/home-cake-shop`}
                  element={<HomeCakeShop />}
                />
                <Route
                  path={`/home-black-friday`}
                  element={<HomeBlackFriday />}
                />
                <Route
                  path={`/home-black-friday-two`}
                  element={<HomeBlackFridayTwo />}
                />

                {/* Các route cho Shop pages */}
                <Route
                  path={`/shop-grid-standard`}
                  element={<ShopGridStandard />}
                />
                <Route
                  path={`/shop-grid-filter`}
                  element={<ShopGridFilter />}
                />
                <Route
                  path={`/shop-grid-two-column`}
                  element={<ShopGridTwoColumn />}
                />
                <Route
                  path={`/shop-grid-no-sidebar`}
                  element={<ShopGridNoSidebar />}
                />
                <Route
                  path={`/shop-grid-full-width`}
                  element={<ShopGridFullWidth />}
                />
                <Route
                  path={`/shop-grid-right-sidebar`}
                  element={<ShopGridRightSidebar />}
                />
                <Route
                  path={`/shop-list-standard`}
                  element={<ShopListStandard />}
                />
                <Route
                  path={`/shop-list-full-width`}
                  element={<ShopListFullWidth />}
                />
                <Route
                  path={`/shop-list-two-column`}
                  element={<ShopListTwoColumn />}
                />

                {/* Các route cho Shop product pages */}
                <Route
                  path={`/product/:id`}
                  element={<Product />}
                />
                <Route
                  path={`/product-tab-left/:id`}
                  element={<ProductTabLeft />}
                />
                <Route
                  path={`/product-tab-right/:id`}
                  element={<ProductTabRight />}
                />
                <Route
                  path={`/product-sticky/:id`}
                  element={<ProductSticky />}
                />
                <Route
                  path={`/product-slider/:id`}
                  element={<ProductSlider />}
                />
                <Route
                  path={`/product-fixed-image/:id`}
                  element={<ProductFixedImage />}
                />

                {/* Các route cho Blog pages */}
                <Route
                  path={`/blog-standard`}
                  element={<BlogStandard />}
                />
                <Route
                  path={`/blog-no-sidebar`}
                  element={<BlogNoSidebar />}
                />
                <Route
                  path={`/blog-right-sidebar`}
                  element={<BlogRightSidebar />}
                />
                <Route
                  path={`/blog-details-standard`}
                  element={<BlogDetailsStandard />}
                />

                {/* Các route cho Other pages */}
                <Route
                  path={`/about`}
                  element={<About />}
                />
                <Route
                  path={`/contact`}
                  element={<Contact />}
                />
                <Route
                  path={`/my-account`}
                  element={<MyAccount />}
                />
                <Route
                  path={`/login-register`}
                  element={<LoginRegister />}
                />
                <Route
                  path={`/cart`}
                  element={<Cart />}
                />
                <Route
                  path={`/wishlist`}
                  element={<Wishlist />}
                />
                <Route
                  path={`/compare`}
                  element={<Compare />}
                />
                <Route
                  path={`/checkout`}
                  element={<Checkout />}
                />
                <Route
                  path={`/not-found`}
                  element={<NotFound />}
                />

                {/* Route mới cho Google Login */}
                <Route
                  path={`/google-login`}
                  element={<GoogleLoginPage />}
                />

                {/* Route mới cho PayPal Checkout */}
                <Route
                  path={`/paypal-checkout`}
                  element={<PaypalCheckout />}
                />

                {/* Route mặc định cho Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default (multilanguage(App));
