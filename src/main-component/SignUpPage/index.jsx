/* src/main-component/SignUpPage/index.jsx */
import React, { useEffect, useState } from "react";
import { Grid, Box } from "@chakra-ui/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/actions/action";
import { toast } from "react-toastify";
import "./style.scss";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const [value, setValue] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value: val } = e.target;
    setValue((prev) => ({ ...prev, [name]: val }));
  };

  const validate = () => {
    if (!value.username) return "Tên đăng nhập không được để trống";
    if (!/^[a-zA-Z0-9]+$/.test(value.username))
      return "Tên đăng nhập chỉ gồm chữ và số";
    if (!value.email) return "Email không được để trống";
    if (!/^[\w-.]+@[\w-]+(\.[\w-]+)+$/.test(value.email))
      return "Email không đúng định dạng";
    if (!value.phone) return "Số điện thoại không được để trống";
    if (!/^\d{9,15}$/.test(value.phone)) return "Số điện thoại không hợp lệ";
    if (!value.password) return "Mật khẩu không được để trống";
    if (value.password.length < 6) return "Mật khẩu tối thiểu 6 ký tự";
    return null;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }
    dispatch(
      register({
        username: value.username,
        email: value.email,
        phone: value.phone,
        password: value.password,
      })
    ).then(() => {
      navigate("/login");
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>Đăng ký</h2>
        <p>Tạo tài khoản của bạn</p>
        <form onSubmit={submitForm} noValidate>
          <Grid templateColumns="repeat(1, 1fr)" gap={3}>
            <Box>
              <TextField
                fullWidth
                placeholder="Tên đăng nhập"
                name="username"
                label="Tên đăng nhập"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={value.username}
                onChange={changeHandler}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                placeholder="Email"
                name="email"
                label="Email"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={value.email}
                onChange={changeHandler}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                placeholder="Số điện thoại"
                name="phone"
                label="Số điện thoại"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={value.phone}
                onChange={changeHandler}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                placeholder="Mật khẩu"
                name="password"
                type="password"
                label="Mật khẩu"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={value.password}
                onChange={changeHandler}
              />
            </Box>
            <Box>
              <div className="formFooter">
                <Button
                  fullWidth
                  className="cBtn cBtnLarge cBtnTheme"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Đang đăng ký..." : "Đăng ký"}
                </Button>
              </div>
              <p className="noteHelp">
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
              </p>
            </Box>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
