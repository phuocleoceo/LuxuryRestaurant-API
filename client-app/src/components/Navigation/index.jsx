import { Link } from "react-router-dom";
import React from 'react';

export default function Navigation()
{
    return (
        <header className="header">
            <Link to="/">
                <a href="#" className="logo">
                    <i className="fas fa-utensils"></i>Luxury Restaurant
                </a>
            </Link>

            <nav className="navbar">
                <Link to="/"><a>Trang chủ</a></Link>
                <Link to="/menu"><a>Menu</a></Link>
                <Link to="/manage"><a>Quản lý</a></Link>
            </nav>

            <div className="icons">
                <a style={{ fontSize: 20 }}>Admin</a>
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
