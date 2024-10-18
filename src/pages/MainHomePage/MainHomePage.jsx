import React, { useState } from 'react'
import MainTop from '../../components/MainTop/MainTop'
import MainTopBar from '../../components/MainTopBar/MainTopBar'
import MainFooter from '../../components/MainFooter/MainFooter'
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { IoIosArrowForward, IoIosArrowBack} from "react-icons/io";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { instance } from '../../apis/util/instance';
import ReactPaginate from 'react-paginate';


function MainHomePage() {

    const navigate = useNavigate();

    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ totalPageCount, setTotalPageCount ] = useState(1);
    const [ selectedCategoryId, setSelectedCategoryId ] = useState(1);
    const limit = 9;
    const currentPage = searchParams.get("page") || 1;

    


    // 카테고리별 menuList 받아오는 Query
    const menuList = useQuery(
        ["menuListQuery", selectedCategoryId, searchParams.get("page")],
        async () => {
            const response = await instance.get(`/home/category/menus?categoryId=${selectedCategoryId}&page=${currentPage}&limit=${limit}`)
            return response.data
        },
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: data => {
                console.log(data)
                setTotalPageCount(
                    data.totalCount % limit === 0
                    ? data.totalCount / limit
                    : Math.floor(data.totalCount / limit) + 1
                )
            },
        }
    )

    // 페이지이동할때 마다 + 1
    const handlePageOnChange = (e) => {
        setSearchParams({ page: e.selected + 1 })
    }

    // 카테고리가 변경될때마다 categoryId를 set, page를 1로 초기화
    const handleCategoryOnChange = (categoryId) => {
        if(categoryId !== selectedCategoryId) {
            setSelectedCategoryId(categoryId);
            setSearchParams({ page: 1 }); 
        }
    }



    return (
        <>
            <MainTop />
            <MainTopBar setSelectedCategoryId={handleCategoryOnChange} />
                <div css={s.layout}>
                    {
                        menuList.isLoading
                        ?
                        <></>
                        :
                        <div css={s.menuContainer}>
                            {
                                menuList.data?.menus?.map(menu =>
                                    <div css={s.menuBox} key={menu.menuId} onClick={() => navigate(`/menu/detail/${menu.menuId}`)}>
                                            <div>
                                                <img src={menu.imgUrl} alt="" />
                                            </div>
                                            <p>{menu.menuName}</p>
                                            <p>{menu.menuPrice}</p>
                                    </div>
                                )
                            }
                        </div>
                    }
                    <div css={s.paginateContainer}>
                        <ReactPaginate 
                            breakLabel= "..."
                            previousLabel={<><IoIosArrowBack/></>}
                            nextLabel={<><IoIosArrowForward/></>}
                            pageCount={totalPageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            activeClassName='active'
                            onPageChange={handlePageOnChange}
                            forcePage={parseInt(searchParams.get("page") || 1) - 1}
                        />
                    </div>
                </div>
            <MainFooter />
        </>
    )
}

export default MainHomePage