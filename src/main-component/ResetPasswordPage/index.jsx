import React, { useState, useEffect } from "react";
import { Grid, Box } from "@chakra-ui/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../store/actions/action";
import { toast } from "react-toastify";
import "./style.scss";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [value, setValue] = useState({
    password: "",
    confirm: "",
  });

  const changeHandler = (e) => {
    const { name, value: val } = e.target;
    setValue((prev) => ({ ...prev, [name]: val }));
  };

  const validate = () => {
    if (!value.password) return "Mật khẩu không được để trống";
    if (value.password.length < 6) return "Mật khẩu tối thiểu 6 ký tự";
    if (value.confirm !== value.password) return "Mật khẩu xác nhận chưa khớp";
    if (!token) return "Thiếu token xác thực";
    return null;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }
    dispatch(resetPassword({ token, newPassword: value.password })).then(() => {
      navigate("/login");
    });
  };

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>Đặt lại mật khẩu</h2>
        <p>Nhập mật khẩu mới của bạn</p>
        <form onSubmit={submitForm} noValidate>
          <Grid templateColumns="repeat(1, 1fr)" gap={3}>
            <Box>
              <TextField
                fullWidth
                placeholder="Mật khẩu mới"
                name="password"
                type="password"
                label="Mật khẩu mới"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={value.password}
                onChange={changeHandler}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                placeholder="Xác nhận mật khẩu"
                name="confirm"
                type="password"
                label="Xác nhận mật khẩu"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={value.confirm}
                onChange={changeHandler}
              />
            </Box>
            <Box>
              <Box className="formFooter">
                <Button
                  fullWidth
                  className="cBtn cBtnLarge cBtnTheme"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                </Button>
              </Box>
              <p className="noteHelp">
                Quay về <Link to="/login">Đăng nhập</Link>
              </p>
            </Box>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ResetPasswordPage;
