import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { IoIosArrowForward, IoIosArrowBack} from "react-icons/io";
import { useQuery } from 'react-query';
import { instance } from '../../apis/util/instance';

function MainTopBar({ handleCategoryOnChange }) {

    const [ categories, setCategories] = useState([]);
    const [ currentMenuIndex, setCurrentMenuIndex ] = useState(0); 
    const [ isActiveCategory, setIsActiveCategory] = useState("");

    // 카테고리 list Query
    const categoryList = useQuery(
        ["categoryList"],
        async () => {
            const response = await instance.get("/category")
            return response.data
        },
        {
            onSuccess: data => {
                setCategories(data.categories)
            },
            refetchOnWindowFocus: false,
            retry: 0
        }
    )

    const handlePrevOnClick = () => {
        if (currentMenuIndex > 0) {
        setCurrentMenuIndex(currentMenuIndex - 1);
        }
    };

    const handleNextOnClick = () => {
        if (currentMenuIndex < categories.length - 4) {
        setCurrentMenuIndex(currentMenuIndex + 1);
        }
    };


    const handleSelectedCategoryId = (categoryId) => {
        handleCategoryOnChange(categoryId); // MainHomePage
        setIsActiveCategory(categoryId);
    }



    return (
        <div>
            <div css={s.menuCategory}>
                <button css={s.button("right")} onClick={handlePrevOnClick}><IoIosArrowBack/></button>
                <div css={s.menuButtons}>
                    {
                        categories.slice(currentMenuIndex, currentMenuIndex + 4).map((category) => (
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