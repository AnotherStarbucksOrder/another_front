/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Switch } from "pretty-checkbox-react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import '@djthoms/pretty-checkbox';
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import ReactPaginate from "react-paginate";

function AdminCategoryPage(props) {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPageCount, setTotalPageCount] = useState(1);
    const limit = 13;
    const [categories, setCategories] = useState([]);

    // 카테고리 리스트 조회
    const categoryList = useQuery(
        ["categoryListQuery", searchParams.get("page")],
        async () => await instance.get(`/admin/category?page=${searchParams.get("page")}&limit=${limit}`),
        {
            retry:0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setCategories(response?.data?.data);
                setTotalPageCount(
                    response.data.totalCount % limit === 0
                    ? response.data.totalCount / limit
                    : Math.floor(response.data.totalCount / limit) + 1
                );
            }
        }
    )

    //카테고리 상태관리
    const categoryStatusUpdateMutation = useMutation(
        async (categoryId) => await instance.patch(`/admin/category/status/${categoryId}`),
        {
            onSuccess: () => {
                categoryList.refetch();
            }
        }
    )

    const handleCategoryStatusChekcked = (categoryId) => {
        setCategories(categories =>
            categories?.data.map(category =>
                category.categoryId === categoryId
                    ? { ...category, categoryStatus: 1 ? 0 : 1 }
                    : category
            )
        );
        categoryStatusUpdateMutation.mutateAsync(categoryId).catch(() => { });
    };

    // 카테고리 삭제
    const handleCategoryDeleteMutation = useMutation(
        async (categoryId) => await instance.delete(`/admin/category/${categoryId}`),
        {
            onSuccess: () => {
                alert("삭제되었습니다.")
                categoryList.refetch();
            }
        }
    )

    const handleCategoryDeleteOnClick = (categoryId) => {
        if (window.confirm("삭제하시겠습니까?")) {
            handleCategoryDeleteMutation.mutateAsync(categoryId);
        }
    }

    // 페이지 이동
    const handlePageOnChange = (e) => {
        navigate(`/admin/category?page=${e.selected + 1}`);
    }

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <div css={s.functionBox}>
                        <div css={s.buttonBox}>
                            <button onClick={() => navigate("/admin/category/add")}>추가</button>
                        </div>
                    </div>
                        <div css={s.tableLatout}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>코드</th>
                                        <th>카테고리 명</th>
                                        <th>노출 여부</th>
                                        <th>수정</th>
                                        <th>삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categoryList?.data?.data?.data.map(category =>
                                            <tr key={category.categoryId}>
                                                <td>{category.categoryId}</td>
                                                <td>{category.categoryName}</td>
                                                <td>
                                                    <Switch
                                                        value={category.categoryStatus}
                                                        checked={category.categoryStatus === 1}
                                                        onChange={() => handleCategoryStatusChekcked(category.categoryId)}
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        css={s.tableButton}
                                                        onClick={() => navigate(`/admin/category/update/${category.categoryId}`)}>
                                                        수정
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        css={s.tableButton}
                                                        onClick={() => handleCategoryDeleteOnClick(category.categoryId)}>
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

export default AdminCategoryPage;