import React, { useEffect, useState } from 'react';
import { GET_FOOD } from '../../api/apiFood';

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

    return (
        <section className="blogs" id="blogs">
            <div className="heading">
                <span>Menu</span>
            </div>

            <div className="box-container">
                {
                    listFood.map(f => (
                        <div className="box">
                            <div className="image">
                                <img src={f.imagePath} alt="" />
                            </div>
                            <div className="content">
                                <div className="tags">
                                    <a><i className="fas fa-tag"></i> Ngon / </a>
                                    <a><i className="fas fa-tag"></i> Rẻ / </a>
                                    <a><i className="fas fa-tag"></i> Sang trọng  </a>
                                </div>
                                <h3>{f.name}</h3>
                                <p>{f.description}</p>

                                <button>
                                    <a href="#" className="btn">
                                        <i className="fas fa-cart-plus"></i>Thêm vào giỏ
                                    </a>
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
