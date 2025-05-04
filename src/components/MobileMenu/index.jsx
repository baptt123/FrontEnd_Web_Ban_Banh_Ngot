import React, { Component } from 'react'
import { Collapse, CardBody, Card } from 'reactstrap';
import { Link } from 'react-router-dom'
import './style.css';

const menus = [
    {
        id: 1,
        title: 'Trang chủ',
        link: '/home',
        submenu: [
            {
                id: 11,
                title: 'Trang chủ 1',
                link: '/home'
            },
            {
                id: 12,
                title: 'Trang chủ 2',
                link: '/home2'
            },
        ]
    },

    {
        id: 2,
        title: 'Về chúng tôi',
        link: '/about',
    },
    {
        id: 3,
        title: 'Cửa hàng',
        link: '/shop',
    },

    {
        id: 4,
        title: 'Trang',
        link: '/',
        submenu: [
            {
                id: 41,
                title: 'Giỏ hàng',
                link: '/cart'
            },
            {
                id: 45,
                title: 'Yêu thích',
                link: '/wishlist'
            },
            {
                id: 46,
                title: 'Thanh toán',
                link: '/checkout'
            },
    
            {
                id: 49,
                title: 'Lỗi 404',
                link: '/404'
            },
            {
                id: 491,
                title: 'Đăng nhập',
                link: '/login'
            },
            {
                id: 492,
                title: 'Đăng ký',
                link: '/register'
            },
            
        ]
    },
    {
        id: 6,
        title: 'Sản phẩm',
        link: '/',
        submenu: [
            {
                id: 41,
                title: 'Sản phẩm',
                link: '/shop'
            },
            {
                id: 45,
                title: 'Chi tiết sản phẩm',
                link: '/product-single/1'
            },
            
        ]
    },
    {
        id: 7,
        title: 'Dự án',
        link: '/',
        submenu: [
            {
                id: 71,
                title: 'Dự án',
                link: '/project'
            },
            {
                id: 75,
                title: 'Chi tiết dự án',
                link: '/project-single'
            },
            
        ]
    },

    {
        id: 5,
        title: 'Tin tức',
        link: '/blog',
        submenu: [
            {
                id: 51,
                title: 'Tin tức',
                link: '/blog'
            },
            {
                id: 52,
                title: 'Tin tức sidebar trái',
                link: '/blog-left-sidebar'
            },
            {
                id: 53,
                title: 'Tin tức full width',
                link: '/blog-fullwidth'
            },
            {
                id: 54,
                title: 'Chi tiết tin tức',
                link: '/blog-single/1'
            },
            {
                id: 55,
                title: 'Chi tiết tin tức sidebar trái',
                link: '/blog-single-left-sidebar/1'
            },
            {
                id: 56,
                title: 'Chi tiết tin tức full width',
                link: '/blog-single-fullwidth/1'
            },
        ]
    },
    {
        id: 88,
        title: 'Liên hệ',
        link: '/contact',
    }
    
    
]


export default class MobileMenu extends Component {

    state = {
        isMenuShow: false,
        isOpen: 0,
    }

    menuHandler = () => {
        this.setState({
            isMenuShow: !this.state.isMenuShow
        })
    }

    setIsOpen = id => () => {
        this.setState({
            isOpen: id === this.state.isOpen ? 0 : id
        })
    }

    render() {

        const { isMenuShow, isOpen } = this.state;

        return (
            <div>
                <div className={`mobileMenu ${isMenuShow ? 'show' : ''}`}>
                    <div className="menu-close">
                         <div className="clox" onClick={this.menuHandler}><i className="ti-close"></i></div>
                    </div>
                    <ul className="responsivemenu">
                        {menus.map(item => {
                            return (
                                <li key={item.id}>
                                    {item.submenu ? <p onClick={this.setIsOpen(item.id)}>
                                        {item.title}
                                        {item.submenu ? <i className="fa fa-angle-right" aria-hidden="true"></i> : ''}
                                    </p> : <Link to={item.link}>{item.title}</Link>}
                                    {item.submenu ?
                                    <Collapse isOpen={item.id === isOpen}>
                                        <Card>
                                            <CardBody>
                                                <ul>
                                                    {item.submenu.map(submenu => (
                                                        <li key={submenu.id}><Link className="active" to={submenu.link}>{submenu.title}</Link></li>
                                                    ))}
                                                </ul>
                                            </CardBody>
                                        </Card>
                                    </Collapse>
                                    : ''}
                                </li>
                            )
                        })}
                    </ul>

                </div>

                <div className="showmenu" onClick={this.menuHandler}>
                    <button type="button" className="navbar-toggler open-btn">
                            <span className="icon-bar first-angle"></span>
                            <span className="icon-bar middle-angle"></span>
                            <span className="icon-bar last-angle"></span>
                    </button>
                </div>
            </div>
        )
    }
}
