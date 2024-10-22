/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminMenuPage(props) {
    const [searchParams, setSearchParams] = useSearchParams();   //주소:포트/페이지URL?KEY=VALUE(쿼리스트링, 파람스)
    const [checkedAll, setCheckedAll] = useState(false);
    const [totalPageCount, setTotalPageCount] = useState(1);
    const [menus, setMenus] = useState([]);
    const navigate = useNavigate();
    const [ searchValue, setSearchValue ] = useState(searchParams.get("search") ?? ""); 
    const limit = 13;
    

    const menuList = useQuery(
        ["menuListQuery", searchParams.get("page"), searchParams.get("search")],
        async () => await instance.get(`/admin/menus?page=${searchParams.get("page")}&limit=${limit}&search=${searchValue}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response)
                setMenus(response?.data?.data);
                setTotalPageCount(
                    response?.data.totalCount % limit === 0
                    ? response?.data.totalCount / limit
                    : Math.floor(response?.data.totalCount / limit) + 1)
                    }
        }
    )
    console.log(menuList);
    
    const deleteMenuMutation = useMutation(
        async (menuIds) => await instance.delete(`/admin/menu`, { data: { ids: menuIds } }),
        {
            onSuccess: () => {
                alert("메뉴를 삭제하였습니다.");
                menuList.refetch();
            }
        }
    );
    const handleSearchInputOnChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handlePageOnChange = (e) => {
        navigate(`/admin/menus?page=${e.selected + 1}&search=${searchValue}`);
    }

    // 체크박스 상태 관리 
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
        console.log(menuId)
    };

    const handleCheckedAllChange = () => {
        const newCheckedState = !checkedAll;
        setMenus(menus.map(menu => ({ ...menu, isChecked: newCheckedState })));
        setCheckedAll(newCheckedState);
    };

    const handleDeleteMenuOnClick = () => {
        const selectedMenuIds = menus.filter(menu => menu.isChecked).map(menu => menu.menuId);

        if (selectedMenuIds.length === 0) {
            alert("삭제할 메뉴를 선택하세요.");
            return;
        }

        if (window.confirm("선택한 메뉴를 삭제하시겠습니까?")) {
            deleteMenuMutation.mutateAsync(selectedMenuIds);
        }
    };

    const handleMenuAddOnClick = () => {
        navigate("/admin/menu/add")
    }
    const handleSearchButtonOnClick = () => {
        navigate(`/admin/menus?page=1&search=${searchValue}`);
    }

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>메뉴 관리</p>
                </div>
                <div css={s.functionBox}>
                    <div css={s.searchBox}>
                        <input type="text" placeholder="카테고리명, 상품명" onChange={handleSearchInputOnChange} value={searchValue}/>
                        <button onClick={handleSearchButtonOnClick}>🔍</button>
                    </div>
                    <div css={s.buttonBox}>
                        <button onClick={handleMenuAddOnClick}>등록</button>
                        <div />
                        <button onClick={handleDeleteMenuOnClick}>삭제</button>
                    </div>
                </div>
                <div css={s.tableLatout}>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" onChange={handleCheckedAllChange} checked={checkedAll} />
                                </th>
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
                                        <td>{menu.menuPrice}</td>
                                        <td>{menu.categories}</td>
                                        <td>{menu.options}</td>
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
                        pageCount={totalPageCount}
                        marginPagesDisplayed={2}
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

export default AdminMenuPage;