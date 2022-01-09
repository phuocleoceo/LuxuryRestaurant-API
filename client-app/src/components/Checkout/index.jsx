import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import React from 'react';

export default function Checkout(props)
{
    const { register, handleSubmit } = useForm();
    const user = useSelector(state => state.authentication);

    const onSubmit = (data) =>
    {
        console.log(data, user.id);
    };

    return (
        <section className="order" id="order">
            <div className="heading">
                <span>Xác nhận đơn hàng</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                    <div className="inputBox">
                        <span>Tên người nhận :</span>
                        <input type="text" placeholder="Nhập tên..."
                            {...register("name")} required />
                    </div>
                    <div className="inputBox">
                        <span>Số điện thoại :</span>
                        <input type="text" placeholder="Nhập SĐT..."
                            {...register("phoneNumber")} required />
                    </div>
                </div>
                <div className="flex">
                    <div className="inputBox">
                        <span>Địa chỉ :</span>
                        <input type="text" placeholder="Nhập địa chỉ..."
                            {...register("address")} />
                    </div>
                    <div className="inputBox">
                        <span>Tổng thanh toán :</span>
                        <input type="text" placeholder="Nhập địa chỉ..." />
                    </div>
                </div>
                <input type="submit" value="Xác nhận đặt món" className="btn" />
            </form>
        </section>
    )
}
