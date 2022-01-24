import useGetPagination from '../../hooks/useGetPagination';
import { GET_FOOD, DELETE_FOOD } from '../../api/apiFood';
import Pagination from '../Other/Pagination';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import React, { useState } from 'react';

export default function ManageFood()
{
    const [filters, setFilters] = useState({
        PageNumber: 1,
        PageSize: 5
    });
    const { isLoading, data: listFood, pagination,
        handleForceReload } = useGetPagination(GET_FOOD, filters);

    const handlePageChange = (newPage) =>
    {
        setFilters({
            ...filters,
            PageNumber: newPage
        });
    }

    const handleDelete = async (foodId) =>
    {
        if (window.confirm("Bạn chắc chắn muốn xoá chứ ?"))
        {
            const response = await DELETE_FOOD(foodId);
            if (response.status === 204)
            {
                toast.success("Xoá thành công");
            }
            else
            {
                toast.error("Xoá thất bại");
            }
            handleForceReload();
        }
    }

    return (
        <section className="manage-container">
            <div className="table-Container">
                <p className="title heading">
                    <span>Quản Lý Món Ăn</span>
                </p>
                <Link to="/manage/food/create">
                    <span className="upsert">
                        <i className="fas fa-plus"></i> &nbsp;
                        Tạo món mới
                    </span>
                </Link>
                {isLoading ? <div className="loader"></div> :
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
                                                    <Link to={"/manage/food/edit/" + f.id}>
                                                        <span className="fas fa-edit"></span>
                                                    </Link>

                                                    <span className="fas fa-trash-alt"
                                                        onClick={() => handleDelete(f.id)}></span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange} />
                    </div>
                }
            </div>
        </section>
    )
}
