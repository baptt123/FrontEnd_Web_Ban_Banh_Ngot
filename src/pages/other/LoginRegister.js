import PropTypes from "prop-types";
import React, { Fragment, useState, useContext } from "react";
import MetaTags from "react-meta-tags";
import { Link, useNavigate } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { multilanguage } from "redux-multilanguage";
import { GoogleLogin } from "@react-oauth/google";
import { register, login, googleLogin } from "../../redux/actions/authActions";
import { ToastContext } from "../../App";
import { validateRegisterForm, validateLoginForm } from "../../utils/formValidation";

const LoginRegister = ({ strings, register, login, googleLogin, auth }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { addToast } = useContext(ToastContext);
  
  // State cho form đăng nhập
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  
  // State cho form đăng ký
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
    phone: ""
  });
  
  // State cho errors
  const [loginErrors, setLoginErrors] = useState({
    username: "",
    password: ""
  });
  
  const [registerErrors, setRegisterErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  });

  // Xử lý thay đổi input đăng nhập
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    
    // Xóa lỗi khi người dùng nhập lại
    setLoginErrors({
      ...loginErrors,
      [name]: ""
    });
  };

  // Xử lý thay đổi input đăng ký
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
    
    // Xóa lỗi khi người dùng nhập lại
    setRegisterErrors({
      ...registerErrors,
      [name]: ""
    });
  };

  // Xử lý submit form đăng nhập
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const { errors, hasErrors } = validateLoginForm(loginData);
    
    if (hasErrors) {
      setLoginErrors(errors);
      // Hiển thị thông báo lỗi
      addToast("Vui lòng điền đầy đủ thông tin đăng nhập!", { 
        appearance: 'error',
        autoDismiss: true
      });
      return;
    }
    
    login(loginData)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Login error:", error);
        // Toast errors được xử lý bởi axios interceptor
      });
  };

  // Xử lý submit form đăng ký
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const { errors, hasErrors } = validateRegisterForm(registerData);
    
    if (hasErrors) {
      setRegisterErrors(errors);
      // Hiển thị thông báo lỗi đầu tiên
      const firstError = Object.values(errors).find(error => error !== "");
      addToast(firstError || "Vui lòng kiểm tra lại thông tin đăng ký!", { 
        appearance: 'error',
        autoDismiss: true
      });
      return;
    }
    
    register(registerData)
      .then(() => {
        // Đăng ký thành công, toast success đã được xử lý trong action
        addToast("Đăng ký thành công! Vui lòng đăng nhập.", {
          appearance: 'success',
          autoDismiss: true
        });
        
        // Reset form
        setRegisterData({
          username: "",
          password: "",
          email: "",
          phone: ""
        });
      })
      .catch((error) => {
        console.error("Register error:", error);
        // Toast errors được xử lý bởi axios interceptor
      });
  };

  // Xử lý đăng nhập Google thành công
  const handleGoogleLoginSuccess = (credentialResponse) => {
    googleLogin(credentialResponse.credential)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Google login error:", error);
      });
  };

  return (
    <Fragment>
      {/* UI giữ nguyên, thêm hiển thị lỗi cho từng field */}
      <MetaTags>
        <title>Cupabakery | Đăng Nhập</title>
        <meta
          name="description"
          content="Trang đăng nhập và đăng ký của Cupabakery."
        />
      </MetaTags>
      <BreadcrumbsItem to={import.meta.env.PUBLIC_URL + "/"}>{strings["home"]}</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>
      {strings["login_register"]}
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>{strings["login"]}</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                        <h4>{strings["register"]}</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleLoginSubmit}>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="username"
                                  placeholder={strings["username"]}
                                  value={loginData.username}
                                  onChange={handleLoginChange}
                                  className={loginErrors.username ? "is-invalid" : ""}
                                />
                                {loginErrors.username && (
                                  <div className="invalid-feedback">{loginErrors.username}</div>
                                )}
                              </div>
                              
                              <div className="form-group">
                                <input
                                  type="password"
                                  name="password"
                                  placeholder={strings["password"]}
                                  value={loginData.password}
                                  onChange={handleLoginChange}
                                  className={loginErrors.password ? "is-invalid" : ""}
                                />
                                {loginErrors.password && (
                                  <div className="invalid-feedback">{loginErrors.password}</div>
                                )}
                              </div>
                              
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">{strings["remember_me"]}</label>
                                  <Link to={import.meta.env.PUBLIC_URL + "/forgot-password"}>
                                    {strings["forgot_password"]}
                                  </Link>
                                </div>
                                <button type="submit" disabled={auth.loading}>
                                  <span>{auth.loading ? "Đang xử lý..." : strings["login"]}</span>
                                </button>
                              </div>
                              
                              <div className="google-login-button mt-20">
                                <GoogleLogin
                                  onSuccess={handleGoogleLoginSuccess}
                                  onError={() => {
                                    addToast('Đăng nhập Google thất bại', {
                                      appearance: 'error',
                                      autoDismiss: true
                                    });
                                  }}
                                  useOneTap
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleRegisterSubmit}>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="username"
                                  placeholder={strings["username"]}
                                  value={registerData.username}
                                  onChange={handleRegisterChange}
                                  className={registerErrors.username ? "is-invalid" : ""}
                                />
                                {registerErrors.username && (
                                  <div className="invalid-feedback">{registerErrors.username}</div>
                                )}
                              </div>
                              
                              <div className="form-group">
                                <input
                                  type="email"
                                  name="email"
                                  placeholder="Email"
                                  value={registerData.email}
                                  onChange={handleRegisterChange}
                                  className={registerErrors.email ? "is-invalid" : ""}
                                />
                                {registerErrors.email && (
                                  <div className="invalid-feedback">{registerErrors.email}</div>
                                )}
                              </div>
                              
                              <div className="form-group">
                                <input
                                  type="tel"
                                  name="phone"
                                  placeholder="Số điện thoại"
                                  value={registerData.phone}
                                  onChange={handleRegisterChange}
                                  className={registerErrors.phone ? "is-invalid" : ""}
                                />
                                {registerErrors.phone && (
                                  <div className="invalid-feedback">{registerErrors.phone}</div>
                                )}
                              </div>
                              
                              <div className="form-group">
                                <input
                                  type="password"
                                  name="password"
                                  placeholder={strings["password"]}
                                  value={registerData.password}
                                  onChange={handleRegisterChange}
                                  className={registerErrors.password ? "is-invalid" : ""}
                                />
                                {registerErrors.password && (
                                  <div className="invalid-feedback">{registerErrors.password}</div>
                                )}
                              </div>
                              
                              <div className="button-box">
                                <button type="submit" disabled={auth.loading}>
                                  <span>{auth.loading ? "Đang xử lý..." : strings["register"]}</span>
                                </button>
                              </div>
                              
                              <div className="google-login-button mt-20">
                                <GoogleLogin
                                  onSuccess={handleGoogleLoginSuccess}
                                  onError={() => {
                                    addToast('Đăng nhập Google thất bại', {
                                      appearance: 'error',
                                      autoDismiss: true
                                    });
                                  }}
                                  useOneTap
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  strings: PropTypes.object,
  register: PropTypes.func,
  login: PropTypes.func,
  googleLogin: PropTypes.func,
  auth: PropTypes.object
};

const mapStateToProps = state => {
  return {
    auth: state.authData
  };
};

const mapDispatchToProps = {
  register,
  login,
  googleLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(LoginRegister));