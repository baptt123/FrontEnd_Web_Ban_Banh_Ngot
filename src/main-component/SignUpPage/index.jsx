import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {toast} from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link, useNavigate} from "react-router-dom";
import { register } from '../../services/authService';

import './style.scss';

const SignUpPage = () => {
    const push = useNavigate();
    
    const [value, setValue] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        phone: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const changeHandler = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
        setError(null); // Xóa thông báo lỗi khi người dùng thay đổi input
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setError(null);
        
        // Kiểm tra mật khẩu xác nhận
        if (value.password !== value.confirm_password) {
            toast.error('Mật khẩu xác nhận không khớp');
            return;
        }

        // Kiểm tra độ dài mật khẩu
        if (value.password.length < 6) {
            toast.error('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        // Kiểm tra định dạng số điện thoại
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(value.phone)) {
            toast.error('Số điện thoại không hợp lệ');
            return;
        }
        
        try {
            setLoading(true);
            const userData = {
                username: value.username,
                email: value.email,
                password: value.password,
                phone: value.phone
            };
            
            const response = await register(userData);
            console.log('Registration successful:', response);
            toast.success('Đăng ký thành công');
            push('/login');
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.message || 'Đăng ký thất bại';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid className="loginWrapper">
            <Grid className="loginForm">
                <h2>Đăng ký</h2>
                <p>Tạo tài khoản mới</p>
                <form onSubmit={submitForm}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Tên đăng nhập"
                                value={value.username}
                                variant="outlined"
                                name="username"
                                label="Tên đăng nhập"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={changeHandler}
                                required
                                helperText="Tên đăng nhập phải có ít nhất 4 ký tự"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Email"
                                value={value.email}
                                variant="outlined"
                                name="email"
                                label="Email"
                                type="email"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={changeHandler}
                                required
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Số điện thoại"
                                value={value.phone}
                                variant="outlined"
                                name="phone"
                                label="Số điện thoại"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={changeHandler}
                                required
                                helperText="Số điện thoại phải có từ 10-15 chữ số"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Mật khẩu"
                                value={value.password}
                                variant="outlined"
                                name="password"
                                type="password"
                                label="Mật khẩu"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={changeHandler}
                                required
                                helperText="Mật khẩu phải có ít nhất 6 ký tự"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Xác nhận mật khẩu"
                                value={value.confirm_password}
                                variant="outlined"
                                name="confirm_password"
                                type="password"
                                label="Xác nhận mật khẩu"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={changeHandler}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid className="formFooter">
                                <Button 
                                    fullWidth 
                                    className="cBtn cBtnLarge cBtnTheme" 
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                                </Button>
                            </Grid>
                            <p className="noteHelp">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
                        </Grid>
                    </Grid>
                </form>
                <div className="shape-img">
                    <i className="fi flaticon-honeycomb"></i>
                </div>
            </Grid>
        </Grid>
    )
};

export default SignUpPage;