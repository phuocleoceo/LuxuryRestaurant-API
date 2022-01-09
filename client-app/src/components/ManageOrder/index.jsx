import { GET_ALL_ORDER } from '../../api/apiOrder';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

export default function ManageOrder()
{
    const [listOrder, setListOrder] = useState([]);
    useEffect(() =>
    {
        const getOrder = async () =>
        {
            const response = await GET_ALL_ORDER();
            if (response.status === 200)
            {
                setListOrder(response.data);
            }
        }
        getOrder();
    }, []);
    return (
        <section className="manage-container">
            <div className="table-Container">
                <p className="title heading">
                    <span>Quản Lý Đơn hàng</span>
                </p>
                <div className="table-box">
                    <table id="food-table">
                        <thead>
                            <tr>
                                <th>Người mua</th>
                                <th>SĐT</th>
                                <th>Địa chỉ</th>
                                <th>Tổng thanh toán</th>
                                <th>Ngày đặt</th>
                                <th>Danh sách món</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                listOrder.length > 0 &&
                                listOrder.map(o => (
                                    <tr key={o.id}>
                                        <td>{o.name}</td>
                                        <td>{o.phoneNumber}</td>
                                        <td>{o.address}</td>
                                        <td>{o.orderTotal}</td>
                                        <td>{moment(o.orderDate).format('DD/MM/YYYY , hh:mm a')}</td>
                                        < td >
                                            <span className="action_btn">
                                                <span className="fas fa-eye"></span>
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
