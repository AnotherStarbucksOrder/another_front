import React, { useEffect } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { useRecoilState } from 'recoil';
import { ordersAtom } from '../../atoms/ordersAtom';
import Swal from 'sweetalert2';

function MainFooter() {

    const navigate = useNavigate();
    const [ orders, setOrders ] = useRecoilState(ordersAtom);


    useEffect(() => {
        let totalAmount = 0;
        let totalQuantity = 0;
        
        for (let i = 0; i < orders.products.length; i++) {
            totalAmount += orders.products[i].totalPrice;
            totalQuantity += orders.products[i].count;
        }
        
        setOrders(order => ({
            ...order,
            amount: totalAmount,
            quantity: totalQuantity
        }));

    }, [orders.products]); 


    
    // 수량 - 버튼 클릭했을 때 
    const handleMinusButtonOnClick = (updateMenuCart) => {

        if(updateMenuCart.count > 1) {
            setOrders(orders => {
                return {
                    ...orders,
                    products: orders.products.map(menuCart => {
                        if(JSON.stringify(menuCart) === JSON.stringify(updateMenuCart)) {
                            return {
                                ...menuCart,
                                totalPrice: menuCart.totalPrice - menuCart.menuPrice,
                                count: menuCart.count - 1,
                            };
                        }
                        return menuCart;
                    }),
                }
            })
        }
    }
    
    // 수량 + 버튼 클릭했을 때
    const handlePlusButtonOnClick = (updateMenuCart) => {
        setOrders(orders => {
            return {
                ...orders,
                products: orders.products.map(menuCart => {
                    if(JSON.stringify(menuCart) === JSON.stringify(updateMenuCart)) {
                        return {
                            ...menuCart,
                            totalPrice: menuCart.totalPrice + menuCart.menuPrice,
                            count: menuCart.count + 1,
                        };
                    }
                    return menuCart;
                }),
            }
        })
    }

    // 장바구니 개별 삭제 버튼 클릭 
    const handleDeleteButtonOnClick = (menuId, menuName, options) => {

        Swal.fire({
            title: `${menuName}을 삭제하시겠습니까?`,
            color: "#036635",
            showConfirmButton: true,
            confirmButtonText: "네",
            confirmButtonColor: "#3EA270",
            showCancelButton: true,
            cancelButtonText: "아니오",
            cancelButtonColor: "#3EA270"
        }).then(result => {
            if(result.isConfirmed) {
                // 내가 버튼을 누른 해당 menuId, options가 일치하지 않은것들만 남겨두기 
                setOrders(order => ({
                    ...order,
                    products: order.products.filter(menu => !(menu.menuId === menuId && JSON.stringify(menu.options) === JSON.stringify(options))) 
                }));
            } else if(result.dismiss === Swal.DismissReason.cancel) {
                return;
            }
        })
    }

    // 장바구니 전체 삭제 버튼 클릭 
    const hanldeAlldeleteButtonOnClick = () => {

        if(orders.products.length === 0) {
            return;
        }

        Swal.fire({
            title: "전체메뉴를 삭제하시겠습니까?",
            color: "#036635",
            showConfirmButton: true,
            confirmButtonText: "네",            
            confirmButtonColor: "#3EA270",
            showCancelButton: true,
            cancelButtonText: "아니오",
            cancelButtonColor: "#3EA270"
        }).then(result => {
            if(result.isConfirmed) {
                setOrders(order => ({
                    ...order,
                    amount: "",
                    quantity: "",
                    products: []
                }))
            } else if(result.dismiss === Swal.DismissReason.cancel) {
                return;
            }
        })
    }

    // 결제하기 버튼 클릭했을 때
    const handlePaymentOnClick = () => {
        if(orders.products.length === 0) {
            return;
        }
        
        navigate("/payment");
    };


    return (
        <div css={s.layout}>
            <div css={s.orderContainer}>
                <p>Order</p>
                <div css={s.orderDetailContainer}>
                        {
                            orders.products.map((menuCart, index) => (
                                <div css={s.orderDetail} key={index}>
                                    <div css={s.orderProduct}>
                                        <button onClick={() => handleDeleteButtonOnClick(menuCart.menuId, menuCart.menuName, menuCart.options)}><FontAwesomeIcon icon={faXmark} /></button>
                                        <div>
                                            <p>{menuCart.menuName}</p>
                                            <p>{menuCart.options.map(option => option.optionName + "(" + option.optionDetailValue + ")").join(', ')}</p> 
                                        </div>
                                    </div>
                                    <div css={s.countButtons}>
                                        <div>
                                            <button onClick={() => handleMinusButtonOnClick(menuCart)}><FaCircleMinus/></button>
                                            <p>{menuCart.count}</p>
                                            <button onClick={() => handlePlusButtonOnClick(menuCart)}><FaCirclePlus/></button>
                                        </div>
                                        <p>{(menuCart.totalPrice).toLocaleString('Ko-KR')}원</p>
                                    </div>
                                </div>
                            ))
                        }
                </div>
            </div>
            <div css={s.totalContainer}>
                <div css={s.totalCount}>
                    <p>총 수량: {orders.quantity} 개</p>
                    <p>총 가격: {orders.amount.toLocaleString('ko-KR')} 원</p>
                </div>
                <div css={s.buttons}>
                    <button onClick={hanldeAlldeleteButtonOnClick}>전체 삭제</button>
                    <button onClick={handlePaymentOnClick}>결제 하기</button>
                </div>
            </div>
        </div>
    )
}

export default MainFooter;