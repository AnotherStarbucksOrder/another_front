import React, { useState } from 'react'
import MainTop from '../../components/MainTop/MainTop'
import MainTopBar from '../../components/MainTopBar/MainTopBar'
import MainFooter from '../../components/MainFooter/MainFooter'
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { IoRemoveSharp } from "react-icons/io5";
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from 'react-router-dom';

// 메뉴 디테일 페이지
function MenuDetailPage() {

    const navigate = useNavigate();

    const [ optionList, setOptionList ] = useState([
        {"ICE/HOT": ["hot", "ice"]},
        {"얼음량": ["less", "more", "default"]},
        {"당도": ["less", "more", "default"]},
        {"시럽": ["헤이즐넛", "바닐라", "카라멜"]},
        {"사이즈": ["tall", "grande", "venti"]},
        {"사이즈": ["tall", "grande", "venti"]},
        {"시럽추가": ["tall", "grande", "venti"]}
    ]);

    const [ totalCount, setTotalCount ] = useState(1);

    // 상단에 - 버튼 클릭 시
    const handleOrderCancleOnClick = () => {
        navigate("/main");
    }

    // 수량 + 버튼 클릭했을 때
    const handlePlusButtonOnClick = () => {
        setTotalCount(totalCount => totalCount + 1);
    }

    // 수량 - 버튼 클릭했을 때 
    const handleMinusButtonOnClick = () => {    
        if(totalCount > 1) {
            setTotalCount(totalCount => totalCount - 1);
        }
    }

    return (
    <>
        <MainTop/>
        <MainTopBar/>
        <div css={s.layout}>
            <div css={s.container}>
                <div css={s.remove}><button onClick={handleOrderCancleOnClick}><IoRemoveSharp /></button></div>
                <div css={s.menuContainer}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReoTC5BcXL8hOg0jYX2qUVnimSKZGHzoxVBQ&s" alt="" />
                    <div css={s.menuInfo}>
                        <div>
                            <p>아메리카노</p>
                            <p>진한 에스프레소에 시원한 정수물과 얼음을 더하여 스타벅스의 깔끔하고 강렬한 에스프레소를 가장 부드럽고 시원하게 즐길 수 있는 커피</p>
                        </div>
                        <div css={s.buttons}>
                            <p>5,500원</p>
                            <div>
                                <button onClick={handleMinusButtonOnClick}><FaCircleMinus/></button>
                                <span>{totalCount}</span>
                                <button onClick={handlePlusButtonOnClick}><FaCirclePlus/></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div css={s.option}>
                    <div css={s.optionContainer}>
                        {
                            optionList.map((option, optionIndex) => {
                                const optionEntries = Object.entries(option);
                                const optionName = optionEntries[0][0];   // 얼음량, 당도
                                const optionValues = optionEntries[0][1]; // 얼음적게, 달게 덜달게 
                                return (
                                    <div key={optionIndex} css={s.optionInfo}>
                                        <div><p>{optionName}</p></div>
                                        <div>
                                            {
                                                optionValues.map((optionValue, idx) => {
                                                    return <button key={idx}>
                                                        {optionValue}
                                                    </button>
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button>선택 완료</button>
                </div>
            </div>
        </div>
        <MainFooter/>
    </>
    )
}

export default MenuDetailPage;