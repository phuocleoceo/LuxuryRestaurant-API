import { LoginAction } from '../../redux/slices/authenticationSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import React from 'react';

export default function Login()
{
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) =>
    {
        const check = await dispatch(LoginAction(data));
        if (check.payload.Accepted)
        {
            toast.success("Đăng nhập thành công");
            navigate("/");
        }
        else
        {
            toast.error("Đăng nhập thấT bại");
        }
    };

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>ĐĂNG NHẬP</h3>
                <input type="text" {...register("username")} required
                    placeholder="Tên đăng nhập..." className="box" />

                <input type="password" {...register("password")} required
                    placeholder="Mật khẩu..." className="box" />

                <div className="remember">
                    <input type="checkbox" name="" id="remember-me" />
                    <label>Nhớ trạng thái đăng nhập</label>
                </div>
                <input type="submit" value="Đăng nhập ngay" className="btn" />
                <p>Quên mật khẩu ? <Link to="/">Đặt lại</Link></p>
                <p>Bạn chưa có tài khoản ? <Link to="/register">Đăng ký</Link></p>
            </form>

        </div>
    )
}
