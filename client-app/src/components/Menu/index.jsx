import { ADD_TO_CART } from '../../redux/slices/cartSlice';
import React, { useEffect, useState } from 'react';
import { GET_FOOD } from '../../api/apiFood';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function Menu()
{
    const dispatch = useDispatch();
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

    const handleAddToCart = async (foodId) =>
    {
        await dispatch(ADD_TO_CART({ id: foodId }));
        toast.success("Đã thêm vào giỏ");
    }

    return (
        <section className="blogs" id="blogs">
            <div className="heading">
                <span>Menu</span>
            </div>

            <div className="box-container">
                {
                    listFood.length > 0 &&
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

                                <button className="btn" onClick={() => handleAddToCart(f.id)}>
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
