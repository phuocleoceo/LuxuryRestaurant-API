import { INCREASE_QUANTITY, DECREASE_QUANTITY, REMOVE_CART } from '../../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';

export default function Cart()
{
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const handleMinus = async (foodId) =>
    {
        await dispatch(DECREASE_QUANTITY(foodId));
    }

    const handlePlus = async (foodId) =>
    {
        await dispatch(INCREASE_QUANTITY(foodId));
    }

    const handleRemove = async (foodId) =>
    {
        await dispatch(REMOVE_CART(foodId));
    }

    return (
        <section className="shopping-cart-container">
            <div className="products-container">
                <h3 className="title">Giỏ hàng</h3>
                <div className="box-container">
                    {
                        cart.count > 0 &&
                        cart.foodInCart.map(c => (
                            <div className="box" key={c.id}>
                                <i className="fas fa-times" onClick={() => handleRemove(c.id)}></i>
                                <img src="https://mcdn2-coolmate.cdn.vccloud.vn/uploads/October2021/meme-cheems-25.jpg" alt="" />
                                <div className="content">
                                    <h3>ahihi</h3>
                                    <span> Số lượng : </span> <br />
                                    <button className="btnQuantity" onClick={() => handleMinus(c.id)}>-</button>
                                    <span className="quantity">{c.quantity}</span>
                                    <button className="btnQuantity" onClick={() => handlePlus(c.id)}>+</button>
                                    <br />
                                    <span> Giá : </span>
                                    <span className="price"> 10000 </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="cart-total">
                <h3 className="title"> Tổng cộng </h3>
                <div className="box">
                    <h3 className="total"> Số tiền : <span>200000 VNĐ</span> </h3>
                    <button className="btn">Xác nhận đặt món</button>
                </div>
            </div>
        </section >
    )
}
