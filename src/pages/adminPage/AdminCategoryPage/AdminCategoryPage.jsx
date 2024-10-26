/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "pretty-checkbox-react";
import '@djthoms/pretty-checkbox';
import { useInfiniteQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminCategoryPage(props) {
    const limit = 10;
    const loadMoreRef = useRef(null);
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
    


    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>카테고리 관리( table 수정 예정 )</p>
                </div>
                <div css={s.functionBox}>
                    <div css={s.buttonBox}>
                        <button>추가</button>
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
                                    categoryList?.data?.pages.map(categories => categories.data.map(category =>
                                        <tr key={category.categoryId}>
                                            <td>{category.categoryId}</td>
                                            <td>{category.categoryName}</td>
                                            <td><Switch></Switch></td>
                                            <td><button css={s.tableButton} onClick={() => navigate(`/admin/category/update/${category.categoryId}`)}>수정</button></td>
                                            <td><button css={s.tableButton}>삭제</button></td>
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