import React from 'react'
import MainTop from '../../components/MainTop/MainTop'
import MainTopBar from '../../components/MainTopBar/MainTopBar'
import MainFooter from '../../components/MainFooter/MainFooter'
/** @jsxImportSource @emotion/react */
import * as s from './style';

// 백엔드 쪽에서 데이터 가져와서 뿌려줌
function MainHomePage() {
    return (
    <>
        <MainTop />
        <MainTopBar />
        <div css={s.layout}>

        </div>
        <MainFooter />
    </>
    )
}

export default MainHomePage