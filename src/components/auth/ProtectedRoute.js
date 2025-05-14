import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Component cho route yêu cầu đăng nhập
export const PrivateRoute = ({ children, auth }) => {
  useEffect(() => {
    console.log("PrivateRoute auth state:", auth);
  }, [auth]);

  if (!auth.isAuthenticated) {
    // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
    return <Navigate to="/login-register" replace />;
  }

  return children;
};

// Component cho route không cho phép truy cập khi đã đăng nhập
export const PublicOnlyRoute = ({ children, auth }) => {
  useEffect(() => {
    console.log("PublicOnlyRoute auth state:", auth);
  }, [auth]);

  if (auth.isAuthenticated) {
    // Chuyển hướng về trang chủ nếu đã đăng nhập
    return <Navigate to="/" replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

PublicOnlyRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authData
});

export const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);
export const ConnectedPublicOnlyRoute = connect(mapStateToProps)(PublicOnlyRoute);