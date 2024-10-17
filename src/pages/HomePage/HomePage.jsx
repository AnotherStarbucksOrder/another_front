import React from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { FaCoffee } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { ordersAtom } from '../../atoms/ordersAtom';
import { useSetRecoilState } from 'recoil';

function HomePage() {

    const navigate = useNavigate();

    const setOrdersAtom = useSetRecoilState(ordersAtom);

    const handleTakeOutClick = () => {
        setOrdersAtom(orders => ({
            ...orders,
            orderType: "takeout"
        }))
        navigate('/home');
    };
    
    const handleEatInClick = () => {
        setOrdersAtom(orders => ({
            ...orders,
            orderType: "eatIn"
        }))
        navigate('/home');
    };

    return (
        <div css={s.layout}>
            <div css={s.logo}>
                <img src="https://i.namu.wiki/i/9p8OVxJTce_f2HnuZF1QOU6qMSHqXBHdkcx3q_hlGxvhcyaOXKxBVyoDkeg-Cb4Nx2p60W0AUh6RzjAH59vHwQ.svg" alt="" />
                <div>ANOTHER STARBUCKS</div>
            </div>
            <div css={s.buttons}>
                <button onClick={handleTakeOutClick}><FontAwesomeIcon icon={faShoePrints} />포장</button>
                <button onClick={handleEatInClick}><FaCoffee/>매장</button>
            </div>
        </div>
    )
}

export default HomePage;