import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';
import MainTop from '../../../components/MainTop/MainTop';
import MainTopBar from '../../../components/MainTopBar/MainTopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ordersAtom } from '../../../atoms/ordersAtom';
import { useRecoilState } from 'recoil';
import CouponModal from '../CouponModal/CouponModal';

function PointPaymentPage() {

    const navigate = useNavigate();

    const [ orders, setOrders ] = useRecoilState(ordersAtom);
    const [ isOpenModal, setOpenModal ] = useState(false);

    // x 버튼 클릭 했을 때 
    const handleCancleOnClick = () => { 
        setOrders(orders => ({
            ...orders,
            paymentType: "",
            user:  {
                userId: 0,            
                phoneNumber: "010-",
                coupons: []
            }
        }))
        navigate("/payment");
    };

    // 쿠폰 클릭 시, modal창 open
    const handleCouponOnClick = (couponId) => {
        setOrders({
            ...orders,
            selectedCoupon: couponId  
        });
        setOpenModal(true)
        console.log(couponId)
    }


    return (
        <>
            <MainTop/>
            <MainTopBar/>
            <div css={s.layout}>
                <button onClick={handleCancleOnClick}><FontAwesomeIcon icon={faXmark} /></button>
                <p>보유 쿠폰</p>
                <div css={s.container}>
                    <div>
                        {   
                            orders.user.coupons.map(coupon =>
                                <div css={s.couponInfo} key={coupon.couponId} onClick={() => handleCouponOnClick(coupon.couponId)}>
                                    <img src="/starImg.jpg" alt="" />
                                    <div css={s.couponDetail}>
                                        <p>Another Starbucks</p>
                                        <p>{coupon.couponName}</p>
                                        <p>{coupon.registerDate.slice(0, 10)}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <button>적용 하기</button>
                </div>
                    <CouponModal isOpenModal={isOpenModal} setOpenModal={setOpenModal} />
            </div>
        </>
    )
}

export default PointPaymentPage;