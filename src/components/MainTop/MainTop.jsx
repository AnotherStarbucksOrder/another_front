import React from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { Link } from 'react-router-dom';
import { FaHome, FaStar } from "react-icons/fa";

function MainTop() {

    return (
        <>
        <div css={s.layout}>
            <Link to={"/"}><FaHome/></Link>
            <div css={s.titleBox}>
                <div css={s.imgBox}>
                <img src="https://i.namu.wiki/i/9p8OVxJTce_f2HnuZF1QOU6qMSHqXBHdkcx3q_hlGxvhcyaOXKxBVyoDkeg-Cb4Nx2p60W0AUh6RzjAH59vHwQ.svg" alt="" />
                </div>
                <p>ANOTHER STARBUCKS</p>
            </div>
            <Link to={"/admin"}><FaStar/></Link>
        </div>
        </>
    )
}

export default MainTop;