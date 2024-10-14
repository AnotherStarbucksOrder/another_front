import React, { useState } from 'react'
import MainTop from '../../components/MainTop/MainTop'
import MainTopBar from '../../components/MainTopBar/MainTopBar'
import MainFooter from '../../components/MainFooter/MainFooter'
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// 메뉴 디테일 페이지
function MenuDetailPage() {

    const navigate = useNavigate();

    const [ optionList, setOptionList ] = useState([
        {"ICE/HOT": ["ICE", "HOT"]},
        {"얼음량": ["기본", "얼음 적게", "얼음 많이"]},
        {"당도": ["기본", "덜 달게", "달게"]},
        {"시럽": ["헤이즐넛", "바닐라", "카라멜"]},
        {"샷추가": ["기본", "1샷", "2샷"]},
    ]);

    const [ totalCount, setTotalCount ] = useState(100);

    // 상단에 x 버튼 클릭 시
    const handleOrderCancleOnClick = () => {
        navigate("/menus");
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

    // 선택 완료버튼 클릭 -> main 화면으로 이동
    const handleSelectedOnClick = () => {
        Swal.fire("선택이 완료되었습니다").then(result => {
            if(result.isConfirmed) {
                navigate("/menus");
            }
        })
    }

    return (
    <>
        <MainTop/>
        <MainTopBar/>
        <div css={s.layout}>
            <div css={s.container}>
                <button onClick={handleOrderCancleOnClick}><FontAwesomeIcon icon={faXmark} /></button>
                <div css={s.menuInfoContainer}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReoTC5BcXL8hOg0jYX2qUVnimSKZGHzoxVBQ&s" alt="" />
                    <div css={s.menuInfoDetail}>
                        <div css={s.productNameInfo}>
                            <p>아메리카노</p>
                            <p>진한 에스프레소에 시원한 정수물과 얼음을 더하여 스타벅스의 깔끔하고 강렬한 에스프레소를 가장 부드럽고 시원하게 즐길 수 있는 커피</p>
                        </div>
                        <div css={s.productPriceInfo}>
                            <p>5,500원</p>
                            <div css={s.productCount}>
                                <button onClick={handleMinusButtonOnClick}><FaCircleMinus/></button>
                                <p>{totalCount}</p>
                                <button onClick={handlePlusButtonOnClick}><FaCirclePlus/></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div css={s.optionInfoContainer}>
                    <div css={s.optionDetail}>
                        {
                            optionList.map((option, optionIndex) => {
                                const optionEntries = Object.entries(option)
                                const optionName = optionEntries[0][0];   // 얼음량, 당도
                                const optionValues = optionEntries[0][1]; // 얼음적게, 달게 덜달게 
                                return (
                                    <div key={optionIndex} css={s.options}>
                                        <p>{optionName}</p>
                                        <div css={s.buttons}>
                                            {
                                                optionValues.map((optionValue, idx) => {
                                                    return <button key={idx}>{optionValue}</button>
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button onClick={handleSelectedOnClick}>선택 완료</button>
                </div>
            </div>
        </div>
        <MainFooter/>
    </>
    )
}

export default MenuDetailPage;