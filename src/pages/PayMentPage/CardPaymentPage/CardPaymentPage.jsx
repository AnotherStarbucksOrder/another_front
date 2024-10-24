import React from 'react'
import MainTop from '../../../components/MainTop/MainTop';
import MainTopBar from '../../../components/MainTopBar/MainTopBar';
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { defaultOrders, ordersAtom, portoneData } from '../../../atoms/ordersAtom';
import { useRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { instance } from '../../../apis/util/instance';
import * as PortOne from "@portone/browser-sdk/v2";

function CardPaymentPage() {

    const navigate = useNavigate();

    const [ orders, setOrders ] = useRecoilState(ordersAtom);
    const { phoneNumber, point } = orders.user;
    const completedMessage = phoneNumber === "010-" ? "결제가 완료되었습니다."
    : `${phoneNumber.slice(-4)}님, 주문이 완료되었습니다.\n포인트 개수: ${point}개` 

    // 이전버튼 클릭 시
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


    // 결제하기 버튼 클릭 시
    const payMentCompletedOnClick = () => { 
        
        const newPortoneData = { 
            ...portoneData,
            paymentId: crypto.randomUUID(),
            totalAmount: orders.amount,
            products: orders.products.map(item => ({
                id: item.menuId,
                name: item.menuName,
                amount: item.totalPrice,
                quantity: item.count
            })),
            customer: {
                phoneNumber: orders.user.phoneNumber 
            }
        }

        // 포트원으로 요청 보내기 
        PortOne.requestPayment(newPortoneData)
        .then(response => {
            console.log(response)
            const orderData = {
                paymentId: response.paymentId,
                totalAmount: newPortoneData.totalAmount,
                products: newPortoneData.products,
            }
            orderMutation.mutateAsync(orderData);
        })
        .catch(error => alert("오류"));
    }

    // 결제완료데이터 Mutation 
    const orderMutation = useMutation(
        async (order) => {
            return await instance.post('/order', order)
        },
        {
            onSuccess: data => {
                let timerInterval;
                Swal.fire({
                    title: completedMessage,
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

    return (
    <>
        <MainTop/>
        <MainTopBar handleCategoryOnChange={() => {}}/>
        <div css={s.layout}>
            <div css={s.totalCount}>
                <p>카드를 넣어주세요</p>
                <p>기기하단에 있는 카드리더기에 카드를 넣어주세요</p>
                <p>결제금액: {orders.amount}원</p>
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

