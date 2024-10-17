import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { IoIosArrowForward, IoIosArrowBack} from "react-icons/io";
import { useQuery } from 'react-query';
import { instance } from '../../apis/util/instance';

function MainTopBar({ setSelectedCategoryId }) {

    const [ categories, setCategories] = useState([]);
    const [ currentMenuIndex, setCurrentMenuIndex ] = useState(0); 


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


    return (
        <div>
            <div css={s.menuCategory}>
                <button css={s.button("right")} onClick={handlePrevOnClick}><IoIosArrowBack/></button>
                <div css={s.menuButtons}>
                    {
                        categories.slice(currentMenuIndex, currentMenuIndex + 4).map((category) => (
                        <button key={category.categoryId} onClick={() => 
                            setSelectedCategoryId(category.categoryId)
                        }>{category.categoryName}</button>
                    ))}
                </div>
                <button css={s.button("left")} onClick={handleNextOnClick}><IoIosArrowForward/></button>
            </div>
        </div>
    )
}

export default MainTopBar;