import React, { useState, useEffect } from "react";
import { Grid, Box } from "@chakra-ui/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../store/actions/action";
import { toast } from "react-toastify";
import "./style.scss";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const validate = () => {
    if (!email) return "Email không được để trống";
    if (!/^[\w-.]+@[\w-]+(\.[\w-]+)+$/.test(email))
      return "Email không đúng định dạng";
    return null;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }
    dispatch(forgotPassword(email)).then(() => {
      navigate("/login");
    });
  };

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>Quên mật khẩu</h2>
        <p>Nhập email để đặt lại mật khẩu</p>
        <form onSubmit={submitForm} noValidate>
          <Grid templateColumns="repeat(1, 1fr)" gap={3}>
            <Box>
              <TextField
                fullWidth
                placeholder="Email"
                name="email"
                label="Email"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  {loading ? "Đang gửi..." : "Gửi yêu cầu"}
                </Button>
              </Box>
              <p className="noteHelp">
                Đã nhớ mật khẩu? <Link to="/login">Đăng nhập</Link>
              </p>
            </Box>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
