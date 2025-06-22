import React, { useEffect } from "react";
import { Grid, Box } from "@chakra-ui/react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../store/actions/action";
import { toast } from "react-toastify";
import "./style.scss";

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      toast.error("Thiếu token xác thực");
      return;
    }
    dispatch(verifyEmail(token))
      .then(() => {
      toast.success("Xác thực thành công, vui lòng đăng nhập");
      navigate("/login");
    });
  }, [dispatch, token]);

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>Xác thực tài khoản</h2>
        <p>Đang xác thực, vui lòng chờ...</p>
        <Box className="formFooter">
          {loading && <p>Loading...</p>}
          {!loading && (
            <Link to="/login" className="cBtn cBtnTheme cBtnLarge">
              Quay về Đăng nhập
            </Link>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default VerifyPage;
