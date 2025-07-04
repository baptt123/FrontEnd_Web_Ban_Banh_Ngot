import React, { Fragment } from 'react';
import HeaderTop from '../../components/HeaderTop/HeaderTop';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import ProductDetailPage from '../../components/ProductDetailPage/ProductDetailPage';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar'
import Logo from '../../images/logo.svg'



const ShopDetailPage = () => {

    return (
        <Fragment>
            <HeaderTop />
            <Navbar hclass={'wpo-site-header'} Logo={Logo} />
            <PageTitle pageTitle={'Sản phẩm'} pagesub={'Chi tiết sản phẩm'} />
            <ProductDetailPage/>
            <Footer FooterShape={false} />
            <Scrollbar />
        </Fragment>
    )
};

export default ShopDetailPage;