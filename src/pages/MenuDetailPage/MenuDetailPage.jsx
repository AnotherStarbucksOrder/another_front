import React, { useEffect, useState } from 'react'
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

    const [ menuCart, setMenuCart ] = useState({
        menuId: menuId,
        menuName: "",
        options: [],
        menuPrice: 0,
        totalPrice: 0,
        count: 1,
    });

    const [ orders, setOrders ]  = useRecoilState(ordersAtom);

    // 각 메뉴 정보 menuInfoQuery 
    const menuInfo = useQuery(
        ["menuInfoQuery", menuId],
        async () => await instance.get(`/menu/${menuId}`),
        { 
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                // 기본값 넣어줌
                setMenuCart(menuCart => ({  
                    ...menuCart,
                    menuName: response.data.menuName,
                    menuPrice: response.data.menuPrice,
                    totalPrice: response.data.menuPrice,
                    options: response.data.menuDetailList.map(detail => ({
                        optionId: detail?.option.optionId,
                        optionName: detail?.option.optionName,
                        optionDetailId: detail?.option.optionDetail[0].optionDetailId,
                        optionDetailValue: detail?.option.optionDetail[0].optionDetailValue,
                        optionDetailPrice: detail?.option.optionDetail[0].optionDetailPrice,
                    }))
                }))
            }
        }
    )

    // 상단 x 버튼 클릭 시 
    const handleOrderCancleOnClick = () => {
        navigate(-1);
    }

    // + 버튼 클릭시
    const handleCountMinusButtonOnClick = () => {
        if(menuCart.count > 1) {
            setMenuCart(menuCart => ({
                ...menuCart,
                count: menuCart.count - 1
            }));
        }
    }

    // - 버튼 클릭시
    const handleCountPlusButtonOnClick = () => {
        setMenuCart(menuCart => ({
            ...menuCart,
            count: menuCart.count + 1
        }));
    }

    // count가 변할때마다 totalPrice 계산
    useEffect(() => {
        let optionPrice = 0;

        for(let i = 0; i < menuCart.options.length; i++) {
            optionPrice += menuCart.options[i].optionDetailPrice
        }

        setMenuCart(menuCart => ({
            ...menuCart,
            totalPrice: (!menuCart.menuPrice ? 0 : menuCart.menuPrice + optionPrice) * menuCart.count,
        }));

    }, [menuCart.count, menuCart.options])


    // 선택 완료 버튼 클릭 시
    const handleSelectCompleteOnClick = () => {
        const newMenuCart = {...menuCart};

        // menuId와 options가 같은 항목이 있는지 확인
        if (orders.products.filter(menuCart => 
                menuCart.menuId === newMenuCart.menuId &&
                JSON.stringify(menuCart.options) === JSON.stringify(newMenuCart.options)
        ).length > 0) { 
            // menuId와 options가 같은 항목이 있다면 totalPrice와 count만 업데이트 
            setOrders(order => ({
                ...order,
                products: order.products.map(menuCart => {
                    if (menuCart.menuId === newMenuCart.menuId && JSON.stringify(menuCart.options) === JSON.stringify(newMenuCart.options)) {
                        return {
                            ...menuCart,
                            totalPrice: menuCart.totalPrice + newMenuCart.totalPrice,
                            count: menuCart.count + newMenuCart.count,
                        };
                    }
                    return menuCart;
                }),
            }));
        } else {
            // 새로운 항목을 추가
            setOrders(order => ({
                ...order,
                products: [...order.products, newMenuCart],
            }));
        }
        navigate(-1);
    };

    return (
    <>
        <MainTop/>
        <MainTopBar handleCategoryOnChange={() => {}}/>
        <div css={s.layout}>
            <div css={s.container}>
                <button onClick={handleOrderCancleOnClick}><FontAwesomeIcon icon={faXmark} /></button>
                {  
                    menuInfo.isLoading ? <></> :
                    <>
                        <div css={s.menuInfoContainer}>
                                <img src={menuInfo.data.data.imgUrl} alt="" />
                            <div css={s.menuInfoDetail}>
                                <div css={s.productNameInfo}>
                                    <p>{menuInfo.data.data.menuName}</p>
                                    <p>{menuInfo.data.data.comment}</p>
                                </div>
                                <div css={s.productPriceInfo}>
                                    <p>{(menuInfo.data.data.menuPrice).toLocaleString()} 원</p>
                                    <div css={s.productCount}>
                                        <button onClick={handleCountMinusButtonOnClick} ><FaCircleMinus /></button>
                                        <p>{menuCart.count}</p>
                                        <button onClick={handleCountPlusButtonOnClick} ><FaCirclePlus /></button>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div css={s.optionInfoContainer}>
                            <OptionList
                                options={menuInfo.data.data.menuDetailList}
                                menuCart={menuCart}
                                setMenuCart={setMenuCart}
                            />
                            <button onClick={handleSelectCompleteOnClick}>선택 완료</button>
                        </div>
                    </>
                }
            </div>
        </div>
        <MainFooter/>
    </>
        )
    }

export default MenuDetailPage;