import PropTypes from "prop-types";
import React, { Fragment, useState, useContext } from "react";
import MetaTags from "react-meta-tags";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { multilanguage } from "redux-multilanguage";
import { resetPassword } from "../../redux/actions/authActions";
import { ToastContext } from "../../App";
import { validateResetPasswordForm } from "../../utils/formValidation";

const ResetPassword = ({ strings, resetPassword, auth }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { addToast } = useContext(ToastContext);
  
  // Lấy token từ query params
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
    
    // Xóa lỗi khi người dùng nhập lại
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!token) {
      addToast("Token không hợp lệ hoặc đã hết hạn", { 
        appearance: 'error',
        autoDismiss: true
      });
      return;
    }
    
    // Sử dụng hàm validateResetPasswordForm để validate form
    const { errors, hasErrors } = validateResetPasswordForm(passwordData);
    
    if (hasErrors) {
      setErrors(errors);
      // Hiển thị thông báo lỗi đầu tiên
      const firstError = Object.values(errors).find(error => error !== "");
      addToast(firstError || "Vui lòng kiểm tra lại thông tin!", { 
        appearance: 'error',
        autoDismiss: true
      });
      return;
    }
    
    resetPassword(token, passwordData.newPassword)
      .then(() => {
        addToast("Đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới.", {
          appearance: 'success',
          autoDismiss: true
        });
        navigate("/login-register");
      })
      .catch((error) => {
        console.error("Reset password error:", error);
        // Toast errors được xử lý bởi axios interceptor
      });
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Cupabakery | Đặt Lại Mật Khẩu</title>
        <meta
          name="description"
          content="Trang đặt lại mật khẩu của Cupabakery."
        />
      </MetaTags>
      <BreadcrumbsItem to={import.meta.env.PUBLIC_URL + "/"}>{strings["home"]}</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>
        Đặt Lại Mật Khẩu
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
                      {token ? (
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label>Mật Khẩu Mới</label>
                            <input
                              type="password"
                              name="newPassword"
                              placeholder="Nhập mật khẩu mới"
                              value={passwordData.newPassword}
                              onChange={handleChange}
                              className={errors.newPassword ? "is-invalid" : ""}
                            />
                            {errors.newPassword && (
                              <div className="invalid-feedback">{errors.newPassword}</div>
                            )}
                          </div>
                          
                          <div className="form-group">
                            <label>Xác Nhận Mật Khẩu</label>
                            <input
                              type="password"
                              name="confirmPassword"
                              placeholder="Xác nhận mật khẩu mới"
                              value={passwordData.confirmPassword}
                              onChange={handleChange}
                              className={errors.confirmPassword ? "is-invalid" : ""}
                            />
                            {errors.confirmPassword && (
                              <div className="invalid-feedback">{errors.confirmPassword}</div>
                            )}
                          </div>
                          
                          <div className="button-box mt-30">
                            <button type="submit" disabled={auth.loading}>
                              <span>
                                {auth.loading ? "Đang xử lý..." : "Đặt Lại Mật Khẩu"}
                              </span>
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="text-center">
                          <div className="item-empty-area__icon mb-30">
                            <i className="pe-7s-attention"></i>
                          </div>
                          <h4>Token Không Hợp Lệ</h4>
                          <p className="mt-20">
                            Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
                            <br />Vui lòng thử yêu cầu đặt lại mật khẩu mới.
                          </p>
                          <div className="button-box mt-30">
                            <Link to={import.meta.env.PUBLIC_URL + "/forgot-password"} className="btn-hover">
                              Quên Mật Khẩu
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

ResetPassword.propTypes = {
  strings: PropTypes.object,
  resetPassword: PropTypes.func,
  auth: PropTypes.object
};

const mapStateToProps = state => {
  return {
    auth: state.authData
  };
};

const mapDispatchToProps = {
  resetPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(ResetPassword));