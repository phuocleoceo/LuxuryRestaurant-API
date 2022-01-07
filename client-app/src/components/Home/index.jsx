import React from 'react';
import HomeIMG from '../../assets/img/home-img.png';
import ParallaxIMG from '../../assets/img/home-parallax-img.png';

export default function Home()
{
    return (
        <section className="home" id="home">
            <div className="content">
                <span>Về Luxury Restaurant</span>
                <h3>Nhà hàng số 1 VN 😋</h3>
                <p>Toạ lạc tại 54 Nguyễn Lương Bằng, phường Hoà Khánh Bắc, quận Liên Chiểu, thành phố Đà Nẵng</p>
            </div>

            <div className="image">
                <img src={HomeIMG} alt="" className="home-img" />
                <img src={ParallaxIMG} alt="" className="home-parallax-img" />
            </div>
        </section>
    )
}
