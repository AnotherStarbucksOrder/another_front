import React from 'react'
import MainTop from '../../../components/MainTop/MainTop';
import MainTopBar from '../../../components/MainTopBar/MainTopBar';
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from 'react-router-dom';
import { defaultOrders, ordersAtom, portoneData } from '../../../atoms/ordersAtom';
import { useRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { instance } from '../../../apis/util/instance';
import * as PortOne from "@portone/browser-sdk/v2";
import Swal from 'sweetalert2';

function CardPaymentPage() {

    const navigate = useNavigate();

    const [ orders, setOrders ] = useRecoilState(ordersAtom);

    // 이전버튼 클릭 시
    const beforeOnClick = () => {
        setOrders(orders => ({
            ...orders,
            paymentType: 0,
            amount: orders.originalAmount,
            user: {
                ...orders.user,
                userId: 0,
                phoneNumber: "010-",
                coupons: [],
                usedCoupon: []
            }
        }))
        navigate("/payment");
    }

    // *결제하기 버튼 클릭 시 -> 포트원 결제 요청 날림 
    const payMentCompletedOnClick = () => { 
        processPortOnePayment();
    }

    // * 포트원 결제 로직
    const processPortOnePayment = () => {
        const newPortoneData = { 
            ...portoneData,
            paymentId: crypto.randomUUID(),
            totalAmount: orders.amount,
            products: orders.products.map(item => ({
                id: item.menuId,
                name: item.menuName + "(" + item.options.map(option => option.optionName + "-" + option.optionDetailValue).join(', ') + ")",
                amount: item.totalPrice,
                quantity: item.count,
            }))
        };

        PortOne.requestPayment(newPortoneData)
        .then(response => {
            // 포트원 성공 시
            if(response.transactionType === "PAYMENT" && !response.code) { 
                setOrders(orders => ({
                    ...orders,
                    paymentId: response.paymentId
                }))

                // 백엔드 보낼 데이터 
                const orderData = {
                    paymentId: response.paymentId,
                    totalAmount: newPortoneData.totalAmount,
                    totalQuantity: orders.quantity,
                    orderType: orders.orderType,
                    paymentType: orders.paymentType,
                    customer: {
                        userId: orders.user.userId,
                        phoneNumber: orders.user.phoneNumber,
                        usedCoupon: orders.user.usedCoupon.map(coupon => coupon.couponId) 
                    },
                    products: newPortoneData.products,
                }

                // 카드결제인 경우, 별 적립 여부 (쿠폰 결제 별 적립 x)
                if(orders.paymentType === 1) {
                    Swal.fire({
                        title: "별 적립을 하시겠습니까?",
                        color: "#036635",
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: "네",
                        cancelButtonText: "아니요"
                    }).then(result => {
                        if (result.isConfirmed) {
                            navigate("/reward"); 
                        } else {
                            orderMutation.mutateAsync(orderData);
                        }
                    })
                } else {
                    orderMutation.mutateAsync(orderData);
                }

            // 카카오페이 x 버튼 클릭 시 (결제 취소)
            }  else if(response.code === "FAILURE_TYPE_PG" && response.pgCode === "CANCEL") { 
                Swal.fire({
                    title: "결제가 취소되었습니다.",
                    color: "#036635",
                    confirmButtonColor: "#3EA270",
                    confirmButtonText: "확인"
                }).then(() => {
                    beforeOnClick();  
                });
        }
    })
    // 결제 중 오류 발생 
    .catch(error => {
        Swal.fire({
            title: "결제 중 오류가 발생하였습니다. 다시 결제해주세요",
            color: "#036635",
            confirmButtonColor: "#3EA270",
            confirmButtonText: "확인"
        }).then(() => {
            beforeOnClick();  // 이전 화면으로 이동
        });
    });
}

    // *결제완료데이터 Mutation (관리자 필요 데이터)
    const orderMutation = useMutation(
        async (orderData) => await instance.post('/order', orderData),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                let timerInterval;
                Swal.fire({
                    title: "결제가 완료되었습니다!",
                    color: "#036635",
                    html: "<b>5</b>초 뒤 자동으로 홈화면으로 이동합니다!",
                    timer: 5000,
                    timerProgressBar: false,
                    showConfirmButton: false,
                    didOpen: () => {
                        const b = Swal.getHtmlContainer().querySelector('b');
                        timerInterval = setInterval(() => {
                            b.textContent = Math.ceil(Swal.getTimerLeft()/1000);
                        }, 1000)
                    },
                    willClose: () => {
                        clearInterval(timerInterval);  
                    }
                }).then(result => {
                    navigate("/");
                    setOrders(defaultOrders)
                })
            }
        }
    )
    console.log(orders)

    return (
    <>
        <MainTop/>
        <MainTopBar handleCategoryOnChange={() => {}}/>
        <div css={s.layout}>
            <div css={s.totalCount}>
                <p>카드를 넣어주세요</p>
                <p>기기하단에 있는 카드리더기에 카드를 넣어주세요</p>
                <p>결제금액: {(orders.amount).toLocaleString()}원</p>
            </div>
            <img src="/cardImg.jpg" alt="" />
            <div css={s.buttons}>
                <button onClick={beforeOnClick}>이전</button>
                <button onClick={payMentCompletedOnClick}>결제하기</button>
            </div>
        </div>
    </>
    )
}

export default CardPaymentPage;

