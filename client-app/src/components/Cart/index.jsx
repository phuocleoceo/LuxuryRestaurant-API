import { INCREASE_QUANTITY, DECREASE_QUANTITY, REMOVE_CART } from '../../redux/slices/cartSlice';
import { numberWithCommas } from '../../extension/FormatData';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { GET_LIST } from '../../api/apiFood';
import { Link } from "react-router-dom";

export default function Cart()
{
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.authentication);
    const [food, setFood] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() =>
    {
        const getFoodInCart = async () =>
        {
            if (cart.count > 0)
            {
                let listId = "";
                cart.foodInCart.forEach(food => listId += food.id + ",");
                // Remove "," at last
                listId = listId.slice(0, -1);

                const response = await GET_LIST(listId);
                const foodList = response.data.map(f => (
                    {
                        ...f,
                        quantity: cart.foodInCart.find(c => c.id === f.id).quantity
                    }
                ));
                setFood(foodList);
            }
            else setFood([]);
        };
        getFoodInCart();
    }, [cart]);

    useEffect(() =>
    {
        let sum = 0;
        food.forEach(f =>
        {
            sum += f.price * f.quantity;
        });
        setTotal(numberWithCommas(sum));
    }, [food]);

    const handleMinus = (foodId) => dispatch(DECREASE_QUANTITY(foodId));

    const handlePlus = (foodId) => dispatch(INCREASE_QUANTITY(foodId));

    const handleRemove = (foodId) => dispatch(REMOVE_CART(foodId));

    return (
        <section className="shopping-cart-container">
            <div className="products-container">
                <h3 className="title">Giỏ hàng</h3>
                <div className="box-container">
                    {
                        food.length > 0 &&
                        food.map(f => (
                            <div className="box" key={f.id}>
                                <i className="fas fa-times" onClick={() => handleRemove(f.id)}></i>
                                <img src={f.imagePath} alt="" />
                                <div className="content">
                                    <h3>{f.name}</h3>
                                    <span> Số lượng : </span> <br />
                                    <button className="btnQuantity" onClick={() => handleMinus(f.id)}>-</button>
                                    <span className="quantity">{f.quantity}</span>
                                    <button className="btnQuantity" onClick={() => handlePlus(f.id)}>+</button>
                                    <br />
                                    <span> Giá : </span>
                                    <span className="price"> {f.price} VNĐ</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="cart-total">
                <h3 className="title"> Tổng cộng </h3>
                <div className="box">
                    <h3 className="total"> Số tiền : <span>{total} VNĐ</span> </h3>
                    {
                        user.id &&
                        <Link to="/checkout" className="btn">
                            Tiến hành đặt món
                        </Link>
                    }
                </div>
            </div>
        </section >
    )
}
