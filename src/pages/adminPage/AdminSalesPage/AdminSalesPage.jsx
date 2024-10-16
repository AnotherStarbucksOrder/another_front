/** @jsxImportSource @emotion/react */
import * as s from "./style";
import AdminPageSideBar from "../../../components/AdminPageSideBar/AdminPageSideBar";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import ReactPaginate from "react-paginate";

function AdminSalespage(props) {
    const [searchParams, setSearchParams] = useSearchParams();   //주소:포트/페이지URL?KEY=VALUE(쿼리스트링, 파람스)
    const [totalPageCount, setTotalPageCount] = useState(1);
    const limit = 12;
    const [searchOption, setSearchOption] = useState(searchParams.get("option") ?? "month");

    const [orders ] = useState([
        { orderId: 1, orderStatus: "완료", orderType: "카트", price: 1000, orderDate: "2024-01-01", orders: "sadsadsa" },
        { orderId: 2, orderStatus: "취소", orderType: "포인트", price: 2300, orderDate: "2024-01-01", orders: "dasdsada" },
        { orderId: 3, orderStatus: "완료", orderType: "카드", price: 20000, orderDate: "2024-01-01", orders: "dasdsa" },
    ]);
    const handleSearchOptionOnChange = (e) => {
        setSearchOption(e.target.value);
    }

    return (
        <>
            <AdminPageSideBar />
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>매출 관리</p>
                </div>
                <div css={s.functionBox}>
                    <div css={s.searchBox}>
                        <select onChange={handleSearchOptionOnChange} value={searchOption}>
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
                            {
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
                    // onPageChange={handlePageOnChange}
                    // forcePage={parseInt(searchParams.get("page")) - 1} 
                    />
                </div>
            </div>
        </>
    );
}

export default AdminSalespage;