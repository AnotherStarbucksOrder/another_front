import React, { useState } from 'react'
import ReactModal from 'react-modal';
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { ordersAtom } from '../../atoms/ordersAtom';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';


function CouponModal( {isOpenModal, setOpenModal, pointPaymentRef, selectedCouponId} ) {
    
    const [ orders, setOrders ] = useRecoilState(ordersAtom);
    const [ selectedProductId, setSelectedProductId] = useState(null);

    // 기본가격 + 옵션 가격 
    const calculateTotalPrice = (product) => {
        let optionsPrice = 0;
        for (let i = 0; i < product.options.length; i++) {
            optionsPrice += product.options[i].optionDetailPrice;
        }
        return product.menuPrice + optionsPrice;
    };

    // 적용할 음료 선택 
    const handleProductOnClick = (menuId, menuName, productUniqueId) => {

        // 쿠폰 적용 중인 메뉴는 다른 쿠폰에 사용 못하게
        const existingCoupon = orders.user.usedCoupon.find(coupon => coupon.productUniqueId === productUniqueId);

        if (existingCoupon) {
            Swal.fire({
                icon: 'error',
                iconColor: "#036635",
                title: '이 메뉴에는 이미 쿠폰이 적용되었습니다.',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        };

        setSelectedProductId(productUniqueId);
        
        const updatedUsedCoupons = orders.user.usedCoupon.filter(coupon => coupon.couponId !== selectedCouponId);

        setOrders(order => ({
            ...order,
            user: {
                ...order.user,
                usedCoupon: [...updatedUsedCoupons, { couponId: selectedCouponId, menuId, productUniqueId}] 
            }
        }));
    
        Swal.fire({
            icon: 'success',
            iconColor: "#036635",
            title: '쿠폰 적용 완료',
            text: `${menuName}에 쿠폰 적용이 되었습니다`,
            showConfirmButton: false,
            timer: 1500
        });

        setSelectedProductId(0);
        setOpenModal(false); 
    };

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
                        justifyContent: "center"
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
                        {
                            orders.products.map((product, index) => {
                                const items = [];
                                const totalProductPrice = calculateTotalPrice(product);
                                
                                for (let i = 0; i < product.count; i++) {
                                    const productUniqueId = `${product.menuId}-${index}-${i}`;
                                    
                                    items.push(
                                        <div 
                                            key={`${product.menuId}-${i}`} 
                                            css={s.productInfo} 
                                            onClick={() => handleProductOnClick(product.menuId, product.menuName, productUniqueId)}
                                        >
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
                                }
                            )
                        }
                    </div>
                    <button onClick={() => setOpenModal(false)}>닫기</button>
                </div>
            </ReactModal>
        </>
    )
}

export default CouponModal;