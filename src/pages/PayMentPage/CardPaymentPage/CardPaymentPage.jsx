import React from 'react'
import MainTop from '../../../components/MainTop/MainTop';
import MainTopBar from '../../../components/MainTopBar/MainTopBar';
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ordersAtom } from '../../../atoms/ordersAtom';
import { useRecoilState } from 'recoil';

function CardPaymentPage() {

    const navigate = useNavigate();

    const [ orders, setOrders ] = useRecoilState(ordersAtom);
    const phoneNumber = orders.user.phoneNumber;
    
    
    const beforeOnClick = () => {
        setOrders(orders => ({
            ...orders,
            paymentType: "",
            user: {
                phoneNumber: "010-"
            }
        }))
        navigate("/payment");
    }
    
    const completedMessage = phoneNumber === "010-" ? "결제가 완료되었습니다."
                        : `${phoneNumber.slice(-4)}님, 주문이 완료되었습니다.\n포인트 개수: 5개` 


    const payMentCompletedOnClick = () => { 
        let timerInterval;
        Swal.fire({
            title: completedMessage,
            color: "#036635",
            html: "<b>5</b>초 뒤 자동으로 홈화면으로 이동합니다",
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false,
            didOpen: () => {
                const b = Swal.getHtmlContainer().querySelector('b');
                timerInterval = setInterval(() => {
                    b.textContent = Math.ceil(Swal.getTimerLeft() / 1000); 
                }, 1000); 
            },
            willClose: () => {
                clearInterval(timerInterval);  
            }
        }).then(result => {
            setOrders(orders => ({
                orderType: "",
                paymentType: "",
                user: {
                    phoneNumber: "010-"
                }
            }))
            navigate("/")
        })
    }

    console.log(orders);

    return (
    <>
        <MainTop/>
        <MainTopBar/>
        <div css={s.layout}>
            <div css={s.totalCount}>
                <p>카드를 넣어주세요</p>
                <p>기기하단에 있는 카드리더기에 카드를 넣어주세요</p>
                <p>결제금액: 8,500원</p>
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

