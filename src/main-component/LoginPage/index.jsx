import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { GoogleLogin } from "@react-oauth/google";
import { login, googleLogin } from "../../store/actions/action";
import "./style.scss";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [value, setValue] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [validator] = useState(
    new SimpleReactValidator({ className: "errorMessage" })
  );

  const changeHandler = (e) => {
    const { name, value: val } = e.target;
    setValue((prev) => ({ ...prev, [name]: val }));
    validator.showMessages();
  };
  const rememberHandler = () => {
    setValue((prev) => ({ ...prev, remember: !prev.remember }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      dispatch(
        login({ username: value.username, password: value.password })
      ).then(() => {
        navigate("/home");
      });
      validator.hideMessages();
    } else {
      validator.showMessages();
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    dispatch(googleLogin(credentialResponse.credential))
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Google login error:", error);
      });
  };

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>Đăng nhập</h2>
        <p>Đăng nhập vào tài khoản của bạn</p>
        <form onSubmit={submitForm} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Tên đăng nhập"
                name="username"
                label="Tên đăng nhập"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={value.username}
                onChange={changeHandler}
                onBlur={changeHandler}
              />
              {validator.message(
                "username",
                value.username,
                "required|alpha_num"
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Mật khẩu"
                name="password"
                type="password"
                label="Mật khẩu"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={value.password}
                onChange={changeHandler}
                onBlur={changeHandler}
              />
              {validator.message("password", value.password, "required")}
            </Grid>
            <Grid item xs={12}>
              <Grid className="formAction">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value.remember}
                      onChange={rememberHandler}
                    />
                  }
                  label="Ghi nhớ đăng nhập"
                />
                <Link to="/forgot">Quên mật khẩu?</Link>
              </Grid>
              <Grid className="formFooter">
                <Button
                  fullWidth
                  className="cBtnTheme"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Đang tải..." : "Đăng nhập"}
                </Button>
              </Grid>
              <Grid className="loginWithSocial">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    addToast("Đăng nhập Google thất bại", {
                      appearance: "error",
                      autoDismiss: true,
                    });
                  }}
                  useOneTap
                />
              </Grid>
              <p className="noteHelp">
                Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
              </p>
            </Grid>
          </Grid>
        </form>
        <div className="shape-img">
          <i className="fi flaticon-honeycomb"></i>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
