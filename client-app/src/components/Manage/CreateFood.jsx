import { useNavigate } from 'react-router-dom';
import { POST_FOOD } from '../../api/apiFood';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

export default function CreateFood()
{
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [image, setImage] = useState("");

    const handleChangeImage = (e) => setImage(e.target.value);

    const onSubmit = async (data) =>
    {
        const check = await POST_FOOD(data);
        if (check.status === 201)
        {
            toast.success("Tạo thành công");
            setTimeout(() => navigate("/manage"), 1500);
        }
        else
        {
            toast.error("Tạo thất bại");
        }
    };
    return (
        <section className="order" id="order">
            <div className="heading">
                <span>Tạo món ăn</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                    <div className="inputBox">
                        <span>Tên :</span>
                        <input type="text" placeholder="Tên món ăn..."
                            {...register("name")} required />
                    </div>
                    <div className="inputBox">
                        <span>Đơn giá :</span>
                        <input type="text" placeholder="Giá món ăn..."
                            {...register("price")} required />
                    </div>
                </div>
                <div className="flex">
                    <div className="inputBox">
                        <span>Hình ảnh :</span>
                        <input type="text" placeholder="Ảnh món ăn..."
                            {...register("imagePath")} onChange={handleChangeImage} />
                        <span>Mô tả :</span>
                        <textarea placeholder="Thông tin món ăn..." cols="30" rows="10"
                            {...register("description")}></textarea>
                    </div>
                    <div className="inputBox">
                        <img src={image} alt='' />
                    </div>
                </div>
                <input type="submit" value="Tạo món ăn" className="btn" />
            </form>
        </section>
    )
}
