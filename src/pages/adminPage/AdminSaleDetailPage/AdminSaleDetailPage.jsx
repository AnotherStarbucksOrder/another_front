/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams 임포트
import * as s from "./style";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminSaleDetailPage(props) {
    const { date } = useParams();

    const salesInfo = useQuery(
        ["salesInfoQuery"],
        async () => await instance.get(`/admin/sales/${date}`),
        {
            onSuccess: response => {
                console.log(response);
            }
        }
    )

    const handleBackOnClick = () => {
        window.history.back();
    };


    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>매출 관리( 수정 해야겠다 )</p>
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
                            <p>결제 수단 별 매출</p>
                            <div css={s.priceBox}>
                                <div>카드 결제 : </div>
                                <div>1,000,000원</div>
                            </div>
                            <p>메뉴 별 매출</p>
                            <div>
                                <div>카드 결제 : </div>
                                <div>1,000,000원</div>
                            </div>
                            <p>환불 내역</p>
                            <div>
                                <div>카드 결제 : </div>
                                <div>1,000,000원</div>
                            </div>
                        </div>
                        <div css={s.buttonBox}>
                            <button onClick={handleBackOnClick}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSaleDetailPage;
