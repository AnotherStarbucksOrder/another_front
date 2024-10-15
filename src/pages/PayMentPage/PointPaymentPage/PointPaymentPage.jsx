import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';
import MainTop from '../../../components/MainTop/MainTop';
import MainTopBar from '../../../components/MainTopBar/MainTopBar';
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ordersAtom } from '../../../atoms/ordersAtom';
import { useSetRecoilState } from 'recoil';

function PointPaymentPage() {

    const navigate = useNavigate();

    const [ totalCount, setTotalCount ] = useState(1);
    const setOrders = useSetRecoilState(ordersAtom);

    // x 버튼 클릭 했을 때 
    const handleCancleOnClick = () => { 
        setOrders(orders => ({
            ...orders,
            paymentType: "",
            user: {
                phoneNumber: "010-"
            }
        }))
        navigate("/payment");
    };

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


    return (
        <>
            <MainTop/>
            <MainTopBar/>
            <div css={s.layout}>
                <button onClick={handleCancleOnClick}><FontAwesomeIcon icon={faXmark} /></button>
                <div css={s.point}>
                    <p>보유 포인트 개수: 16개</p>
                    <p>포인트 개수 10개 당 스탬프 1개 사용 가능합니다</p>
                    <div>
                        <p>사용할 스탬프: </p>
                        <button onClick={handleMinusButtonOnClick}><FaCircleMinus/></button>
                        <p>{totalCount}</p>
                        <button onClick={handlePlusButtonOnClick}><FaCirclePlus/></button>
                    </div>
                </div>
                <div css={s.totalCount}> 
                    <div>
                        <p>남은잔액</p>
                        <p>8,500원</p>
                    </div>
                    <button>카드결제</button>
                </div>
            </div>
        </>
    )
}

export default PointPaymentPage;