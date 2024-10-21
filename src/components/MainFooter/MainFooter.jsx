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
        
        for (let i = 0; i < orders.menuCart.length; i++) {
            totalAmount += orders.menuCart[i].count;
            totalQuantity += orders.menuCart[i].price;
        }
        
        setOrders(order => ({
            ...order,
            orderAmount: totalAmount,
            orderQuantity: totalQuantity
        }));

    }, [orders.menuCart]); 

    // 수량 + 버튼 클릭했을 때
    const handlePlusButtonOnClick = (menuId, options) => {
        
        setOrders(order => ({
            ...order,
            menuCart: order.menuCart.map(menu => 
                menu.menuId === menuId && JSON.stringify(menu.options) === JSON.stringify(options)
                ? 
                { 
                    ...menu, 
                    count: menu.count + 1,
                    price: menu.price +  menu.unitPrice
                }
                : menu
            ),
        }));
    }

    // 수량 - 버튼 클릭했을 때 
    const handleMinusButtonOnClick = (menuId, options) => {

        setOrders(order => ({
            ...order,
            menuCart: order.menuCart.map(menu => 
                menu.menuId === menuId && menu.count > 1 && JSON.stringify(menu.options) === JSON.stringify(options) 
                ? { 
                    ...menu, 
                    count: menu.count - 1,
                    price: menu.price - menu.unitPrice
                }
                : menu
            )
        }));
    }

    // 장바구니 개별 삭제 버튼 클릭 
    const handleDeleteButtonOnClick = (menuId, menuName) => {

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
                // 내가 버튼을 누른 해당 menuId랑 일치하지 않은것들만 남겨두기 
                setOrders(order => ({
                    ...order,
                    menuCart: order.menuCart.filter(menu => menu.menuId !== menuId) 
                }));
            } else if(result.dismiss === Swal.DismissReason.cancel) {
                return;
            }
        })
    }

    // 장바구니 전체 삭제 버튼 클릭 
    const hanldeAlldeleteButtonOnClick = () => {
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
                    orderAmount: "",
                    orderQuantity: "",
                    menuCart: []
                }))
            } else if(result.dismiss === Swal.DismissReason.cancel) {
                return;
            }
        })
    }
    
    // 결제하기 버튼 클릭했을 때
    const handlePaymentOnClick = () => {
        navigate("/payment");
    };

    return (
        <div css={s.layout}>
            <div css={s.orderContainer}>
                <p>Order</p>
                <div css={s.orderDetailContainer}>
                        {
                            orders.menuCart.map((menu, index) => (
                                <div css={s.orderDetail} key={index}>
                                    <div css={s.orderProduct}>
                                        <button onClick={() => handleDeleteButtonOnClick(menu.menuId, menu.menuName)}><FontAwesomeIcon icon={faXmark} /></button>
                                        <p>{menu.menuName}</p>
                                    </div>
                                    <div css={s.countButtons}>
                                        <div>
                                            <button onClick={() => handleMinusButtonOnClick(menu.menuId, menu.options)}><FaCircleMinus/></button>
                                            <p>{menu.count}</p>
                                            <button onClick={() => handlePlusButtonOnClick(menu.menuId, menu.options)}><FaCirclePlus/></button>
                                        </div>
                                        <p>{parseInt(menu.price).toLocaleString('Ko-KR')}원</p>
                                    </div >
                                </div>
                            ))
                        }
                </div>
            </div>
            <div css={s.totalContainer}>
                <div css={s.totalCount}>
                    <p>총 수량: {orders.orderAmount} 개</p>
                    <p>총 가격: {parseInt(orders.orderQuantity).toLocaleString('ko-KR')} 원</p>
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