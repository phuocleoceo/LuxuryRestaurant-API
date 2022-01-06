import { Link } from "react-router-dom";
import './Navigation.css';
import React from 'react';

export default function Navigation()
{
    return (
        <header>
            <a className="logo"><Link to="/">Luxury Restaurant</Link></a>
            <nav className="navbar">
                <a><Link to="/">Trang chủ</Link></a>
                <a><Link to="/menu">Menu</Link></a>
                <a><Link to="/manage">Quản lý</Link></a >
            </nav >
            <div className="icons">
                <a style={{ fontSize: 20 }}>Admin</a>
                <a className="fas fa-shopping-cart"></a>
                <a className="fas fa-sign-out-alt"></a>
            </div>

            <div className="icons">
                <a className="fas fa-shopping-cart"></a>
                <a className="fas fa-user"> </a>
            </div>
        </header>
    )
}
