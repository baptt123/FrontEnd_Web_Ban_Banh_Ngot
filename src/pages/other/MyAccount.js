import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
import { ToastContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const MyAccount = ({ auth, logout }) => {
  const { pathname } = useLocation();
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        addToast("Đăng xuất thành công!", {
          appearance: 'success',
          autoDismiss: true
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  // Chắc chắn chúng ta có dữ liệu người dùng
  console.log("Auth state in MyAccount:", auth); // Để debug

  return (
    <Fragment>
      <MetaTags>
        <title>Cupabakery | Tài khoản của tôi</title>
        <meta
          name="description"
          content="Trang tài khoản của người dùng Cupabakery."
        />
      </MetaTags>
      <BreadcrumbsItem to={"/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>
        Tài khoản của tôi
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <div className="account-info-wrapper mb-30">
                    <h4>Thông tin tài khoản của tôi</h4>
                    <h5>Thông tin cá nhân</h5>
                    <div className="mt-3">
                      <button onClick={handleLogout} className="btn btn-danger">
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                  
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Thông tin tài khoản{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Thông tin tài khoản</h4>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Username</label>
                                  <input type="text" value={auth.user?.username || ""} readOnly />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email</label>
                                  <input type="email" value={auth.user?.email || ""} readOnly />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Số điện thoại</label>
                                  <input type="text" value={auth.user?.phone || ""} readOnly />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Ngày tạo tài khoản</label>
                                  <input 
                                    type="text" 
                                    value={
                                      auth.user?.createdAt 
                                        ? new Date(auth.user.createdAt).toLocaleDateString('vi-VN') 
                                        : ""
                                    } 
                                    readOnly 
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Loại tài khoản</label>
                                  <input type="text" value={auth.user?.role?.name || "Khách hàng"} readOnly />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Đổi mật khẩu
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Đổi mật khẩu</h4>
                              <h5>Mật khẩu của bạn</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Mật khẩu hiện tại</label>
                                  <input type="password" />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Mật khẩu mới</label>
                                  <input type="password" />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Xác nhận mật khẩu mới</label>
                                  <input type="password" />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="button">Cập nhật</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> Địa chỉ giao hàng{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Địa chỉ giao hàng của bạn</h4>
                            </div>
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-12 col-md-12 d-flex align-items-center justify-content-center">
                                  <div className="entries-info text-center">
                                    <p>Bạn chưa có địa chỉ giao hàng nào.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="button">Thêm địa chỉ mới</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func
};

const mapStateToProps = state => {
  return {
    auth: state.authData
  };
};

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);