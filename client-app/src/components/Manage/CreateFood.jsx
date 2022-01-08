import React from 'react';

export default function CreateFood()
{
    return (
        <section className="order" id="order">
            <div className="heading">
                <span>Tạo món ăn</span>
            </div>

            <form>
                <div className="flex">
                    <div className="inputBox">
                        <span>Tên :</span>
                        <input type="text" placeholder="Tên món ăn..." />
                    </div>
                    <div className="inputBox">
                        <span>Đơn giá :</span>
                        <input type="text" placeholder="Giá món ăn..." />
                    </div>
                </div>
                <div className="flex">
                    <div className="inputBox">
                        <span>Hình ảnh :</span>
                        <input type="text" placeholder="Ảnh món ăn..." />
                        <span>Mô tả :</span>
                        <textarea placeholder="Thông tin món ăn..." cols="30" rows="10"></textarea>
                    </div>
                    <div className="inputBox">
                        <img src='https://vnn-imgs-f.vgcloud.vn/2021/09/07/09/chu-meo-noi-tieng-mang-xa-hoi-voi-phong-cach-thoi-trang-sanh-dieu.jpeg' alt='' />
                    </div>
                </div>
                <input type="submit" value="Tạo món ăn" className="btn" />
            </form>
        </section>
    )
}
