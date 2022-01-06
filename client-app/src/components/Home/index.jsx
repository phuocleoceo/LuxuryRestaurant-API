import React from 'react';
import './Home.css';

export default function Home()
{
    return (
        <div className="HomePage">
            <section className="home" id="home">
                <div className="swiper-container home-slider">
                    <div className="swiper-wrapper wrapper">
                        <div className="swiper-slide slide">
                            <div className="content">
                                <span>Về Luxury Restaurant</span>
                                <h3>Địa điểm</h3>
                                <p>Toạ lạc tại 54 Nguyễn Lương Bằng, phường Hoà Khánh Bắc, quận Liên Chiểu, thành phố Đà Nẵng
                                </p>
                            </div>
                            <div className="image">
                                <img src="https://ltd-01.b-cdn.net/wp-content/uploads/2020/05/Love-that-design-Mama-Pho-Restaurant-02.jpg"
                                    alt=""></img>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
