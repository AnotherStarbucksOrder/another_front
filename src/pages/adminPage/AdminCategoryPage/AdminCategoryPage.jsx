/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "pretty-checkbox-react";
import '@djthoms/pretty-checkbox';
import { useInfiniteQuery, useMutation } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminCategoryPage(props) {
    const limit = 10;
    const loadMoreRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const categoryList = useInfiniteQuery(
        ["categoryListQuery"],
        async ({ pageParam = 1}) => await instance.get(`/admin/category?page=${pageParam}`),
        {
            getNextPageParam: ( lastPage, allPage ) => {
                const totalPageCount = lastPage.data.totalCount % limit === 0
                ? lastPage.data.totalCount / limit
                : Math.floor(lastPage.data.totalCount/ limit) + 1;

                return totalPageCount !== allPage.length ? allPage.length + 1 : null;
            },
            onSuccess: response => {
                setCategories(response?.data?.pages.map(categories => categories.data))
            }
        }
    )
    console.log(categoryList)

    useEffect(() => {
        if (loadMoreRef.current) {  // loadMoreRef.current가 존재할 때만 observer 연결
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    categoryList.fetchNextPage();
                }
            }, { threshold: 1.0 });
    
            observer.observe(loadMoreRef.current);
    
            return () => observer.disconnect();  // 컴포넌트 언마운트 시 observer 해제
        }
    }, [categoryList.hasNextPage]);
    
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
                    ? { ...category, categoryStatus:  1 ? 0 : 1 }
                    : category
            )
        );
        categoryStatusUpdateMutation.mutateAsync(categoryId);
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
        if(window.confirm("삭제하시겠습니까?")) {
            handleCategoryDeleteMutation.mutateAsync(categoryId);
        }
    }


    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>카테고리 관리</p>
                </div>
                <div css={s.functionBox}>
                    <div css={s.buttonBox}>
                        <button onClick={() => navigate("/admin/category/add")}>추가</button>
                        <div />
                        <button>순서 편집</button>
                    </div>
                </div>
                <div css={s.tableContainer}>
                    <div css={s.tableLayout}>
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
                                    categoryList?.data?.pages.map(categories => categories?.data.map(category =>
                                        <tr key={category.categoryId}>
                                            <td>{category.categoryId}</td>
                                            <td>{category.categoryName}</td>
                                            <td><Switch value={category.categoryStatus} checked={category.categoryStatus === 1} onChange={() => handleCategoryStatusChekcked(category.categoryId)} /></td>
                                            <td><button css={s.tableButton}  onClick={() => navigate(`/admin/category/update/${category.categoryId}`)}>수정</button></td>
                                            <td><button css={s.tableButton}  onClick={() => handleCategoryDeleteOnClick(category.categoryId)} >삭제</button></td>
                                        </tr>
                                    )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminCategoryPage;