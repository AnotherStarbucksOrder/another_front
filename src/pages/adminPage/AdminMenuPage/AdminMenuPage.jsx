/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import { Switch } from "pretty-checkbox-react";

function AdminMenuPage(props) {
    const [searchParams] = useSearchParams(); 
    const [checkedAll, setCheckedAll] = useState(false);
    const [totalPageCount, setTotalPageCount] = useState(1);
    const [menus, setMenus] = useState([]);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState(searchParams.get("searchName") ?? "");
    const limit = 13;

    // 메뉴 리스트 조회, 페이지네이션
    const menuList = useQuery(
        ["menuListQuery", searchParams.get("page"), searchParams.get("search")],
        async () => await instance.get(`/admin/menus?page=${searchParams.get("page")}&limit=${limit}&searchName=${searchValue}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setMenus(response?.data?.data);
                setTotalPageCount(
                    response?.data.totalCount % limit === 0
                        ? response?.data.totalCount / limit
                        : Math.floor(response?.data.totalCount / limit) + 1)
            }
        }
    )

    // 메뉴 삭제
    const deleteMenuMutation = useMutation(
        async (menuIds) => {
            for (const menuId of menuIds ) {
                await instance.delete(`/admin/menu?ids=${menuId}`)
            }
        },
        {
            onSuccess: () => {
                alert("메뉴를 삭제하였습니다.");
                menuList.refetch();
            }
        }
    );

    useEffect(() => {
        setSearchValue("");
        menuList.refetch();
    }, [searchParams]);

    const handleSearchInputOnChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handlePageOnChange = (e) => {
        navigate(`/admin/menus?page=${e.selected + 1}&searchName=${searchValue}`);
    }

    // 체크박스 상태 관리 
    useEffect(() => {
        const allChecked = menus.every(menu => menu.isChecked);
        setCheckedAll(allChecked);
    }, [menus]);

    const handleMenuChecked = (menuId) => {
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

    // 메뉴 노출 여부 상태
    const menuStatusUpdateMutation = useMutation(
        async (menuId) => await instance.patch(`/admin/menu/status/${menuId}`),
        {
            onSuccess: () => {
                menuList.refetch();
            }
        }
    )

    const handleMenuStatusChekcked = (menuId) => {
        setMenus(menus =>
            menus.map(menu =>
                menu.menuId === menuId
                    ? { ...menu, menuStatus: 1 ? 0 : 1 }
                    : menu
            )
        );
        menuStatusUpdateMutation.mutateAsync(menuId);
    };

    const handleDeleteMenuOnClick = () => {
        const menuIds = menus.filter(menu => menu.isChecked).map(menu => menu.menuId);

        if (menuIds.length === 0) {
            alert("삭제할 메뉴를 선택하세요.");
            return;
        }

        if (window.confirm("선택한 메뉴를 삭제하시겠습니까?")) {
            deleteMenuMutation.mutateAsync(menuIds);
        }
    };

    const handleMenuAddOnClick = () => {
        navigate("/admin/menu/add")
    }
    const handleSearchButtonOnClick = () => {
        navigate(`/admin/menus?page=1&searchName=${searchValue}`);
        menuList.refetch();
    }

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>메뉴 관리</p>
                </div>
                <div css={s.functionBox}>
                    <div css={s.searchBox}>
                        <input type="text" placeholder="카테고리명, 상품명" 
                            onChange={handleSearchInputOnChange} 
                            value={searchValue} />
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
                                    <input type="checkbox" 
                                        onChange={handleCheckedAllChange} 
                                        checked={checkedAll} />
                                </th>
                                <th>상품명</th>
                                <th>가격</th>
                                <th>카테고리</th>
                                <th>옵션</th>
                                <th>노출 여부</th>
                                <th>--</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menus.map(menu =>
                                    <tr key={menu.menuId}>
                                        <td><input type="checkbox" 
                                            onChange={() => handleMenuChecked(menu.menuId)} 
                                            checked={menu.isChecked} value={menu.menuId} /></td>
                                        <td>{menu.menuName}</td>
                                        <td>{(menu.menuPrice.toLocaleString() || 0) + "원"}</td>
                                        <td>{menu.categories}</td>
                                        <td>{menu.options}</td>
                                        <td><Switch value={menu.menuStatus} 
                                            checked={menu.menuStatus === 1} 
                                            onClick={() => handleMenuStatusChekcked(menu.menuId)} /></td>
                                        <td><Link to={`/admin/menu/detail/${menu.menuId}`}>상세보기</Link></td>
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
        </>
    );
}

export default AdminMenuPage;