/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminOrderpage(props) {
    const [searchParams, setSearchParams] = useSearchParams();   //주소:포트/페이지URL?KEY=VALUE(쿼리스트링, 파람스)
    const [totalPageCount, setTotalPageCount] = useState(1);
    const navigate = useNavigate();
    const limit = 13;
    const [searchStartDate, setSearchStartDate] = useState(searchParams.get("startDate") ?? "");
    const [searchEndDate, setSearchEndDate] = useState(searchParams.get("endDate") ?? "");
    const [orders, setOrders] = useState([]);
    const [dateType, setDateType] = useState("day");

    const orderList = useQuery(
        ["orderListQuery", searchParams.get("page"), searchStartDate, searchEndDate],
        async () => await instance.get(`/admin/order?page=${searchParams.get("page")}&limit=${limit}&startDate=${searchStartDate}&endDate=${searchEndDate}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response.data);
                setOrders(response?.data.data)
                setTotalPageCount(
                    response.data.totalCount % limit === 0
                        ? response.data.totalCount / limit
                        : Math.floor(response.data.totalCount / limit) + 1
                );
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
            case 3: return '환불';
            default: return '알 수 없음';
        }
    };

    const handleDateTypeChange = (e) => {
        setDateType(e.target.value);
        // 날짜 타입 변경 시 초기화
        setSearchStartDate("");
        setSearchEndDate("");
        navigate("/admin/order?page=1")

    };

    const handleInputStartDate = (e) => {
        setSearchStartDate(e.target.value);
    } 

    const handleInputEndDate = (e) => {
        setSearchEndDate(e.target.value);
    } 

    const handlePageOnChange = (e) => {
        navigate(`/admin/order?page=${e.selected + 1}&startDate=${searchStartDate}&endDate=${searchEndDate}`)
    }
    const handleDateResetClick = () => {
        setSearchStartDate("");
        setSearchEndDate("");
        navigate("/admin/order?page=1")
    };

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>주문 관리</p>
                </div>
                <div css={s.functionBox}>
                    <div css={s.searchBox}>
                        <select onChange={handleDateTypeChange} value={dateType}>
                            <option value="day">일별</option>
                            <option value="month" >월별</option>
                        </select>
                    </div>
                    <div css={s.buttonBox}>
                    <input
                            type={dateType === "month" ? "month" : "date"}
                            value={searchStartDate}
                            onChange={handleInputStartDate}
                        />
                        <input
                            type={dateType === "month" ? "month" : "date"}
                            value={searchEndDate}
                            onChange={handleInputEndDate}
                        />
                        <button onClick={handleDateResetClick}>지우기</button>
                    </div>
                </div>
                <div css={s.tableLatout}>
                    <table>
                        <thead>
                            <tr>
                                <th>주문 날짜</th>
                                <th>주문 번호</th>
                                <th>주문 방식</th>
                                <th>결제 방식</th>
                                <th>주문 상태</th>
                                <th>결제 금액</th>
                                <th>--</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order =>
                                    <tr key={order.orderId}>
                                        <td>{(order.createDate).split("T")[0]}</td>
                                        <td>{order.orderId}</td>
                                        <td>{getOrderType(order.orderType)}</td>
                                        <td>{getPaymentType(order.paymentType)}</td>
                                        <td>{getOrderState(order.orderState)}</td>
                                        <td>{(order.orderAmount).toLocaleString() + "원"}</td>
                                        <td><Link to={`/admin/order/detail/${order.orderId}`}>상세보기</Link></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div css={s.paginateContainer}>
                    <ReactPaginate
                        breakLabel="..."
                        previousLabel={<><IoMdArrowDropleft /></>}
                        nextLabel={<><IoMdArrowDropright /></>}
                        pageCount={totalPageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        activeClassName='active'
                        onPageChange={handlePageOnChange}
                        forcePage={parseInt(searchParams.get("page") || 1) - 1}
                    />
                </div>
            </div>
        </>
    );
}

export default AdminOrderpage;