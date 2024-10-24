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

    // 각 메뉴 정보 Query 
    const menuInfo = useQuery(
        ["menuInfoQuery", menuId],
        async () => {
            const response = await instance.get(`/menu/${menuId}`);
            return response.data;
        },
        { 
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                // 기본값 넣어줌
                setMenuCart(menuCart => ({  
                    ...menuCart,
                    menuName: response.menuName,
                    menuPrice: response.menuPrice,
                    totalPrice: response.menuPrice,
                    options: response.menuDetailList.map(detail => ({
                        optionId: detail.option.optionId,
                        optionName: detail.option.optionName,
                        optionDetailId: detail.option.optionDetail[0].optionDetailId,
                        optionDetailValue: detail.option.optionDetail[0].optionDetailValue,
                        optionDetailPrice: detail.option.optionDetail[0].optionDetailPrice,
                    }))
                }))
            }
        }
    )

    const handleOrderCancleOnClick = () => {
        navigate("/home");
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
        setMenuCart(menuCart => ({
            ...menuCart,
            totalPrice: (!menuCart.menuPrice ? 0 : menuCart.menuPrice) * menuCart.count,
        }));
    }, [menuCart.count])


    // 선택 완료 버튼 클릭 시
    const handleSelectCompleteOnClick = () => {
        const newMenuCart = {...menuCart};

        if(orders.products.filter(menuCart => {
            const preMenuCart = {
                menuId: menuCart.menuId,
                menuName: menuCart.menuName,
                options: menuCart.options,
            };
            
            const sufMenuCart = {
                menuId: newMenuCart.menuId,
                menuName: newMenuCart.menuName,
                options: newMenuCart.options,
            };

            return JSON.stringify(preMenuCart) === JSON.stringify(sufMenuCart);
        }).length > 0) { 
            // menuId, options가 같으면 totalPrice, count만 올려짐 
            setOrders(order => ({
                ...order,
                products: order.products.map(menuCart => ({
                    ...menuCart, 
                    totalPrice: !menuCart.totalPrice ? 0 : menuCart.totalPrice + newMenuCart.totalPrice, 
                    count: menuCart.count + newMenuCart.count,}))
            }));
        }else {
            setOrders(order => ({
                ...order,
                products: [...order.products, newMenuCart]
            }));
        }

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
                    menuInfo.isLoading ? <></> :
                    <>
                        <div css={s.menuInfoContainer}>
                                <img src={menuInfo.data.imgUrl} alt="" />
                            <div css={s.menuInfoDetail}>
                                <div css={s.productNameInfo}>
                                    <p>{menuInfo.data.menuName}</p>
                                    <p>{menuInfo.data.comment}</p>
                                </div>
                                <div css={s.productPriceInfo}>
                                    <p>{(menuInfo.data.menuPrice).toLocaleString('ko-KR')} 원</p>
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
                                options={menuInfo.data.menuDetailList}
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