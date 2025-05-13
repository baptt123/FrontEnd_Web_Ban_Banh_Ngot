import PropTypes from "prop-types";
import React, { Fragment, useState, useContext } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { useLocation } from 'react-router-dom';
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { multilanguage } from "redux-multilanguage";
import { forgotPassword } from "../../redux/actions/authActions";
import { ToastContext } from "../../App";
import { validateForgotPasswordForm } from "../../utils/formValidation";

const ForgotPassword = ({ strings, forgotPassword, auth }) => {
  const { pathname } = useLocation();
  const { addToast } = useContext(ToastContext);
  
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form sử dụng hàm validateForgotPasswordForm
    const { error, hasError } = validateForgotPasswordForm(email);
    
    if (hasError) {
      setEmailError(error);
      addToast(error, { 
        appearance: 'error',
        autoDismiss: true
      });
      return;
    }
    
    forgotPassword(email)
      .then(() => {
        setIsSubmitted(true);
        addToast("Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.", {
          appearance: 'success',
          autoDismiss: true
        });
      })
      .catch((error) => {
        console.error("Forgot password error:", error);
        // Toast errors được xử lý bởi axios interceptor
      });
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Cupabakery | Quên Mật Khẩu</title>
        <meta
          name="description"
          content="Trang quên mật khẩu của Cupabakery."
        />
      </MetaTags>
      <BreadcrumbsItem to={import.meta.env.PUBLIC_URL + "/"}>{strings["home"]}</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>
        Quên Mật Khẩu
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <div className="login-form-container">
                    <div className="login-register-form">
                      {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              name="email"
                              placeholder="Nhập email của bạn"
                              value={email}
                              onChange={handleEmailChange}
                              className={emailError ? "is-invalid" : ""}
                            />
                            {emailError && (
                              <div className="invalid-feedback">{emailError}</div>
                            )}
                          </div>
                          
                          <div className="button-box mt-30">
                            <button type="submit" disabled={auth.loading}>
                              <span>
                                {auth.loading ? "Đang xử lý..." : "Gửi liên kết đặt lại mật khẩu"}
                              </span>
                            </button>
                          </div>
                          
                          <div className="button-box mt-20">
                            <Link to={import.meta.env.PUBLIC_URL + "/login-register"} className="btn btn-link">
                              Quay lại đăng nhập
                            </Link>
                          </div>
                        </form>
                      ) : (
                        <div className="text-center">
                          <div className="item-empty-area__icon mb-30">
                            <i className="pe-7s-mail"></i>
                          </div>
                          <h4>Email đã được gửi!</h4>
                          <p className="mt-20">
                            Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email của bạn.
                            <br />Vui lòng kiểm tra hộp thư và làm theo hướng dẫn để đặt lại mật khẩu.
                          </p>
                          <div className="button-box mt-30">
                            <Link to={import.meta.env.PUBLIC_URL + "/login-register"} className="btn-hover">
                              Quay lại đăng nhập
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  strings: PropTypes.object,
  forgotPassword: PropTypes.func,
  auth: PropTypes.object
};

const mapStateToProps = state => {
  return {
    auth: state.authData
  };
};

const mapDispatchToProps = {
  forgotPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(ForgotPassword));