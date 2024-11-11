/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminOrderpage(props) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPageCount, setTotalPageCount] = useState(1);
    const limit = 13;
    const [dateType, setDateType] = useState("day");
    const [searchStartDate, setSearchStartDate] = useState(searchParams.get("startDate") ?? "");
    const [searchEndDate, setSearchEndDate] = useState(searchParams.get("endDate") ?? "");
    const [orders, setOrders] = useState([]);

    // 주문 리스트 조회, 페이지네이션
    const orderList = useQuery(
        ["orderListQuery", searchParams.get("page"), searchStartDate, searchEndDate],
        async () => await instance.get(`/admin/order?page=${searchParams.get("page")}&limit=${limit}&startDate=${searchStartDate}&endDate=${searchEndDate}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
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
            default: return '알 수 없음';
        }
    };

    useEffect(() => {
        // 쿼리 파라미터가 변경될 때 상태 초기화
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        
        setSearchStartDate(startDate ?? "");
        setSearchEndDate(endDate ?? "");
    }, [searchParams]);

    const handleDateTypeChange = (e) => {
        setDateType(e.target.value);
        // 날짜 타입 변경 시 초기화
        setSearchStartDate("");
        setSearchEndDate("");
        navigate("/admin/order?page=1")
    };

    const handleInputStartDate = (e) => {
        const selectedStartDate = e.target.value;
        if (selectedStartDate) {
            setSearchStartDate(selectedStartDate);
            navigate(`/admin/order?page=1&startDate=${selectedStartDate}&endDate=${searchEndDate}`);
        }
    };
    
    const handleInputEndDate = (e) => {
        const selectedEndDate = e.target.value;
        if (selectedEndDate) {
            setSearchEndDate(selectedEndDate);
            navigate(`/admin/order?page=1&startDate=${searchStartDate}&endDate=${selectedEndDate}`);
        }
    };

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
                                            <td>{order.createDate.split("T")[0]}</td>
                                            <td>{order.orderId}</td>
                                            <td>{getOrderType(order.orderType)}</td>
                                            <td>{getPaymentType(order.paymentType)}</td>
                                            <td>{getOrderState(order.orderState)}</td>
                                            <td>{(order.orderAmount.toLocaleString() || 0) + "원"}</td>
                                            <td><Link to={`/admin/order/detail/${order.orderId}`}>상세보기</Link></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div css={s.paginateContainer}>
                        <ReactPaginate
                            breakLabel=""
                            previousLabel={<><IoMdArrowDropleft /></>}
                            nextLabel={<><IoMdArrowDropright /></>}
                            pageCount={totalPageCount}
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={5}
                            activeClassName='active'
                            onPageChange={handlePageOnChange}
                            forcePage={parseInt(searchParams.get("page") || 1) - 1}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminOrderpage;