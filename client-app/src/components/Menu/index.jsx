import useGetPagination from '../../hooks/useGetPagination';
import { ADD_TO_CART } from '../../redux/slices/cartSlice';
import { GET_FOOD } from '../../api/apiFood';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import React from 'react';

export default function Menu()
{
    const dispatch = useDispatch();
    const { isLoading, data: listFood } = useGetPagination(GET_FOOD);

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
                    isLoading ? <div className="loader"></div> :
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
