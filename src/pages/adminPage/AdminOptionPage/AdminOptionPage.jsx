/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Switch } from "pretty-checkbox-react";
import '@djthoms/pretty-checkbox';
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import ReactPaginate from "react-paginate";

function AdminOptionPage(props) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPageCount, setTotalPageCount] = useState(1);
    const limit = 13;
    const [options, setOptions] = useState([]);

    // 옵션 리스트 조회
    const optionList = useQuery(
        ["optionListQuery", searchParams.get("page")],
        async () => await instance.get(`/admin/option?page=${searchParams.get("page")}&limit=${limit}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setOptions(response?.data?.data);
                setTotalPageCount(
                    response.data.totalCount % limit === 0
                    ? response.data.totalCount / limit
                    : Math.floor(response.data.totalCount / limit) + 1
                );
            }
        }
    )

    //옵션 상태관리
    const optionStatusUpdateMutation = useMutation(
        async (optionId) => await instance.patch(`/admin/option/status/${optionId}`),
        {
            onSuccess: () => {
                optionList.refetch();
            }
        }
    )
    
    const handleOptionStatusChekcked = (optionId) => {
        setOptions(options =>
            options?.data.map(option =>
                option.optionId === optionId
                    ? { ...option, optionStatus:  1 ? 0 : 1 }
                    : option
            )
        );
        optionStatusUpdateMutation.mutateAsync(optionId);
    };

    // 옵션 삭제
    const optionDeleteMutation = useMutation(
        async (optionId) => await instance.delete(`/admin/option/${optionId}`),
        {
            onSuccess: () => {
                alert("삭제하였습니다.");
                optionList.refetch();
            }
        }
    )

    const handleOptionDeleteOnClick = (optionId) => {
        if(window.confirm("삭제하시겠습니까?")) {
            optionDeleteMutation.mutateAsync(optionId);
        }
    }
    
    // 페이지 이동
    const handlePageOnChange = (e) => {
        navigate(`/admin/option?page=${e.selected + 1}`);
    }

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                <div css={s.functionBox}>
                    <div css={s.buttonBox}>
                        <button onClick={() => navigate("/admin/option/add")}>추가</button>
                    </div>
                </div>
                    <div css={s.tableLayout}>
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
                                    optionList?.data?.data.map(option =>
                                        <tr key={option.optionId}>
                                            <td>{option.optionId}</td>
                                            <td>{option.optionName}</td>
                                            <td>
                                                <Switch value={option.optionStatus} 
                                                    checked={option.optionStatus === 1} 
                                                    onChange={() => handleOptionStatusChekcked(option.optionId)} />
                                            </td>
                                            <td>
                                                <button css={s.tableButton} 
                                                    onClick={() => navigate(`/admin/option/update/${option.optionId}`)}>
                                                    수정
                                                </button>
                                            </td>
                                            <td><button css={s.tableButton} 
                                                onClick={() => handleOptionDeleteOnClick(option.optionId)}>
                                                삭제
                                                </button>
                                            </td>
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

export default AdminOptionPage;