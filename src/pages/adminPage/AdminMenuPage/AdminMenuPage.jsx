/** @jsxImportSource @emotion/react */
import * as s from "./style";
import AdminPageSideBar from "../../../components/AdminPageSideBar/AdminPageSideBar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import ReactPaginate from "react-paginate";

function AdminMenuPage(props) {
    const [ checkedAll, setCheckedAll ] = useState(false);
    const navigate = useNavigate();
    const limit = 12;
    const [menus, setMenus] = useState([
        { menuId:1, menuName: "불고기 비빔밥", price: 8000, category: "한식", option: "계란 추가" },
        { menuId:2, menuName: "치킨 너겟", price: 6000, category: "패스트푸드", option: "소스 선택" },
        { menuId:3, menuName: "카페라떼", price: 4500, category: "음료", option: "샷 추가" },
    ]);


    // useEffect(() => {
    //     const checkStates = menus.map(menu => menu.isChecked);
    //     if(checkStates.includes(false)) {
    //         setCheckedAll(false);
    //     }
    // },[menus])

    // const handleCheckedChange = (e) => {
    //     setMenus(menus => [...menus.map(menu => {
    //         if(menu.menuId === parseInt(e.target.value)){
    //             return {
    //                 ...menu,
    //                 isChecked: !menu.isChecked
    //             }
    //         }
    //         return menu;
    //     })])
    // }

    // const handleCheckedAllChange = (e) => {
    //     setCheckedAll(checked => {
    //         if(!checked) {
    //             setMenus([...menus.map(menu => ({...menu, isChecked: true}))]);
    //         } else {
    //             resetViewMenus();
    //         }
    //         return !checked
    //     })
    // }

    // const resetViewMenus = () => {
    //     setMenus([...menus.map(menu => ({...menu, isChecked: false}))])
    // }
    useEffect(() => {
        const allChecked = menus.every(menu => menu.isChecked);
        setCheckedAll(allChecked);
    }, [menus]);

    const toggleMenuChecked = (menuId) => {
        setMenus(menus =>
            menus.map(menu =>
                menu.menuId === menuId ? { ...menu, isChecked: !menu.isChecked } : menu
            )
        );
    };

    const handleCheckedAllChange = () => {
        const newCheckedState = !checkedAll;
        setMenus(menus.map(menu => ({ ...menu, isChecked: newCheckedState })));
        setCheckedAll(newCheckedState);
    };

    const handleMenuAddOnClick = () => {
        navigate("/admin/menu/add")
    }

    return (
        <>
            <AdminPageSideBar />    
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>메뉴 관리</p>
                </div>
                <div css={s.functionBox}>
                    <div css={s.searchBox}>
                        <input type="text" placeholder="카테고리명, 상품명"/>
                        <button>🔍</button>
                    </div>
                    <div css={s.buttonBox}>
                        <button onClick={handleMenuAddOnClick}>등록</button>
                        <div />
                        <button>삭제</button>
                    </div>
                </div>
                <div css={s.tableLatout}>
                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" onChange={handleCheckedAllChange} checked={checkedAll} /></th>
                                <th>상품명</th>
                                <th>가격</th>
                                <th>카테고리</th>
                                <th>옵션</th>
                                <th>--</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menus.map(menu => 
                                    <tr key={menu.menuId}>
                                        <td><input type="checkbox" onChange={() => toggleMenuChecked(menu.menuId)} checked={menu.isChecked} value={menu.menuId} /></td>
                                        <td>{menu.menuName}</td>
                                        <td>{menu.price}</td>
                                        <td>{menu.category}</td>
                                        <td>{menu.option}</td>
                                        <td><Link to={`/admin/menu/detail/${menu.menuId}`}>상세보기</Link></td>
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
                        // pageCount={totalPageCount}  // 총 페이지 수
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        activeClassName='active'
                        // onPageChange={handlePageOnChange}
                        // forcePage={parseInt(searchParams.get("page")) - 1 || 0}  // 페이지가 없으면 0으로 설정
                    />
            </div>
            </div>
        </>
    );
}

export default AdminMenuPage;