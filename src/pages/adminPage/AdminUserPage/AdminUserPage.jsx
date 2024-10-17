/** @jsxImportSource @emotion/react */
import * as s from "./style";
import AdminPageSideBar from "../../../components/AdminPageSideBar/AdminPageSideBar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import ReactPaginate from "react-paginate";

function AdminUserPage(props) {
    const [totalPageCount, setTotalPageCount] = useState(1);
    const limit = 12;
    const [ checkedAll, setCheckedAll ] = useState(false);
    const navigate = useNavigate();

    const [users, setUsers] = useState([
        { userId:1, phoneNum: "010-1111-1111", name: "김하나", point: 10, registerDate:"2024-01-01", memo: "sadsadsa" },
        { userId:2, phoneNum: "010-2222-2222", name: "김둘", point: 0, registerDate:"2024-01-01", memo: "dasdsada" },
        { userId:3, phoneNum: "010-3333-3333", name: "김셋", point: 20, registerDate:"2024-01-01", memo: "dasdsa" },
    ]);

    useEffect(() => {
        const checkStates = users.map(user => user.isChecked);
        if(checkStates.includes(false)) {
            setCheckedAll(false);
        }
    },[users])

    const handleCheckedChange = (e) => {
        setUsers(users => [...users.map(user => {
            if(user.userId === parseInt(e.target.value)){
                return {
                    ...user,
                    isChecked: !user.isChecked
                }
            }
            return user;
        })])
    }

    const handleCheckedAllChange = (e) => {
        setCheckedAll(checked => {
            if(!checked) {
                setUsers([...users.map(user => ({...user, isChecked: true}))]);
            } else {
                resetViewUsers();
            }
            return !checked
        })
    }

    const resetViewUsers = () => {
        setUsers([...users.map(user => ({...user, isChecked: false}))])
    }

    const handleUserAddOnClick = () => {
        navigate("/admin/user/add")
    }

    return (
        <>
            <AdminPageSideBar />    
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>회원 관리</p>
                </div>
                <div css={s.functionBox}>
                    <div css={s.searchBox}>
                        <input type="text" placeholder="전화번호, 이름, 고유번호"/>
                        <button>🔍</button>
                    </div>
                    <div css={s.buttonBox}>
                        <button onClick={handleUserAddOnClick}>등록</button>
                        <div />
                        <button>삭제</button>
                    </div>
                </div>
                <div css={s.tableLatout}>
                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" onChange={handleCheckedAllChange} checked={checkedAll}/></th>
                                <th>이름</th>
                                <th>전화번호</th>
                                <th>포인트</th>
                                <th>가입일</th>
                                <th>메모</th>
                                <th>--</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => 
                                    <tr key={user.userId}>
                                        <td><input type="checkbox" onChange={handleCheckedChange} checked={user.isChecked} value={user.userId}/></td>
                                        <td>{user.name}</td>
                                        <td>{user.phoneNum}</td>
                                        <td>{user.point}</td>
                                        <td>{user.registerDate}</td>
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

export default AdminUserPage;