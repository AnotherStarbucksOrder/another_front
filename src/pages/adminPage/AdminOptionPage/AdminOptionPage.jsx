/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { Switch } from "pretty-checkbox-react";
import '@djthoms/pretty-checkbox';

function AdminOptionPage(props) {
    const [searchParams, setSearchParams] = useSearchParams();   //주소:포트/페이지URL?KEY=VALUE(쿼리스트링, 파람스)
    const [totalPageCount, setTotalPageCount] = useState(1);
    const limit = 12;
    const navigate = useNavigate();

    const [orders ] = useState([
        { orderId: 1, orderStatus: "완료", orderType: "카트", price: 1000, orderDate: "2024-01-01", orders: "sadsadsa" },
        { orderId: 2, orderStatus: "취소", orderType: "포인트", price: 2300, orderDate: "2024-01-01", orders: "dasdsada" },
        { orderId: 3, orderStatus: "완료", orderType: "카드", price: 20000, orderDate: "2024-01-01", orders: "dasdsa" },
    ]);
 

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>옵션 관리</p>
                </div>
                <div css={s.functionBox}>
                    <div css={s.buttonBox}>
                        <button onClick={() => navigate("/admin/option/add")}>추가</button>
                        <div />
                        <button>순서 편집</button>
                    </div>
                </div>
                <div css={s.tableLatout}>
                    <table>
                        <thead>
                            <tr>
                                <th>코드</th>
                                <th>옵션 명</th>
                                <th>노출 여부</th>
                                <th>수정</th>
                                <th>삭제</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order =>
                                    <tr key={order.orderId}>
                                        <td>{order.orderDate}</td>
                                        <td>{order.orderId}</td>
                                        <td><Switch></Switch></td>
                                        <td><button css={s.tableButton} onClick={() => navigate(`/admin/option/update/${order.orderId}`)}>수정</button></td>
                                        <td><button css={s.tableButton}>삭제</button></td>
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

export default AdminOptionPage;