import React from 'react'
import {Link} from 'react-router-dom'
import catimg from '../../images/category/icon-1.png'
import catimg2 from '../../images/category/icon-2.png'
import catimg3 from '../../images/category/icon-3.png'


const Category2 = (props) => {
    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }
    return(
        <section className={`category-area-s2 section-padding ${props.StyleClass}`}>
            <div className="container">
                <div className="category-wrap">
                    <div className="row">
                        <div className="col-xl-4 col-lg-6 col-12">
                            <div className="category-item">
                                <div className="category-icon">
                                    <img src={catimg} alt=""/>
                                </div>
                                <div className="category-content">
                                    <h2><Link onClick={ClickHandler} to="/shop">Bánh Ngọt</Link></h2>
                                    <p>Khám phá thế giới bánh ngọt đa dạng với nhiều hương vị thơm ngon, từ bánh bông lan mềm mịn đến bánh tart trái cây tươi mát.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-12">
                            <div className="category-item">
                                <div className="category-icon">
                                    <img src={catimg2} alt=""/>
                                </div>
                                <div className="category-content">
                                    <h2><Link onClick={ClickHandler} to="/shop">Bánh Mặn</Link></h2>
                                    <p>Thưởng thức các loại bánh mặn đậm đà, từ bánh pizza thơm phức đến bánh mì sandwich giòn tan.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-12">
                            <div className="category-item">
                                <div className="category-icon">
                                    <img src={catimg3} alt=""/>
                                </div>
                                <div className="category-content">
                                    <h2><Link onClick={ClickHandler} to="/shop">Bánh Kem</Link></h2>
                                    <p>Trải nghiệm những chiếc bánh kem tươi mát, được trang trí tinh tế với nhiều hương vị độc đáo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Category2;