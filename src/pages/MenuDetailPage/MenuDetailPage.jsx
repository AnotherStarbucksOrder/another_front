import React, { useState } from 'react'
import MainTop from '../../components/MainTop/MainTop'
import MainTopBar from '../../components/MainTopBar/MainTopBar'
import MainFooter from '../../components/MainFooter/MainFooter'
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { IoRemoveSharp } from "react-icons/io5";
/** @jsxImportSource @emotion/react */
import * as s from './style';

// 메뉴 디테일 페이지
function MenuDetailPage() {

    
    const [ totalCount, setTotalCount ] = useState(1);
    const [selectedTemperature, setSelectedTemperature] = useState('hot');
    const [selectedSize, setSelectedSize] = useState('Tall');
    const [sweetness, setSweetness] = useState('더 달게');
    const [iceAmount, setIceAmount] = useState('얼음 많이');

    const handleTemperatureChange = (temp) => {
        setSelectedTemperature(temp);
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleSweetnessChange = (sweet) => {
        setSweetness(sweet);
    };

    const handleIceChange = (ice) => {
        setIceAmount(ice);
    };

    // 상단에 - 버튼 클릭 시
    const handleOrderCancleOnClick = () => {
        window.history.back();
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
                <div css={s.optionLayout}>
                    <div>
                        <p>ice/hot</p>
                        <p>사이즈</p>
                        <p>당도</p>
                        <p>얼음</p>
                    </div>
                    <div>
                        {/* 온도 선택 */}
                        <div css={s.sizeContainer}>
                            {['hot', 'ice'].map(temp => (
                                <div
                                    key={temp}
                                    css={s.sizeOption(selectedTemperature === temp)}
                                    onClick={() => handleTemperatureChange(temp)}
                                >
                                    {temp === 'hot' ? 'HOT' : 'ICE'}
                                </div>
                            ))}
                        </div>
                        {/* 사이즈 선택 */}
                        <div css={s.sizeContainer}>
                            {['Tall', 'Grande', 'Venti', 'Trenta'].map(size => (
                                <div
                                    key={size}
                                    css={s.sizeOption(selectedSize === size)}
                                    onClick={() => handleSizeChange(size)}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                        {/* 당도 선택 */}
                        <div css={s.sizeContainer}>
                            {['더 달게', '덜 달게'].map(sweet => (
                                <div
                                    key={sweet}
                                    css={s.sizeOption(sweetness === sweet)}
                                    onClick={() => handleSweetnessChange(sweet)}
                                >
                                    {sweet}
                                </div>
                            ))}
                        </div>
                        {/* 얼음 선택 */}
                        <div css={s.sizeContainer}>
                            {['얼음 많이', '얼음 적게'].map(ice => (
                                <div
                                    key={ice}
                                    css={s.sizeOption(iceAmount === ice)}
                                    onClick={() => handleIceChange(ice)}
                                >
                                    {ice}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div><button>선택 완료</button></div>
                </div>
            </div>
        </div>
        <MainFooter/>
    </>
    )
}

export default MenuDetailPage