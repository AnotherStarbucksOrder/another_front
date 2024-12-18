/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import { useSearchParams } from "react-router-dom";

function AdminSaleDetailPage(props) {
    const [ searchParams ] = useSearchParams();
    const date = searchParams.get("date");

    const salesInfo = useQuery(
        ["salesInfoQuery"],
        async () => await instance.get(`/admin/sale?date=${date}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response.data);
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
                            {
                                salesInfo.isLoading ? <></> :
                                <div css={s.totalSales}>
                                    <div css={s.totalPriceBox}>
                                        <p>총 매출: {(salesInfo?.data?.data?.totalAmount).toLocaleString()} 원</p>
                                    </div>
                                    <div css={s.orderTypeBox}>
                                        <p>결제 수단 별 매출</p>
                                        <div css={s.priceBox}>
                                            <p>카드 결제 : {(salesInfo?.data?.data?.cardTotalAmount).toLocaleString()} 원</p>
                                            <p>복합 결제 : {(salesInfo?.data?.data?.complexTotalAmount).toLocaleString()} 원</p>
                                        </div>
                                        <p>메뉴 별 매출</p>
                                        {
                                            salesInfo?.data?.data?.menus.map(menu => 
                                                <div css={s.menus} key={menu.menuName}>
                                                    <p>{menu.menuName}</p>
                                                    <p>{menu.totalQuantity} 개</p>
                                                </div>
                                            ) 
                                        }
                                        <p>환불 금액</p>
                                        <div>
                                            <p>카드 결제 : {(salesInfo?.data?.data?.refundTotalAmount).toLocaleString()} 원</p>
                                        </div>
                                    </div>
                                </div>
                            }
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
