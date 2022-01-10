import React, { useState, useEffect } from 'react';
import { GET_ALL_USER } from '../../api/apiUser';

export default function ManageUser()
{
    const [listUser, setListUser] = useState([]);
    useEffect(() =>
    {
        const getUser = async () =>
        {
            const response = await GET_ALL_USER();
            if (response.status === 200)
            {
                setListUser(response.data);
            }
        }
        getUser();
    }, []);
    return (
        <section className="manage-container">
            <div className="table-Container">
                <p className="title heading">
                    <span>Quản Lý Người dùng</span>
                </p>
                <div className="table-box">
                    <table id="food-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên đăng nhập</th>
                                <th>Tên hiển thị</th>
                                <th>Vai trò</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                listUser.length > 0 &&
                                listUser.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.username}</td>
                                        <td>{u.displayname}</td>
                                        <td>{u.role}</td>
                                        < td >
                                            <span className="action_btn">
                                                <span className="fas fa-user-lock"></span>
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
