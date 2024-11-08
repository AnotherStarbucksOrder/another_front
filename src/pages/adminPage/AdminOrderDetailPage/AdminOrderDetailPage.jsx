/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import * as s from "./style";
import {  useMutation, useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import axios from "axios";

function AdminOrderDetailPage(props) {
    const { orderId } = useParams();
    const [orderInfo, setOrderInfo] = useState({
        createDate: '',
        orderId: '',
        orderState: 0, 
        orderType: 0, 
        orderAmount: 0,
        paymentType: 0,
        orderDetail: []
    });

    // 옵션 상세 조회
    const order = useQuery(
        ["orderQuery"],
        async () => await instance.get(`/admin/order/${orderId}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response)
                setOrderInfo(response?.data)
            }
        }
    )

    const getPaymentType = (type) => {
        switch (type) {
            case 1: return '카드';
            case 2: return '복합';
            case 3: return '쿠폰/전액 특별결제';
            default: return '알 수 없음';
        }
    };
    const getOrderType = (type) => {
        switch (type) {
            case 1: return 'take-out';
            case 2: return 'eat-in';
            default: return '알 수 없음';
        }
    };
    const getOrderState = (state) => {
        switch (state) {
            case 1: return '결제완료';
            case 2: return '주문취소';
            default: return '알 수 없음';
        }
    };

    // 주문 상태 변경
    const orderCancelMutation = useMutation(
        async (orderId) => await instance.patch(`/admin/order/${orderId}/cancellation`),
        {
            onSuccess: response => {
                order.refetch();
                console.log(response);
            }
        }
    )

    // portone api 인증
    const accessLoginMutation = useMutation(
        ["accessLogin"],
        async () => axios.post("https://api.portone.io/login/api-secret", {"apiSecret":process.env.REACT_APP_PORTONE_API_KEY})
    )
    
    // 결제 취소
    const cancelMutation = useMutation(
        async ({accessToken, paymentId}) => {
            const options = {
                method: "post",
                url: `https://api.portone.io/payments/${paymentId}/cancel`,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                data: { reason: "주문 취소 요청" } 
            };
    
            const { data } = await axios.request(options);
            return data;
        },
        {
            onSuccess: () => {
                alert("주문이 성공적으로 취소되었습니다.");
                orderCancelMutation.mutateAsync(order.data.data.orderId);
            },
            onError: (error) => {
                console.error("결제 취소 실패:", error);
                alert("결제 취소 중 오류가 발생했습니다.");
            }
        }
    );
    
    const handleBackOnClick = () => {
        window.history.back();
    }

    const handleCancleOnClick = () => {
        if (window.confirm("해당 주문을 취소하시겠습니까?")) {
            const paymentId = orderInfo.paymentId;
            accessLoginMutation.mutateAsync().then(response => {
                cancelMutation.mutateAsync({accessToken: response.data.accessToken, paymentId});
            });
            
        }
    }

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>주문 관리( 수정 할 걸? )</p>
                </div>
                <div css={s.Container}>
                    <div css={s.infoContainer}>
                        <div css={s.order}>
                            <div css={s.orderDetail}>
                                <p>주문 날짜</p>
                                {orderInfo.createDate.split("T")[0]}
                            </div>
                            <div css={s.orderDetail}>
                                <p>주문 번호</p>
                                {(orderInfo.orderId)}
                            </div>
                            <div css={s.orderDetail}>
                                <p>주문 상태</p>
                                {getOrderState(orderInfo.orderState)}
                            </div>
                            <div css={s.orderDetail}>
                                <p>주문 방법</p>
                                {getOrderType(orderInfo.orderType)}
                            </div>
                            <div css={s.orderDetail}>
                                <p>주문 금액</p>
                                {orderInfo.orderAmount.toLocaleString() + "원"}
                            </div>
                            <div css={s.orderMenu}>
                                <p>주문 메뉴</p>
                                {
                                    order?.data?.data.orderDetail.map(order =>
                                        <div css={s.orderList} key={order.orderDetailId}>
                                            <div css={s.menuName}>
                                                {order.orderComment}
                                            </div>
                                            {order.quantity}
                                        </div>
                                    )
                                }
                            </div>
                            <div css={s.orderDetail}>
                                <p>결제 방식</p>
                                {getPaymentType(orderInfo.paymentType)}
                            </div>
                        </div>
                        <div css={s.buttonBox}>
                            {
                                orderInfo.orderState === 1
                                    ?
                                    <>
                                        <button onClick={handleCancleOnClick}>취소</button>
                                        <button onClick={handleBackOnClick}>확인</button>
                                    </>
                                    :
                                    <button onClick={handleBackOnClick}>확인</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminOrderDetailPage;
