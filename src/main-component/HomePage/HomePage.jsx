import React, { Fragment } from 'react';
import HeaderTop from '../../components/HeaderTop/HeaderTop.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx'
import HeroSlider from '../../components/HeroSlider/HeroSlider.jsx';
import OricoFeatures from '../../components/OricoFeatures/OricoFeatures.jsx';
import About from '../../components/about/about.jsx';
import FunFact from '../../components/FunFact/FunFact.jsx';
import ServiceSection from '../../components/ServiceSection/ServiceSection.jsx';
// import OfferSection from '../../components/OfferSection/OfferSection.jsx';
import ProductSection from '../../components/ProductSection/ProductSection.jsx';
// import TeamSection from '../../components/TeamSection/TeamSection.jsx';
import PartnersSection from '../../components/PartnersSection/PartnersSection.jsx';
import Testimonial from '../../components/Testimonial/Testimonial.jsx';
// import BlogSection from '../../components/BlogSection/BlogSection.jsx';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Logo from '../../images/cupakery.png'

const HomePage = () => {
    return (
        <Fragment>
            <HeaderTop />
            <Navbar hclass={'wpo-site-header'} Logo={Logo} />
            <div className="orico-hero-wrap">
                <HeroSlider />
                <OricoFeatures />
            </div>
            <About hclass={'orico-about-section section-padding'} />
            <FunFact hclass={'orico-fun-fact-section'} />
            <ServiceSection hclass={"service_section section-padding"} />
            {/* <OfferSection /> */}
            {/*<ProductSection />*/}
            {/* <TeamSection /> */}
            <PartnersSection />
            <Testimonial />
            {/* <BlogSection /> */}
            <Footer hclass={'footer-section'} />
            <Scrollbar />
        </Fragment>
    )
};
export default HomePage;