import React, { useEffect, useRef, useState } from 'react'
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
    const [ modalElement, setModalElement ] = useState(<></>);
    const [ selectedCouponId ,setSelectedCouponId] = useState(null);
    const pointPaymentRef = useRef();

    useEffect(() => {
        if(!!pointPaymentRef.current) {
            setModalElement(<CouponModal isOpenModal={isOpenModal} setOpenModal={setOpenModal} pointPaymentRef={pointPaymentRef} selectedCouponId={selectedCouponId}/>);
        }
    }, [pointPaymentRef.current, isOpenModal])

    // x 버튼 클릭 했을 때 
    const handleCancleOnClick = () => { 
        setOrders(orders => ({
            ...orders,
            paymentType: 0,
            user:  {
                userId: 0,
                usedCoupon: [],            
                phoneNumber: "010-",
                coupons: []
            }
        }))
        navigate("/payment");
    };

    // 쿠폰 클릭 시, modal창 open
    const handleCouponOnClick = (couponId) => {
        setSelectedCouponId(couponId);
        setOpenModal(true);
    }

    // 적용하기 버튼 클릭 시 -> 쿠폰 사용 후 금액 계산(이 경우, 옵션 가격 후 가격)
    const handleApplyOnClick = () => {
        let discountAmount = 0;

        // 사용된 쿠폰을 반복 -> 각 쿠폰에 사용 된 menuId 뽑아 옴, 
        // orders에 저장된 prouct 순회하면서 뽑아온 menuId랑 같은거 products에 담음 
        for (let i = 0; i < orders.user.usedCoupon.length; i++) {
            const { menuId } = orders.user.usedCoupon[i];
            const products = orders.products.filter(p => p.menuId === menuId);
        
            // 기본가격 저장 
            for (const product of products) {
                let totalProductPrice = product.menuPrice;
                
                // 옵션 가격 더하기 
                for (const option of product.options) {
                    totalProductPrice += option.optionDetailPrice;
                }
                
                discountAmount += totalProductPrice;
            }
        }
    
        setOrders({
            ...orders,
            amount: orders.amount - discountAmount,
            originalAmount: orders.amount
        });

        navigate("/payment/card");
    };


    return (
        <>
            <MainTop/>
            <MainTopBar/>
            <div css={s.layout} ref={pointPaymentRef}>
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
                    <button onClick={handleApplyOnClick}>적용 하기</button>
                </div>
                {modalElement}
            </div>
        </>
    )
}

export default PointPaymentPage;