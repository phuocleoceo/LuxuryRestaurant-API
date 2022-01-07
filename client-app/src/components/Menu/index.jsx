import React, { useEffect, useState } from 'react';
import { GET_FOOD } from '../../api/apiFood';
import { toast } from 'react-toastify';

export default function Menu()
{
    const [listFood, setListFood] = useState([]);
    useEffect(() =>
    {
        const getFd = async () =>
        {
            const response = await GET_FOOD();
            if (response.status === 200)
            {
                setListFood(response.data);
            }
        };
        getFd();
    }, []);

    const handleAddToCart = () =>
    {
        toast.success("Đã thêm vào giỏ");
    }

    return (
        <section className="blogs" id="blogs">
            <div className="heading">
                <span>Menu</span>
            </div>

            <div className="box-container">
                {
                    listFood.map(f => (
                        <div className="box" key={f.id}>
                            <div className="image">
                                <img src={f.imagePath} alt="" />
                            </div>
                            <div className="content">
                                <div className="tags">
                                    <span className="link"><i className="fas fa-tag"></i> Ngon / </span>
                                    <span className="link"><i className="fas fa-tag"></i> Rẻ / </span>
                                    <span className="link"><i className="fas fa-tag"></i> Sang trọng  </span>
                                </div>
                                <h3>{f.name}</h3>
                                <p>{f.description}</p>

                                <button className="btn" onClick={handleAddToCart}>
                                    <i className="fas fa-cart-plus"></i>Thêm vào giỏ
                                </button>
                                <span className="price">{f.price / 1000}K VNĐ</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
