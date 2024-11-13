import React, { useEffect, useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaStar } from "react-icons/fa";
import { ordersAtom } from '../../atoms/ordersAtom';
import { useSetRecoilState } from 'recoil';

function MainTop() {

    const navigate = useNavigate();
    const location = useLocation();
    const setOrders = useSetRecoilState(ordersAtom);
    const [ clickCount, setClickCount ] = useState(0);

    // 홈 버튼 작동 구간 제한 
    const isHomeButtonEnabled = location.pathname === "/home" || location.pathname.startsWith("/menu/detail");

    useEffect(() => {
        let timer;

        if (clickCount > 0) {
            timer = setTimeout(() => {
                setClickCount(0); 
            }, 1000);
        }

        if (clickCount >= 3) {
            navigate("/admin/auth/signin");
        }
        return () => clearTimeout(timer);

    }, [clickCount]); 

    // 상단에 HomeButton 눌렀을 때 
    const handleHomeButtonOnClick = () => {
        setOrders(order => ({
            ...order,
            orderType: 0, 
            originalAmount: 0,
            paymentType: 0,
            products: [],
        }));
        navigate("/")
    };

    // 상단에 별 버튼 3번 클릭 시, admin 페이지로 이동
    const handleFaStarOnClick = () => {
        setClickCount(count => count + 1);
    };

    return (
        <>
            <div css={s.layout}>
                {
                    isHomeButtonEnabled 
                    ? <FaHome onClick={handleHomeButtonOnClick}/>
                    : <FaHome/>
                }
                <div css={s.titleBox}>
                    <div css={s.imgBox}>
                        <img src="https://i.namu.wiki/i/9p8OVxJTce_f2HnuZF1QOU6qMSHqXBHdkcx3q_hlGxvhcyaOXKxBVyoDkeg-Cb4Nx2p60W0AUh6RzjAH59vHwQ.svg" alt="" />
                    </div>
                    <p>ANOTHER STARBUCKS</p>
                </div>
                <FaStar onClick={handleFaStarOnClick}/>
            </div>
        </>
    )
}

export default MainTop;