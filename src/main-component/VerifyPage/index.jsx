import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
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
    dispatch(verifyEmail(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (user === null && !loading && error) {
      // verify thất bại
      toast.error(error.message || "Xác thực thất bại");
    }
    if (user && !loading) {
      toast.success("Xác thực thành công, vui lòng đăng nhập");
      navigate("/login");
    }
  }, [user, loading, error, navigate]);

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>Xác thực tài khoản</h2>
        <p>Đang xác thực, vui lòng chờ...</p>
        <div className="formFooter">
          {loading && <p>Loading...</p>}
          {!loading && (
            <Link to="/login" className="cBtn cBtnTheme cBtnLarge">
              Quay về Đăng nhập
            </Link>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default VerifyPage;
