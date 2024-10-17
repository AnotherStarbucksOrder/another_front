import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

function MainFooter() {

    const navigate = useNavigate();

    const [ totalCount, setTotalCount ] = useState(1);
    // const [ orderCart, setOrderCart ] = useState([]);

    // 수량 + 버튼 클릭했을 때
    const handlePlusButtonOnClick = () => {
        setTotalCount(totalCount => totalCount + 1);
    }

    // 수량 - 버튼 클릭했을 때 
    const handleMinusButtonOnClick = () => {    
        if(totalCount > 1) {
            setTotalCount(totalCount => totalCount - 1);
        }
    }

    // 결제하기 버튼 클릭했을 때
    const handlePaymentOnClick = () => {
        navigate("/payment");
    };


    return (
        <div css={s.layout}>
            <div css={s.orderContainer}>
                <p>Order</p>
                <div css={s.orderDetailContainer}>
                    <div css={s.orderDetail}>
                        <div css={s.orderProduct}>
                            <button><FontAwesomeIcon icon={faXmark} /></button>
                            <p>자몽허니블랙티</p>
                        </div>
                        <div css={s.countButtons}>
                            <button onClick={handleMinusButtonOnClick}><FaCircleMinus/></button>
                            <p>{totalCount}</p>
                            <button onClick={handlePlusButtonOnClick}><FaCirclePlus/></button>
                            <p>100,000원</p>
                        </div>
                    </div>
                    <div css={s.orderDetail}>
                        <div css={s.orderProduct}>
                            <button><FontAwesomeIcon icon={faXmark} /></button>
                            <p>아메리카노</p>
                        </div>
                        <div css={s.countButtons}>
                            <button onClick={handleMinusButtonOnClick}><FaCircleMinus/></button>
                            <p>{totalCount}</p>
                            <button onClick={handlePlusButtonOnClick}><FaCirclePlus/></button>
                            <p>100,000원</p>
                        </div>
                    </div>
                </div>
            </div>
            <div css={s.totalContainer}>
                <div css={s.totalCount}>
                    <p>총 수량: 10개</p>
                    <p>총 가격: 100,000원</p>
                </div>
                <div css={s.buttons}>
                    <button>전체 삭제</button>
                    <button onClick={handlePaymentOnClick}>결제 하기</button>
                </div>
            </div>
        </div>
    )
}

export default MainFooter;