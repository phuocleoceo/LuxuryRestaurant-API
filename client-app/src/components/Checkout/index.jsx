import { useLocation, useNavigate } from 'react-router-dom';
import { CLEAR_CART } from '../../redux/slices/cartSlice';
import { CHECK_OUT } from '../../api/apiOrder';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import React from 'react';

export default function Checkout()
{
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { food, total, user } = location.state;

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) =>
    {
        // Get list food from Cart
        const listFood = food.map(f => ({
            foodId: f.id,
            foodName: f.name,
            price: f.price,
            quantity: f.quantity
        }));
        // Set order Information
        const orderInfor = {
            userId: user.id,
            orderDetails: listFood,
            name: data.name,
            phoneNumber: data.phoneNumber,
            address: data.address
        }
        // Checkout
        const response = await CHECK_OUT(orderInfor);
        if (response.status === 201)
        {
            toast.success("Đặt hàng thành công");
            await dispatch(CLEAR_CART());
            setTimeout(() => navigate("/menu"), 1000);
        }
        else
        {
            toast.error("Đặt hàng thất bại");
        }
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
                        <h3 style={{ color: "#130f40", fontSize: "2rem", marginTop: "1.7rem" }}>
                            Số tiền :
                            <span style={{ color: "#27ae60", fontSize: "100%" }}> {total} VNĐ</span>
                        </h3>
                    </div>
                </div>
                <span style={{ marginLeft: "40%" }}>
                    <input type="submit" value="Xác nhận đặt món" className="btn" />
                </span>
            </form>
        </section>
    )
}
