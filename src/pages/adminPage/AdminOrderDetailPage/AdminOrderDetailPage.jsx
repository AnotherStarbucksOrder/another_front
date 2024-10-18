/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useParams } from "react-router-dom"; // useParams 임포트
import * as s from "./style";

function AdminOrderDetailPage(props) {
    const { orderId } = useParams(); // URL에서 menuId 가져오기
    const [status, setStatus] = useState("완료")

    const [orders, setOrders] = useState([
        { orderId: 1, orderStatus: "완료", orderType: "카드", price: 1000, orderDate: "2024-01-01", orders: "sadsadsa" },
        { orderId: 2, orderStatus: "취소", orderType: "포인트", price: 2300, orderDate: "2024-01-01", orders: "dasdsada" },
        { orderId: 3, orderStatus: "완료", orderType: "카드", price: 20000, orderDate: "2024-01-01", orders: "dasdsa" },
    ]);

    const order = orders.find(order => order.orderId === parseInt(orderId)); // menuId에 해당하는 메뉴 찾기

    const handleBackOnClick = () => {
        window.history.back();
    }

    const handleCancleOnClick = () => {
        if (window.confirm("해당 주문을 취소하시겠습니까?")) {
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
                            <div css={s.option}>
                                <div css={s.infoBox}>
                                    <p css={s.optionTitle}>주문 날짜 : </p>
                                    <div css={s.selectContainer}>{order ? order.orderDate : ''}</div>
                                </div>
                                <div css={s.infoBox}>
                                    <p css={s.optionTitle}>주문 번호 : </p>
                                    <div css={s.selectContainer}>{order ? order.orderId : ''}</div>
                                </div>
                                <div css={s.infoBox}>
                                    <p css={s.optionTitle}>결제 방식 : </p>
                                    <div css={s.selectContainer}>{order ? order.orderType : ''}</div>
                                </div>
                                <div css={s.infoBox}>
                                    <p css={s.optionTitle}>주문 상태 : </p>
                                    <div css={s.selectContainer}>{order ? order.orderStatus : ''}</div>
                                </div>
                                <div css={s.infoBox}>
                                    <p css={s.optionTitle}>주문 목록 : </p>
                                    <div css={s.orderList}>{order ? order.orders : ''}</div>
                                </div>
                                <div css={s.infoBox}>
                                    <p css={s.optionTitle}>결제 금액 : </p>
                                    <div css={s.selectContainer}>{order ? order.price : ''}</div>
                                </div>
                            </div>
                        <div css={s.buttonBox}>
                            <button onClick={handleCancleOnClick}>취소</button>
                            <button onClick={handleBackOnClick}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminOrderDetailPage;
