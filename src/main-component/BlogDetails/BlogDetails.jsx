import React, { Fragment } from 'react';
import HeaderTop from '../../components/HeaderTop/HeaderTop';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import { useParams } from 'react-router-dom'
import blogs from '../../api/blogs.jsx'
import BlogSingle from '../../components/BlogDetails/BlogSingle'
import Footer from '../../components/footer/Footer';
import Logo from '../../images/logo.svg'

const BlogDetails = (props) => {

    const { slug } = useParams()
    const BlogDetails = blogs.find(item => item.slug === slug)

    return (
        <Fragment>
            <HeaderTop />
            <Navbar hclass={'wpo-site-header'} Logo={Logo} />
            <PageTitle pageTitle={BlogDetails.title} pagesub={'Blog Single'} />
            <BlogSingle />
            <Footer FooterShape={false} />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogDetails;
