import NotFoundIMG from '../../assets/img/NotFound.png';
import React from 'react';

export default function NotFound()
{
    return (
        <div style={{ textAlign: "center", marginTop: "15vh" }}>
            <img width="40%" height="auto" src={NotFoundIMG} alt="notfound" />
            <h1 style={{ color: "red" }}>This page could not be found !</h1>
        </div >
    )
}
