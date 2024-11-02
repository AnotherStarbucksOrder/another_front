import React from 'react'
import ReactModal from 'react-modal';
import { useRecoilState } from 'recoil';
import { ordersAtom } from '../../../atoms/ordersAtom';
/** @jsxImportSource @emotion/react */
import * as s from './style';
import Swal from 'sweetalert2';

function CouponModal( {isOpenModal, setOpenModal, pointPaymentRef, selectedCouponId} ) {
    
    const [ orders, setOrders ] = useRecoilState(ordersAtom);

    const calculateTotalPrice = (product) => {
        let optionsPrice = 0;
        for (let i = 0; i < product.options.length; i++) {
            optionsPrice += product.options[i].optionDetailPrice;
        }
        return product.menuPrice + optionsPrice;
    };

    
    const handleProductOnClick = (menuId) => {
        const updatedUsedCoupons = orders.user.usedCoupon.filter(coupon => coupon.couponId !== selectedCouponId);

        setOrders(order => ({
            ...order,
            user: {
                ...order.user,
                usedCoupon: [...updatedUsedCoupons, { couponId: selectedCouponId, menuId }] 
            }
        }));
    

        Swal.fire({
            icon: 'success',
            title: '쿠폰 적용 완료',
            showConfirmButton: false,
            timer: 1500
        });
        setOpenModal(false); 
    };
    
    console.log(orders);

    return (
        <>
            <ReactModal
            style={{
                overlay: {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    backgroundColor: "transparent",
                    zIndex: "50",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
                content: {
                    position: "absolute",
                    boxSizing: "border-box",
                    borderRadius: "10px",
                    padding: "20px",
                    width: "max-content",
                    height: "900px",
                    top: "50%",   
                    left: "50%",
                    // inset: `${pointPaymentRef.current.offsetTop + (pointPaymentRef.current.clientHeight / 2)}px 0px 0px ${pointPaymentRef.current.offsetLeft + (pointPaymentRef.current.clientWidth / 2)}px`,
                    transform: "translate(-50%, -50%)"
                },
            }}
            isOpen={isOpenModal}
            ariaHideApp={false}
            parentSelector={() => pointPaymentRef.current}
            >
                <div css={s.layout}>
                    <p>적용할 음료 선택</p>
                    <div css={s.productContainer}>
                        {orders.products.map((product) => {
                            const items = [];
                            const totalProductPrice = calculateTotalPrice(product);
                            
                            for (let i = 0; i < product.count; i++) {
                                items.push(
                                    <div key={`${product.menuId}-${i}`} css={s.productInfo} onClick={() => handleProductOnClick(product.menuId)}>
                                        <div css={s.productDetailInfo}>
                                            <div>
                                                <p>{product.menuName}</p>
                                                {product.options.map((option) => (
                                                    <p key={option.optionId}>
                                                        {option.optionName}({option.optionDetailValue})
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                            <p>{totalProductPrice.toLocaleString()} 원</p>
                                    </div>
                                );
                            }
                            return items;
                        })}
                    </div>
                </div>

            </ReactModal>
        </>
    )
}

export default CouponModal;