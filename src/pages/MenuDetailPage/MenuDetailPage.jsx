import React, { useState } from 'react'
import MainTop from '../../components/MainTop/MainTop'
import MainTopBar from '../../components/MainTopBar/MainTopBar'
import MainFooter from '../../components/MainFooter/MainFooter'
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query';
import { instance } from '../../apis/util/instance';
import { ordersAtom } from '../../atoms/ordersAtom';
import OptionList from '../../components/OptionList/OptionList';
import { useRecoilState } from 'recoil';
/** @jsxImportSource @emotion/react */
import * as s from './style';

function MenuDetailPage() {

    const navigate = useNavigate();

    const params = useParams();
    const menuId = params.menuId;
    const [ orders, setOrders ]  = useRecoilState(ordersAtom);
    const [ selectedOptions, setSelectedOptions ] = useState([]);
    const [ totalCount, setTotalCount ] = useState(1);


    // 각 메뉴 정보 Query 
    const menuInfo = useQuery(
        ["menuInfoQuery", menuId],
        async () => {
            const response = await instance.get(`/menu/${menuId}`)
            return response.data
        },
        { 
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setSelectedOptions(response.menuDetailList.map(detail => ({
                        id: detail.option.optionDetailId,
                        name: detail.option.optionName,
                        value: detail.option.optionDetail[0].optionDetailValue,
                        price: detail.option.optionDetail[0].optionDetailPrice,
                    }))
                );
            }
        }
    )

    const handleOrderCancleOnClick = () => {
        navigate("/home");
    }

    const handlePlusButtonOnClick = () => {
        setTotalCount(totalCount => totalCount + 1)
    }

    const handleMinusButtonOnClick = () => {   
        if(totalCount > 1) {
            setTotalCount(totalCount => totalCount - 1)
        }
    }

    // 각각 옵션버튼 클릭 시 
    const handleOptionOnClick = (optionName,  optionDetailValue, optionPrice) => {
        
        // 같은 이름의 옵션이 있는지 확인 
        const existOption = selectedOptions.find(option => option.name === optionName);

        if (existOption) { // 같은 이름의 옵션이 이미 있을 때 optionValue와 price만 업데이트
            if(existOption.value !== optionDetailValue) {
                const updatedOptions = selectedOptions.map(option =>
                    option.name === optionName
                        ? 
                        { 
                            ...option, 
                            value: optionDetailValue, price: parseInt(optionPrice) 
                        } 
                        : option
                );
                setSelectedOptions(updatedOptions);
            }

        } else {
            // 같은 이름의 옵션이 없으면 새로 추가
            setSelectedOptions(options => [
                ...options,
                { 
                    name: optionName, 
                    value: optionDetailValue, 
                    price:  parseInt(optionPrice) 
                }
            ]);
        }
    };

    // 선택 완료 버튼 클릭 시
    const handleSelectCompleteOnClick = () => {

        // 옵션 포함 금액 구하기 위해서
        const menuBasePrice = parseInt(menuInfo.data.menuPrice);

        let totalOptionPrice = 0; 
        selectedOptions.forEach(option => {
            totalOptionPrice += option.price; 
        });

        
        // menuCart에 담을 내용 만들어
        const newCartMenu = {
            menuId: menuId,
            menuName: menuInfo.data.menuName,
            options: selectedOptions.map(option => ({ [option.name]: option.value })),
            unitPrice: menuBasePrice + totalOptionPrice,
            price: (menuBasePrice + totalOptionPrice) * totalCount,
            count: totalCount,
        };

        setOrders(order => {

            // menuCart안에 같은 menuId에 같은 options가 있는지 확인
            const existMenu = order.menuCart.find(
                item => item.menuId === newCartMenu.menuId &&
                        JSON.stringify(item.options) === JSON.stringify(newCartMenu.options)
            );

            // 있다면, count와 price만 올림 (existMenu가 존재하는 메뉴라는 뜻 - 변수명 정하기 눈물난댜,,)
            if (existMenu) {
                const updatMenuCart = {
                    ...order,
                    menuCart: order.menuCart.map(item =>
                        item === existMenu
                            ? 
                            { 
                                ...item,
                                unitPrice: item.price,
                                count: item.count + newCartMenu.count, 
                                price: (item.price + newCartMenu.price)
                            }
                            : item
                    ),
                };
                return updatMenuCart;

            // 없으면, 만들어둔 newCartMenu 객체를 리턴
            } else {
                const updatMenuCart = {
                    ...order,
                    menuCart: [
                        ...order.menuCart, 
                        newCartMenu,
                    ],
                };
                return updatMenuCart;
            }
        });
        navigate("/home");
    };


    return (
    <>
        <MainTop/>
        <MainTopBar handleCategoryOnChange={() => {}}/>
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
                                <p>{parseInt(menuInfo?.data?.menuPrice).toLocaleString('ko-KR')} 원</p>
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
                    <OptionList
                        menuInfo={menuInfo} 
                        selectedOptions={selectedOptions}
                        handleOptionOnClick={handleOptionOnClick}
                    />
                    <button onClick={handleSelectCompleteOnClick}>선택 완료</button>
                </div>
            </div>
        </div>
        <MainFooter/>
    </>
        )
    }

export default MenuDetailPage;