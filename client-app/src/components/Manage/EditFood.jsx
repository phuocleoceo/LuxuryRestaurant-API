import { GET_FOOD_BY_ID, PUT_FOOD } from '../../api/apiFood';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function EditFood()
{
    let navigate = useNavigate();
    const { foodId } = useParams();
    const [food, setFood] = useState({});
    const [image, setImage] = useState("");
    const { register, handleSubmit, reset } = useForm();

    //Fix defaultValue in react-hook-form
    useEffect(() => reset(food), [reset, food]);

    useEffect(() =>
    {
        const getFoodInfor = async () =>
        {
            const response = await GET_FOOD_BY_ID(foodId);
            if (response.status === 200)
            {
                setFood(response.data);
                setImage(response.data.imagePath);
            }
        }
        getFoodInfor();
    }, [foodId]);

    const handleChangeImage = (e) => setImage(e.target.value);

    const onSubmit = async (data) =>
    {
        const response = await PUT_FOOD(data.id, data);
        if (response.status === 204)
        {
            toast.success("Sửa thành công");
            setTimeout(() => navigate("/manage"), 1500);
        }
        else
        {
            toast.error("Sửa thất bại");
        }
    };

    return (
        <section className="order" id="order">
            <div className="heading">
                <span>Sửa món ăn</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                    <div className="inputBox">
                        <span>Tên :</span>
                        <input type="text" placeholder="Tên món ăn..."
                            {...register("name")} required defaultValue={food.name} />
                    </div>
                    <div className="inputBox">
                        <span>Đơn giá :</span>
                        <input type="text" placeholder="Giá món ăn..."
                            {...register("price")} required defaultValue={food.price} />
                    </div>
                </div>
                <div className="flex">
                    <div className="inputBox">
                        <span>Hình ảnh :</span>
                        <input type="text" placeholder="Ảnh món ăn..." defaultValue={food.imagePath}
                            {...register("imagePath")} onChange={handleChangeImage} />
                        <span>Mô tả :</span>
                        <textarea placeholder="Thông tin món ăn..." cols="30" rows="10"
                            {...register("description")} defaultValue={food.description}></textarea>
                    </div>
                    <div className="inputBox">
                        <img src={image} alt='' />
                    </div>
                </div>
                <input type="submit" value="Sửa món ăn" className="btn" />
            </form>
        </section>
    )
}
