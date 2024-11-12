import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { IoIosArrowForward, IoIosArrowBack} from "react-icons/io";
import { useQuery } from 'react-query';
import { instance } from '../../apis/util/instance';

function MainTopBar({ handleCategoryOnChange }) {

    const [ currentMenuIndex, setCurrentMenuIndex ] = useState(0); 
    const [ isActiveCategory, setIsActiveCategory] = useState(0);

    // 카테고리 List 받아오는 Query
    const categoryList = useQuery(
        ["categoryList"],
        async () => await instance.get("/category"),
        {
            retry: 0,
            refetchOnWindowFocus: false,
        }
    )

    // < 화살표 클릭 시 
    const handlePrevOnClick = () => {
        if (currentMenuIndex > 0) {
        setCurrentMenuIndex(currentMenuIndex - 1);
        }
    };

    // > 화살 표 클릭 시 
    const handleNextOnClick = () => {
        if (currentMenuIndex < categoryList?.data?.data?.categories.length - 4) {
        setCurrentMenuIndex(currentMenuIndex + 1);
        }
    };

    // 선택한 카테고리 ID 
    const handleSelectedCategoryId = (categoryId) => {
        handleCategoryOnChange(categoryId);         
        setIsActiveCategory(categoryId);
    };


    return (
        <div>
            <div css={s.menuCategory}>
                <button css={s.button("right")} onClick={handlePrevOnClick}><IoIosArrowBack/></button>
                <div css={s.menuButtons}>
                    {
                        categoryList?.data?.data?.categories.slice(currentMenuIndex, currentMenuIndex + 4).map(category => (
                        <button 
                            key={category.categoryId} 
                            onClick={() => handleSelectedCategoryId(category.categoryId)}
                            css={isActiveCategory === category.categoryId ? s.activeButton : ''}
                        >
                            {category.categoryName}
                        </button>
                    ))}
                </div>
                <button css={s.button("left")} onClick={handleNextOnClick}><IoIosArrowForward/></button>
            </div>
        </div>
    )
}

export default MainTopBar;