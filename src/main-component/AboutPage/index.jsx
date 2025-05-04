import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
import About from '../../components/about'
import Category2 from '../../components/Category2'
import TeamSection from '../../components/team'
import PageTitle from '../../components/pagetitle'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'


const AboutPage =() => {
    return(
        <Fragment>
            <Navbar hClass={"header-style-2"} />
            <PageTitle pageTitle={'Về chúng tôi'} pagesub={'Giới thiệu'}/> 
            <About/>
            <Category2 StyleClass={'style-2'}/>
            <TeamSection/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default AboutPage;
