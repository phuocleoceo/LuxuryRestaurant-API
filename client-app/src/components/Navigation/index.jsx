import { Logout } from '../../redux/slices/authenticationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import React from 'react';

export default function Navigation()
{
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.authentication);

    const handleLogout = () =>
    {
        dispatch(Logout());
        navigate("/");
    };

    return (
        <header className="header">
            <Link to="/" className="logo">
                <i className="fas fa-utensils"></i>Luxury Restaurant
            </Link>

            <nav className="navbar">
                <Link to="/" className="link">Trang chủ</Link>
                <Link to="/menu" className="link">Menu</Link>
                {
                    user.role === "admin" &&
                    <div class="dropdown">
                        <span class="dropdown_btn">Quản lý</span>
                        <div class="dropdown_content">
                            <Link to="/manage/food" class="dropdown_select">Món ăn</Link>
                            <Link to="/manage/order" class="dropdown_select">Đơn hàng</Link>
                            <Link to="/manage/user" class="dropdown_select">Người dùng</Link>
                        </div>
                    </div>
                }
            </nav>

            <div className="icons">
                {user.id && <span style={{ fontSize: 20 }}>{user.displayname}</span>}
                <div id="menu-btn" className="fas fa-bars"></div>
                <Link to="/cart">
                    <div id="cart-btn" className="fas fa-shopping-cart">
                        <span style={{ color: "red", fontSize: 17 }}>
                            {cart.count > 0 ? cart.count : "0"}
                        </span>
                    </div>
                </Link>
                {
                    user.id ?
                        <div id="logout-btn" onClick={handleLogout} className="fas fa-sign-out-alt"></div>
                        :
                        <Link to="/login">
                            <div id="login-btn" className="fas fa-user"></div>
                        </Link>
                }
            </div>
        </header>
    )
}
