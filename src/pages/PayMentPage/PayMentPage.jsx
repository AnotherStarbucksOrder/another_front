import React from 'react';
import MainFooter from '../../components/MainFooter/MainFooter';
import MainTop from '../../components/MainTop/MainTop';
import MainTopBar from '../../components/MainTopBar/MainTopBar';
/** @jsxImportSource @emotion/react */
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import * as s from './style';
import { ordersAtom } from '../../atoms/ordersAtom';

function PayMentPage() {

    const navigate = useNavigate();

    const orders = useRecoilValue(ordersAtom);

    // 상단에 - 버튼 클릭 시
    const handleCancleOnClick = () => {
        navigate("/menus");
    };

    // 포인트 결제
    const handlePointOnClick = () => {
        navigate("/point");
    };

    // 카드 결제
    const handleCardOnClick = () => {
        Swal.fire({
            title: "포인트 적립 하시겠습니까?",
            color: "#036635",
            showCancelButton: true, 
            confirmButtonText: "네",
            cancelButtonText: "아니요",
            confirmButtonColor: "#3EA270",
            cancelButtonColor: "#3EA270",
            reverseButtons: true
        }).then(result => {
            if(result.isConfirmed) {
                // 카드 결제 페이지로 이동
            }
            else if(result.dismiss === Swal.DismissReason.cancel) {
                // 뒤로가기
                window.history.back();
            }
        })
    };

    return (
        <>
            <MainTop/>
            <MainTopBar/>
            <div css={s.layout}>
                <div css={s.container}>
                    <button onClick={handleCancleOnClick}><FontAwesomeIcon icon={faXmark} /></button>
                    <p>주문 결제</p>
                    <div css={s.menuContainer}>
                        <div css={s.menuInfo}>
                            <div css={s.productInfo}>
                                <p>자몽허니블랙티</p>
                                <p>ICE, VENTI, 덜 달게, 얼음 많이</p>
                            </div> 
                            <div css={s.productPrice}>
                                <p>1개</p>
                                <p>100,000원</p>
                            </div>
                        </div>
                        <div css={s.menuInfo}>
                            <div css={s.productInfo}>
                                <p>자몽허니블랙티</p>
                                <p>ICE, VENTI, 덜 달게, 얼음 많이</p>
                            </div> 
                            <div css={s.productPrice}>
                                <p>1개</p>
                                <p>100,000원</p>
                            </div>
                        </div>
                        <div css={s.menuInfo}>
                            <div css={s.productInfo}>
                                <p>자몽허니블랙티</p>
                                <p>ICE, VENTI, 덜 달게, 얼음 많이</p>
                            </div> 
                            <div css={s.productPrice}>
                                <p>1개</p>
                                <p>100,000원</p>
                            </div>
                        </div>
                        <div css={s.menuInfo}>
                            <div css={s.productInfo}>
                                <p>자몽허니블랙티</p>
                                <p>ICE, VENTI, 덜 달게, 얼음 많이</p>
                            </div> 
                            <div css={s.productPrice}>
                                <p>1개</p>
                                <p>100,000원</p>
                            </div>
                        </div>
                        <div css={s.menuInfo}>
                            <div css={s.productInfo}>
                                <p>자몽허니블랙티</p>
                                <p>ICE, VENTI, 덜 달게, 얼음 많이</p>
                            </div> 
                            <div css={s.productPrice}>
                                <p>1개</p>
                                <p>100,000원</p>
                            </div>
                        </div>
                        <div css={s.menuInfo}>
                            <div css={s.productInfo}>
                                <p>자몽허니블랙티</p>
                                <p>ICE, VENTI, 덜 달게, 얼음 많이</p>
                            </div> 
                            <div css={s.productPrice}>
                                <p>1개</p>
                                <p>100,000원</p>
                            </div>
                        </div>
                        <div css={s.menuInfo}>
                            <div css={s.productInfo}>
                                <p>자몽허니블랙티</p>
                                <p>ICE, VENTI, 덜 달게, 얼음 많이</p>
                            </div> 
                            <div css={s.productPrice}>
                                <p>1개</p>
                                <p>100,000원</p>
                            </div>
                        </div>
                        <div css={s.menuInfo}>
                            <div css={s.productInfo}>
                                <p>자몽허니블랙티</p>
                                <p>ICE, VENTI, 덜 달게, 얼음 많이</p>
                            </div> 
                            <div css={s.productPrice}>
                                <p>1개</p>
                                <p>100,000원</p>
                            </div>
                        </div>
                        
                    </div>
                    <div css={s.totalCount}>
                        <p>합계</p>
                        <div>
                            <p>1 개</p>
                            <p>100,000원</p>
                        </div>
                    </div>
                    <div css={s.buttons}>
                        <button onClick={handlePointOnClick}>포인트 결제</button>
                        <button onClick={handleCardOnClick}>카드 결제</button>
                    </div>
                </div>
            </div>
            <MainFooter/>
        </>
    )
}

export default PayMentPage;