/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminSalespage(props) {
    const [searchParams, setSearchParams] = useSearchParams();   //주소:포트/페이지URL?KEY=VALUE(쿼리스트링, 파람스)
    const [totalPageCount, setTotalPageCount] = useState(1);
    const [searchStartDate, setSearchStartDate] = useState(searchParams.get("startDate") ?? "");
    const [searchEndDate, setSearchEndDate] = useState(searchParams.get("endDate") ?? "");
    const limit = 13;
    const navigate = useNavigate();

    // const salesList = useQuery(
    //     ["salesListQuery", searchParams.get("page")],
    //     async () => await instance.get(`/admin/sales?page=${searchParams.get("page")}&limit=${limit}&startDate=${searchStartDate}&endDate=${searchEndDate}`),
    //     {
    //         retry: 0,
    //         refetchOnWindowFocus: false,
    //         onSuccess: response => {
    //             console.log(response);
    //             setTotalPageCount(
    //                 response.data.totalCount % limit === 0
    //                     ? response.data.totalCount / limit
    //                     : Math.floor(response.data.totalCount / limit) + 1
    //             );
    //         }
    //     }
    // )


    // const handlePageOnChange = (e) => {
    //     navigate(`/admin/sales?page=${e.selected + 1}&startDate=${searchStartDate}&endDate=${searchEndDate}`)
    // }

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>매출 관리</p>
                </div>
                <div css={s.functionBox}>
                    <div css={s.searchBox}>
                        <select >
                            <option value="month">월별</option>
                            <option value="day">일별</option>
                        </select>
                    </div>
                    <div css={s.buttonBox}>
                        <input type="date" />
                        <input type="date" />
                        <button>조회</button>
                    </div>
                </div>
                <div css={s.tableLatout}>
                    <table>
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>주문 건수</th>
                                <th>총 판매금액</th>
                                <th>환불 건수</th>
                                <th>환불 내역</th>
                                <th>--</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                orders.map(order =>
                                    <tr key={order.orderId}>
                                        <td>{order.orderDate}</td>
                                        <td>{order.orderId}</td>
                                        <td>{order.orderType}</td>
                                        <td>{order.orderStatus}</td>
                                        <td>{order.price}</td>
                                        <td><Link to={`/admin/sale/detail/${order.orderId}`}>상세보기</Link></td>
                                    </tr>
                                )
                            } */}
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
                        // onPageChange={handlePageOnChange}
                        forcePage={parseInt(searchParams.get("page") || 1) - 1}
                    />
                </div>
            </div>
        </>
    );
}

export default AdminSalespage;