import React from 'react'
import MainTop from '../../components/MainTop/MainTop'
import MainTopBar from '../../components/MainTopBar/MainTopBar'
import MainFooter from '../../components/MainFooter/MainFooter'
/** @jsxImportSource @emotion/react */
import * as s from './style';


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