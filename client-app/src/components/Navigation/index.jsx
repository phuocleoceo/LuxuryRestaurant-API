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
            <Link to="/">
                <div className="logo">
                    <i className="fas fa-utensils"></i>Luxury Restaurant
                </div>
            </Link>

            <nav className="navbar">
                <Link to="/"><div className="link">Trang chủ</div></Link>
                <Link to="/menu"><div className="link">Menu</div></Link>
                {
                    user.role === "admin" &&
                    <Link to="/manage"><div className="link">Quản lý</div></Link>
                }
            </nav>

            <div className="icons">
                {
                    user.id ?
                        <>
                            <span style={{ fontSize: 20 }}>{user.displayname}</span>
                            <div id="menu-btn" className="fas fa-bars"></div>
                            <Link to="/cart">
                                <div id="cart-btn" className="fas fa-shopping-cart">
                                    <span style={{ color: "red", fontSize: 17 }}>
                                        {cart.count > 0 ? cart.count : "0"}
                                    </span>
                                </div>
                            </Link>
                            <div id="logout-btn" onClick={handleLogout} className="fas fa-sign-out-alt"></div>
                        </>
                        :
                        <Link to="/login">
                            <div id="login-btn" className="fas fa-user"></div>
                        </Link>
                }
            </div>
        </header>
    )
}
