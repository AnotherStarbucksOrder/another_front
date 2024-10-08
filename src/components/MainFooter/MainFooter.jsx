import React from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';

function MainFooter() {
    return (
        <div css={s.layout}>
            <div css={s.orderBox}>
                <div>Order Items</div>
                <div css={s.orderMenu}>
                <button>X</button>
                </div>
            </div>
            <div css={s.orderValue}>
                    <div css={s.totalCount}>
                    <div>총 수량: 15 개</div>
                    <div>총 금액: 15,000 원</div>
                    </div>
                <div css={s.buttons}>
                    <button>전체삭제</button>
                    <button>결제하기</button>
                </div>
            </div>
        </div>
    )
}

export default MainFooter;