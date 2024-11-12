/** @jsxImportSource @emotion/react */
import { useParams } from "react-router-dom"; // useParams 임포트
import * as s from "./style";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminSaleDetailPage(props) {
    const { date } = useParams();

    const salesInfo = useQuery(
        ["salesInfoQuery"],
        async () => await instance.get(`/admin/sale?date=${date}`),
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
                                        <p>아메리카노 1잔</p>
                                        <p>아메리카노 1잔</p>
                                        <p>아메리카노 1잔</p>
                                        <p>아메리카노 1잔</p>
                                        <p>아메리카노 1잔</p>
                                        <p>아메리카노 1잔</p>
                                        <p>아메리카노 1잔</p>
                                        <p>아메리카노 1잔</p>
                                        <p>아메리카노 1잔</p>
                                        <p>아메리카노 1잔</p>
                                        <p>아메리카노 1잔</p>
                                        <p>아메리카노 1잔</p>
                                        <p>아메리카노 1잔</p>
                                        <p>아메리카노 1잔</p>
                                    </div>
                                    <p>환불 금액</p>
                                    <div>
                                        <p>카드 결제 : 1,000,000원</p>
                                    </div>
                                </div>
                            </div>
                            <div css={s.buttonBox}>
                                <button onClick={handleBackOnClick}>확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSaleDetailPage;
