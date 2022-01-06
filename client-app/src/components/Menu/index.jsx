import React, { useEffect, useState } from 'react';
import { GET_FOOD } from '../../api/apiFood';
import './Menu.css';


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
        <section className="menu" id="menu">
            <div className="box-container">
                {
                    listFood.map(f => (
                        <div className="box">
                            <div className="image">
                                <img src={f.imagePath} alt="" />
                            </div>
                            <div className="content">
                                <h3>{f.name}</h3>
                                <p>{f.description}</p>
                                <button className="btn">
                                    Thêm vào giỏ
                                    <i className="fas fa-cart-plus"></i>
                                </button>
                                <span className="price">{f.price / 1000} K</span>
                            </div>
                        </div>
                    ))
                }

            </div>
        </section>
    )
}
