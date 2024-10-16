/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useParams } from "react-router-dom"; // useParams 임포트
import AdminPageSideBar from "../../../components/AdminPageSideBar/AdminPageSideBar";
import * as s from "./style";

function AdminSaleDetailPage(props) {
    const { orderId } = useParams(); // URL에서 menuId 가져오기

    const [orders, setOrders] = useState([
        { orderId: 1, orderStatus: "완료", orderType: "카드", price: 1000, orderDate: "2024-01-01", orders: "sadsadsa" },
        { orderId: 2, orderStatus: "취소", orderType: "포인트", price: 2300, orderDate: "2024-01-01", orders: "dasdsada" },
        { orderId: 3, orderStatus: "완료", orderType: "카드", price: 20000, orderDate: "2024-01-01", orders: "dasdsa" },
    ]);

    

    return (
        <>
            <AdminPageSideBar />
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>매출 관리( 수정 할 걸? )</p>
                </div>
                <div css={s.container}>
                    <div css={s.saleContainer}>
                        <div css={s.saleInfoTitle}>
                            <p>Another Starbucks</p>
                        </div>
                        <div css={s.totalPriceBox}>
                            <p>총 매출: 1,200,000원</p>
                        </div>
                        <div css={s.orderTypeBox}>
                            <div css={s.typeTitle}>
                                <p>결제 수단 별 매출</p>
                            </div>
                            <div css={s.priceBox}>
                                <div>카드 결제 : </div>
                                <div>1,000,000원</div>
                            </div>
                            <div css={s.typeTitle}>
                                <p>메뉴 별 매출</p>
                            </div>
                            <div css={s.priceBox}>
                                <div>카드 결제 : </div>
                                <div>1,000,000원</div>
                            </div>
                            <div css={s.typeTitle}>
                                <p>환불 내역</p>
                            </div>
                            <div css={s.priceBox}>
                                <div>카드 결제 : </div>
                                <div>1,000,000원</div>
                            </div>
                        </div>
                        <div css={s.buttonBox}>
                            <button>정산</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSaleDetailPage;
