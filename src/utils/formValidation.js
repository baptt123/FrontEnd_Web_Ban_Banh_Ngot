// Validate form đăng nhập
export const validateLoginForm = (values) => {
  const errors = {
    username: "",
    password: ""
  };
  
  let hasErrors = false;
  
  if (!values.username) {
    errors.username = "Vui lòng nhập tên đăng nhập";
    hasErrors = true;
  }
  
  if (!values.password) {
    errors.password = "Vui lòng nhập mật khẩu";
    hasErrors = true;
  }
  
  return { errors, hasErrors };
};

// Validate form đăng ký
export const validateRegisterForm = (values) => {
  const errors = {
    username: "",
    email: "",
    phone: "",
    password: ""
  };
  
  let hasErrors = false;
  
  // Kiểm tra username
  if (!values.username) {
    errors.username = "Vui lòng nhập tên đăng nhập";
    hasErrors = true;
  } else if (values.username.length < 3) {
    errors.username = "Tên đăng nhập phải có ít nhất 3 ký tự";
    hasErrors = true;
  }
  
  // Kiểm tra email
  if (!values.email) {
    errors.email = "Vui lòng nhập email";
    hasErrors = true;
  } else {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(values.email).toLowerCase())) {
      errors.email = "Email không hợp lệ";
      hasErrors = true;
    }
  }
  
  // Kiểm tra số điện thoại
  if (!values.phone) {
    errors.phone = "Vui lòng nhập số điện thoại";
    hasErrors = true;
  } else {
    const re = /^[0-9\-\s]{10,15}$/;
    if (!re.test(values.phone)) {
      errors.phone = "Số điện thoại không hợp lệ";
      hasErrors = true;
    }
  }
  
  // Kiểm tra mật khẩu
  if (!values.password) {
    errors.password = "Vui lòng nhập mật khẩu";
    hasErrors = true;
  } else if (values.password.length < 6) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    hasErrors = true;
  }
  
  return { errors, hasErrors };
};

// Validate form quên mật khẩu
export const validateForgotPasswordForm = (email) => {
  let error = "";
  let hasError = false;
  
  if (!email) {
    error = "Vui lòng nhập email";
    hasError = true;
  } else {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      error = "Email không hợp lệ";
      hasError = true;
    }
  }
  
  return { error, hasError };
};

// Validate form đặt lại mật khẩu
export const validateResetPasswordForm = (values) => {
  const errors = {
    newPassword: "",
    confirmPassword: ""
  };
  
  let hasErrors = false;
  
  if (!values.newPassword) {
    errors.newPassword = "Vui lòng nhập mật khẩu mới";
    hasErrors = true;
  } else if (values.newPassword.length < 6) {
    errors.newPassword = "Mật khẩu phải có ít nhất 6 ký tự";
    hasErrors = true;
  }
  
  if (!values.confirmPassword) {
    errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    hasErrors = true;
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp";
    hasErrors = true;
  }
  
  return { errors, hasErrors };
};