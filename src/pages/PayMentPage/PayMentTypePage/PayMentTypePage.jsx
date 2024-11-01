import React from 'react';
import MainTop from '../../../components/MainTop/MainTop';
import MainTopBar from '../../../components/MainTopBar/MainTopBar';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { ordersAtom } from '../../../atoms/ordersAtom';
import { useRecoilState } from 'recoil';

function PayMentTypePage() {

    const navigate = useNavigate();

    const [ orders, setOrders ] = useRecoilState(ordersAtom);

    console.log(orders)

    // 상단에 - 버튼 클릭 시
    const handleCancleOnClick = () => {
        navigate("/home");
    };

    // 별 쿠폰 사용
    const handlePointOnClick = () => {  
        setOrders(order => ({
            ...order,
            paymentType: "star",
        }))
        navigate("/reward");
    };

    // 카드 결제 클릭 
    const handleCardOnClick = () => {
        setOrders(order => ({
            ...order,
            paymentType: "card"
        }))
        navigate("/payment/card");
    };

    return (
        <>
            <MainTop/>
            <MainTopBar handleCategoryOnChange={() => {}}/>
            <div css={s.layout}>
                <div css={s.container}>
                    <button onClick={handleCancleOnClick}><FontAwesomeIcon icon={faXmark} /></button>
                    <p>주문 결제</p>
                    <div css={s.menuContainer}>
                        {
                            orders.products.map(menuCart => 
                                <div css={s.menuInfo} key={menuCart.menuId}>
                                    <div css={s.productInfo}>
                                        <p>{menuCart.menuName}</p>
                                        <p>{menuCart.options.map(option => option.optionName + "(" + option.optionDetailValue + ")").join(', ')}</p>
                                    </div> 
                                    <div css={s.productPrice}>
                                        <p>{menuCart.count} 개</p>
                                        <p>{(menuCart.totalPrice).toLocaleString()} 원</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div css={s.bottom}>
                        <div css={s.totalCount}>
                            <p>합 계</p>
                            <div>
                                <p>{orders.quantity} 개</p>
                                <p>{orders.amount.toLocaleString()} 원</p>
                            </div>
                        </div>
                        <div css={s.buttons}> 
                            <button onClick={handlePointOnClick}>쿠폰 결제</button>
                            <button onClick={handleCardOnClick}>카드 결제</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PayMentTypePage;