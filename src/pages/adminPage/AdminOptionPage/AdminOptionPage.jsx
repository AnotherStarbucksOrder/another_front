/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "pretty-checkbox-react";
import '@djthoms/pretty-checkbox';
import { useInfiniteQuery, useMutation } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminOptionPage(props) {
    const limit = 12;
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);

    // 옵션 리스트 조회, 무한 스크롤
    const optionList = useInfiniteQuery(
        ["optionListQuery"],
        async ({ pageParam = 1 }) => await instance.get(`/admin/option?page=${pageParam}`),
        {
            getNextPageParam: (lastPage, allPage) => {
                const totalPageCount = lastPage.data.totalCount % limit === 0
                    ? lastPage.data.totalCount / limit
                    : Math.floor(lastPage.data.totalCount / limit) + 1;

                return totalPageCount !== allPage.length ? allPage.length + 1 : null;
            },
            onSuccess: response => {
                setOptions(response?.data?.pages.map(options => options.data))
            }
        }
    )

    //카테고리 상태관리
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

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <div css={s.functionBox}>
                        <div css={s.buttonBox}>
                            <button onClick={() => navigate("/admin/option/add")}>추가</button>
                        </div>
                    </div>
                    <div css={s.tableContainer}>
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
                                        optionList?.data?.pages.map(options => options?.data.map(option =>
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

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminOptionPage;