/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminSalespage(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPageCount, setTotalPageCount] = useState(1);
    const [searchStartDate, setSearchStartDate] = useState(searchParams.get("startDate") ?? "");
    const [searchEndDate, setSearchEndDate] = useState(searchParams.get("endDate") ?? "");
    const limit = 13;
    const navigate = useNavigate();
    const [dateMode, setDateMode] = useState(searchParams.get("dateMode") ?? "day");

    const salesList = useQuery(
        ["salesListQuery", searchParams.get("page"), dateMode, searchStartDate, searchEndDate], 
        async () => 
            await instance.get(`/admin/sales?page=${searchParams.get("page")}&limit=${limit}&dateMode=${dateMode}&startDate=${searchStartDate}&endDate=${searchEndDate}`) ,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response);
                setTotalPageCount(
                    response.data.totalCount % limit === 0
                        ? response.data.totalCount / limit
                        : Math.floor(response.data.totalCount / limit) + 1
                );
            }
        }
    )

    useEffect(() => {
        // 쿼리 파라미터가 변경될 때 상태 초기화
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        
        setSearchStartDate(startDate ?? "");
        setSearchEndDate(endDate ?? "");
    }, [searchParams]);

    const handleDateTypeChange = (e) => {
        setDateMode(e.target.value);
        
        setSearchStartDate("");
        setSearchEndDate("");
        navigate("/admin/sales?page=1");
    };

    const handleInputStartDate = (e) => {
        const selectedStartDate = e.target.value;
        if (selectedStartDate) {
            setSearchStartDate(selectedStartDate);
            navigate(`/admin/sales?page=1&dateMode=${dateMode}&startDate=${selectedStartDate}&endDate=${searchEndDate}`);
        }
    };
    const handleInputEndDate = (e) => {
        const selectedEndDate = e.target.value;
        if (selectedEndDate) {
            setSearchEndDate(selectedEndDate);
            navigate(`/admin/sales?page=1&dateMode=${dateMode}&startDate=${searchStartDate}&endDate=${selectedEndDate}`);
        }
    };

    const handlePageOnChange = (e) => {
        navigate(`/admin/sales?page=${e.selected + 1}&dateMode=${dateMode}&startDate=${searchStartDate}&endDate=${searchEndDate}`)
    }

    const handleDateResetClick = () => {
        setSearchStartDate("");
        setSearchEndDate("");
        navigate("/admin/sales?page=1")
    };

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>매출 관리</p>
                </div>
                <div css={s.functionBox}>
                    <div css={s.searchBox}>
                    <select onChange={handleDateTypeChange} value={dateMode}>
                            <option value="day">일별</option>
                            <option value="month" >월별</option>
                        </select>
                    </div>
                    <div css={s.buttonBox}>
                    <input
                            type={dateMode === "month" ? "month" : "date"}
                            value={searchStartDate}
                            onChange={handleInputStartDate}
                        />
                        <input
                            type={dateMode === "month" ? "month" : "date"}
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
                                <th>날짜</th>
                                <th>주문 건수</th>
                                <th>총 판매금액</th>
                                <th>환불 내역</th>
                                <th>--</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                salesList?.data?.data?.data.map(sales =>
                                    <tr key={sales.date}>
                                        <td>{sales.date.split(" ")[0]}</td>
                                        <td>{sales.totalOrderCount}</td>
                                        <td>{(sales.totalAmount.toLocaleString() || 0) + "원"}</td>
                                        <td>{sales.totalRefundCount}</td>
                                        <td><Link to={`/admin/sale/detail/${sales.date}`}>상세보기</Link></td>
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
        </>
    );
}

export default AdminSalespage;