import { REGISTER } from '../../api/apiAuthentication';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import React from 'react';

export default function Register()
{
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) =>
    {
        const response = await REGISTER(data);
        if (response.status === 201)
        {
            toast.success("Đăng ký thành công");
            setTimeout(() => navigate("/login"), 1500);
        }
        else
        {
            toast.error("Đăng ký thất bại");
        }
    };

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Đăng ký tài khoản</h3>
                <input type="text" {...register("username")} required
                    placeholder="Tên đăng nhập..." className="box" />

                <input type="password" {...register("password")} required
                    placeholder="Mật khẩu..." className="box" />

                <input type="text" {...register("displayname")} required
                    placeholder="Tên hiển thị..." className="box" />

                <input type="text" {...register("email")} required
                    placeholder="Email..." className="box" />

                <input type="text" {...register("phoneNumber")} required
                    placeholder="Số điện thoại..." className="box" />

                <input type="text" {...register("address")} required
                    placeholder="Địa chỉ..." className="box" />

                <input type="submit" value="Đăng ký" className="btn" />
            </form>
        </div>
    )
}
