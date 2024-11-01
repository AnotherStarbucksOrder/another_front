import React from 'react'
import ReactModal from 'react-modal';
import { useRecoilState } from 'recoil';
import { ordersAtom } from '../../../atoms/ordersAtom';
/** @jsxImportSource @emotion/react */
import * as s from './style';

function CouponModal( {isOpenModal, setOpenModal } ) {
    
    const [ orders, setOrders ] = useRecoilState(ordersAtom);


    // 쿠폰 사용 할 메뉴 선택
    const handleProdcutOnClick = (menuId) => {
        console.log(menuId);
        setOpenModal(false)
    }

    console.log(orders)
    let item = [];

    for(let i = 0; i < orders.products.length; i++) {
        item += orders.products[i].menuId
    }
    
    console.log(item)

    return (
        <>
            <ReactModal
            style={{
                overlay: {
                    backgroundColor: "transparent",
                    zIndex: "50",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
                content: {
                    position: "relative",
                    margin: "0 auto",
                    boxSizing: "border-box",
                    borderRadius: "10px",
                    padding: "20px",
                    width: "800px",
                    height: "900px",
                    inset: "auto"
                },
            }}
            isOpen={isOpenModal}
            ariaHideApp={false}
            >
                <div css={s.layout}>
                    <p>음료 선택</p>
                    <div css={s.productContainer}>
                        {orders.products.map((product) => {
                            const items = [];
                            
                            for (let i = 0; i < product.count; i++) {
                                items.push(
                                    <div key={product.menuId} css={s.productInfo} onClick={() => handleProdcutOnClick(product.menuId)}>
                                        <div css={s.productDetailInfo}>
                                            <div>
                                                <p>{product.menuName}</p>
                                                {product.options.map((option) => (
                                                    <p key={option.optionId}>
                                                        {option.optionName}-{option.optionDetailValue}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                            <p>{(product.menuPrice).toLocaleString()} 원</p>
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