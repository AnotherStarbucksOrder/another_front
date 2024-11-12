/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams 임포트
import * as s from "./style";

function AdminSaleDetailPage(props) {
    
    const navigate = useNavigate();

    const { orderId } = useParams(); // URL에서 menuId 가져오기

    const [orders, setOrders] = useState([
        { orderId: 1, orderStatus: "완료", orderType: "카드", price: 1000, orderDate: "2024-01-01", orders: "sadsadsa" },
        { orderId: 2, orderStatus: "취소", orderType: "포인트", price: 2300, orderDate: "2024-01-01", orders: "dasdsada" },
        { orderId: 3, orderStatus: "완료", orderType: "카드", price: 20000, orderDate: "2024-01-01", orders: "dasdsa" },
    ]);

    const handleSaleButtonOnClick = () => {
        alert("정산이 완료되었습니다!");
        navigate(-1);
    }

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                <div css={s.container}>
                    <div css={s.saleContainer}>
                        <div css={s.saleInfoTitle}>
                            <img src="https://i.namu.wiki/i/9p8OVxJTce_f2HnuZF1QOU6qMSHqXBHdkcx3q_hlGxvhcyaOXKxBVyoDkeg-Cb4Nx2p60W0AUh6RzjAH59vHwQ.svg" alt="" />
                            <p>Another Starbucks</p>
                        </div>
                        <div css={s.totalSales}>
                            <div css={s.totalPriceBox}>
                                <p>총 매출: 1,200,000원</p>
                            </div>
                            <div css={s.orderTypeBox}>
                                <p>결제 수단 별 매출</p>
                                <div css={s.priceBox}>
                                    <p>카드 결제 : 1,000,000원</p>
                                    <p>쿠폰 결제 : 1,000,000원</p>
                                </div>
                                <p>메뉴 별 매출</p>
                                <div>
                                    <p>아메리카노 1잔</p>
                                </div>
                                <p>환불 내역</p>
                                <div>
                                    <p>카드 결제 : 1,000,000원</p>
                                </div>
                            </div>
                        </div>
                        <div css={s.buttonBox}>
                            <button onClick={handleSaleButtonOnClick}>확인</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default AdminSaleDetailPage;
