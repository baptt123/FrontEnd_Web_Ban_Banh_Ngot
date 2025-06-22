import React, { useState, useEffect } from "react";
import { Grid, Box } from "@chakra-ui/react";
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
          <Grid templateColumns="repeat(1, 1fr)" gap={3}>
            <Box>
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
            </Box>
            <Box>
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
            </Box>
            <Box>
              <Box className="formAction">
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
              </Box>
              <Box className="formFooter">
                <Button
                  fullWidth
                  className="cBtnTheme"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Đang tải..." : "Đăng nhập"}
                </Button>
              </Box>
              <Box className="loginWithSocial">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    console.error("Google login failed");
                  }}
                  useOneTap
                />
              </Box>
              <p className="noteHelp">
                Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
              </p>
            </Box>
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
