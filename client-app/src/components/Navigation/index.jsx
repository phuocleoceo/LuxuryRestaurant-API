import { Link } from "react-router-dom";
import React from 'react';

export default function Navigation()
{
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
                <Link to="/manage"><div className="link">Quản lý</div></Link>
            </nav>

            <div className="icons">
                <span style={{ fontSize: 20 }}>Admin</span>
                <div id="menu-btn" className="fas fa-bars"></div>
                <Link to="/cart">
                    <div id="cart-btn" className="fas fa-shopping-cart"></div>
                </Link>
                <Link to="/login">
                    <div id="login-btn" className="fas fa-user"></div>
                </Link>
                <Link to="/logout">
                    <div id="logout-btn" className="fas fa-sign-out-alt"></div>
                </Link>
            </div>
        </header>
    )
}
