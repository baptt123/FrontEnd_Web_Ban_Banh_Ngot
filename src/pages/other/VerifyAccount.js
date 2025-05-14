import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, useSearchParams } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { verifyAccount } from "../../redux/actions/authActions";
import Spinner from "react-bootstrap/Spinner";
import { ToastContext } from "../../App";
import axios from "axios"; 
import { useContext } from "react";

const VerifyAccount = ({ verifyAccount }) => {
  console.log("VerifyAccount component mounting");

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { addToast } = useContext(ToastContext);
  console.log("Token from URL:", token);
  const [verificationState, setVerificationState] = useState({
    isVerifying: true,
    isSuccess: false,
    message: ''
  });

  useEffect(() => {
    console.log("useEffect running with token:", token);
    if (token) {
      console.log("Got token from URL:", token);
      // Gọi API backend với token từ URL
      axios.get(`http://localhost:8080/api/auth/verify?token=${token}`, {
        withCredentials: true  // Cho phép gửi cookies
      })
        .then(response => {
          console.log("Verification success:", response);
          setVerificationState({
            isVerifying: false,
            isSuccess: true,
            message: response.message || 'Xác thực tài khoản thành công!'
          });
          
          addToast("Xác thực tài khoản thành công!", {
            appearance: 'success',
            autoDismiss: true
          });
        })
        .catch(error => {
          console.error("Verification error:", error);
          setVerificationState({
            isVerifying: false,
            isSuccess: false,
            message: error.response?.data?.message || 'Xác thực tài khoản thất bại.'
          });
          
          addToast(error.response?.data?.message || 'Xác thực tài khoản thất bại.', {
            appearance: 'error',
            autoDismiss: true
          });
        });
    } else {
      setVerificationState({
        isVerifying: false,
        isSuccess: false,
        message: 'Không tìm thấy mã xác thực. Vui lòng kiểm tra lại liên kết.'
      });
    }
  }, [token, verifyAccount, addToast]);

  return (
    <Fragment>
      <MetaTags>
        <title>Cupabakery | Xác thực tài khoản</title>
        <meta
          name="description"
          content="Trang xác thực tài khoản của Cupabakery."
        />
      </MetaTags>
      <BreadcrumbsItem to={"/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>
        Xác thực tài khoản
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
                      <div className="text-center">
                        {verificationState.isVerifying ? (
                          <>
                            <Spinner animation="border" role="status" variant="primary" className="mb-3">
                              <span className="sr-only">Đang xác thực...</span>
                            </Spinner>
                            <h4 className="mt-3">Đang xác thực tài khoản của bạn...</h4>
                            <p className="mt-3">Vui lòng đợi trong giây lát.</p>
                          </>
                        ) : verificationState.isSuccess ? (
                          <>
                            <div className="item-empty-area__icon mb-30">
                              <i className="pe-7s-check text-success" style={{ fontSize: '100px' }}></i>
                            </div>
                            <h4 className="text-success">Xác thực thành công!</h4>
                            <p className="mt-20">
                              {verificationState.message}
                              <br />
                              Bây giờ bạn có thể đăng nhập vào tài khoản của mình.
                            </p>
                            <div className="button-box mt-30">
                              <Link to={"/login-register"} className="btn-hover">
                                Đăng nhập ngay
                              </Link>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="item-empty-area__icon mb-30">
                              <i className="pe-7s-close-circle text-danger" style={{ fontSize: '100px' }}></i>
                            </div>
                            <h4 className="text-danger">Xác thực thất bại!</h4>
                            <p className="mt-20">
                              {verificationState.message}
                              <br />
                              Vui lòng kiểm tra lại liên kết xác thực hoặc yêu cầu gửi lại email xác thực.
                            </p>
                            <div className="button-box mt-30">
                              <Link to={"/login-register"} className="btn-hover">
                                Quay lại đăng nhập
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
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

VerifyAccount.propTypes = {
  verifyAccount: PropTypes.func
};

const mapDispatchToProps = {
  verifyAccount
};

export default connect(null, mapDispatchToProps)(VerifyAccount);
