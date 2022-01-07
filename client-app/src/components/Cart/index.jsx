import React from 'react';

export default function Cart()
{

    const handleMinus = () =>
    {
        alert("-");
    }
    const handlePlus = () =>
    {
        alert("+");
    }
    return (
        <section className="shopping-cart-container">
            <div className="products-container">
                <h3 className="title">Giỏ hàng</h3>
                <div className="box-container">
                    {
                        [1, 2, 3, 4, 5].map(c => (
                            <div className="box" key={c}>
                                <i className="fas fa-times"></i>
                                <img src="https://mcdn2-coolmate.cdn.vccloud.vn/uploads/October2021/meme-cheems-25.jpg" alt="" />
                                <div className="content">
                                    <h3>ahihi</h3>
                                    <span> Số lượng : </span> <br />
                                    <button className="btnQuantity" onClick={handleMinus}>-</button>
                                    <span className="quantity">27</span>
                                    <button className="btnQuantity" onClick={handlePlus}>+</button>
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
