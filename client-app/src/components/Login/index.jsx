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
                <h3>LOGIN FORM</h3>
                <input type="text" {...register("username")} required
                    placeholder="Enter your username..." className="box" />

                <input type="password" {...register("password")} required
                    placeholder="Enter your password..." className="box" />

                <div className="remember">
                    <input type="checkbox" name="" id="remember-me" />
                    <label>Remember Me</label>
                </div>
                <input type="submit" value="Login Now" className="btn" />
                <p>Forget Password? <Link to="/">Click Here</Link></p>
                <p>Don't Have An Account? <Link to="/register">Create One</Link></p>
            </form>

        </div>
    )
}
