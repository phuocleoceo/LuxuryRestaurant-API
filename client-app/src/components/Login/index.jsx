import { LoginAction } from '../../redux/slices/authenticationSlice';
import { useNavigate } from 'react-router-dom';
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
            toast.success("Login Successfully");
            navigate("/");
        }
        else
        {
            toast.error("Login Failure");
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
                <p>Forget Password? <a href="/">Click Here</a></p>
                <p>Don't Have An Account? <a href="/">Create One</a></p>
            </form>

        </div>
    )
}
