import React, { useState, useEffect } from 'react';
import { GET_FOOD } from '../../api/apiFood';

export default function Manage()
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
        <section className="manage-container">
            <div className="table-Container">
                <p className="title">Quản Lý Món Ăn</p>
                <span onClick={() => alert("hihi")} className="upsert">
                    <i className="fas fa-plus"></i> &nbsp;
                    Tạo món mới
                </span>
                <div className="table-box">
                    <table id="food-table">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Giá</th>
                                <th>Mô tả</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                listFood.length > 0 &&
                                listFood.map(f => (
                                    <tr key={f.id}>
                                        <td>{f.name}</td>
                                        <td>{f.price}</td>
                                        <td>{f.description}</td>
                                        <td>
                                            <span className="action_btn">
                                                <span className="fas fa-edit"
                                                    onClick={() => alert(f.id)}></span>

                                                <span className="fas fa-trash-alt"
                                                    onClick={() => alert(f.id)}></span>
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
