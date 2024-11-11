/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminUserPage(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPageCount, setTotalPageCount] = useState(1);
    const [ checkedAll, setCheckedAll ] = useState(false);
    const [ users, setUsers ] = useState([]);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState(searchParams.get("searchName") ?? "");
    const limit = 13;

    // 회원 리스트 수정, 페이지네이션
    const userList = useQuery(
        ["userListQuery", searchParams.get("page"), searchParams.get("search")],
        async () => await instance.get(`/admin/user?page=${searchParams.get("page")}&limit=${limit}&searchName=${searchValue}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setUsers(response?.data.data);
                setTotalPageCount(
                    response.data.totalCount % limit === 0
                    ? response.data.totalCount / limit
                    : Math.floor(response.data.totalCount / limit) + 1
                );
            }
        }
    )

    // 회원 삭제
    const deleteUserMutation = useMutation(
        async (userIds) =>{ 
            for( const userId of userIds){
                await instance.delete(`/admin/user?ids=${userId}`)
            }
        },
        {
            onSuccess: () => {
                alert("삭제하였습니다");
                userList.refetch();
            }
        }
    )

    useEffect(() => {
        setSearchValue("");
        userList.refetch();
    }, [searchParams]);

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handlePageOnChange = (e) => {
        navigate(`/admin/user?page=${e.selected + 1}&searchName=${searchValue}`);
    }

    // 체크박스 상태 관리 
    useEffect(() => {
        const allChecked = users.every(user => user.isChecked);
        setCheckedAll(allChecked);
    }, [users]);

    const handleUserChecked = (userId) => {
        setUsers(users =>
            users.map(user =>
                user.userId === userId ? { ...user, isChecked: !user.isChecked } : user
            )
        );
    }

    // 체크박스 전체 선택 
    const handleCheckedAllChange = () => {
        const newCheckedState = !checkedAll;
        setUsers(users.map(user => ({ ...user, isChecked: newCheckedState })));
        setCheckedAll(newCheckedState);
    };

    const handleDeleteUserOnClick = () => {
        const userIds = users.filter(user => user.isChecked).map(user => user.userId);

        if(window.confirm("삭제하시겠습니까?")) {
            deleteUserMutation.mutateAsync(userIds);
        };
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearchButtonClick();
        }
    }

    const handleSearchButtonClick = () => {
        navigate(`/admin/user?page=1&searchName=${searchValue}`);
        userList.refetch();
    }

    const handleUserAddOnClick = () => {
        navigate("/admin/user/add");
    }

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <div css={s.functionBox}>
                        <div css={s.searchBox}>
                            <input type="text" placeholder="전화번호" 
                                onChange={handleSearchInputChange} 
                                onKeyDown={handleKeyDown}
                                value={searchValue}/>
                            <button onClick={handleSearchButtonClick}>🔍</button>
                        </div>
                        <div css={s.buttonBox}>
                            <button onClick={handleUserAddOnClick}>등록</button>
                            <div />
                            <button onClick={handleDeleteUserOnClick}>삭제</button>
                        </div> 
                    </div>
                    <div css={s.tableLatout}>
                        <table>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" onChange={handleCheckedAllChange} checked={checkedAll}/></th>
                                    <th>번호</th>
                                    <th>전화번호</th>
                                    <th>포인트</th>
                                    <th>메모</th>
                                    <th>--</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user => 
                                        <tr key={user.userId}>
                                            <td>
                                                <input 
                                                    type="checkbox" 
                                                    onChange={() => handleUserChecked(user.userId)} 
                                                    checked={user.isChecked} value={user.userId}
                                                />
                                            </td>
                                            <td>{user.userId}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.starCount}</td>
                                            <td>{user.memo}</td>
                                            <td><Link to={`/admin/user/detail/${user.userId}`}>상세보기</Link></td>
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

export default AdminUserPage;