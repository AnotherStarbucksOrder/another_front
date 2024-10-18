import React, { useState } from 'react'
import MainTop from '../../components/MainTop/MainTop'
import MainTopBar from '../../components/MainTopBar/MainTopBar'
import MainFooter from '../../components/MainFooter/MainFooter'
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query';
import { instance } from '../../apis/util/instance';

// 메뉴 디테일 페이지
function MenuDetailPage() {

    const navigate = useNavigate();

    const params = useParams();
    const menuId = params.menuId;
    
    const [ totalCount, setTotalCount ] = useState(1);

    const menuInfo = useQuery(
        ["menuInfoQuery", menuId],
        async () => {
            const response = await instance.get(`/menu/${menuId}`)
            return response.data
        },
        {   
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: data => {
                console.log(data)
            }
        }
    )


    // 상단에 x 버튼 클릭 시
    const handleOrderCancleOnClick = () => {
        navigate("/home");
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

    // 선택 완료버튼 클릭 -> main 화면으로 이동 (장바구니에 내용 담을거)
    const handleSelectedOnClick = () => {
        Swal.fire("선택이 완료되었습니다").then(result => {
            if(result.isConfirmed) {
                navigate("/home");
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
                {  
                    <div css={s.menuInfoContainer}>
                            <img src={menuInfo.data?.imgUrl} alt="" />
                        <div css={s.menuInfoDetail}>
                            <div css={s.productNameInfo}>
                                <p>{menuInfo.data?.menuName}</p>
                                <p>{menuInfo.data?.comment}</p>
                            </div>
                            <div css={s.productPriceInfo}>
                                <p>{menuInfo.data?.menuPrice} 원</p>
                                <div css={s.productCount}>
                                    <button onClick={handleMinusButtonOnClick}><FaCircleMinus/></button>
                                    <p>{totalCount}</p>
                                    <button onClick={handlePlusButtonOnClick}><FaCirclePlus/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div css={s.optionInfoContainer}>
                    <div css={s.optionDetail}>
                        {
                            menuInfo.data?.menuDetailList.map((menuDetail) => {
                                return (
                                    <div key={menuDetail.menuDetailId} css={s.options}>
                                        <p>{menuDetail.option.optionName}</p>
                                        <div css={s.buttons}>
                                            {
                                                menuDetail.option.optionDetail.map(option => 
                                                    <button key={option.optionDetailId} value={option.optionDetailId}>{option.optionDetailValue}</button>
                                                )
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