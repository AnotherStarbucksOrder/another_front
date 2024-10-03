import React from 'react'
import MainTop from './components/MainTop/MainTop'
import MainTopBar from './components/MainTopBar/MainTopBar'

// 컴포넌트들끼리 합치면 어떤 느낌인지 볼려고 만든 페이지 
// 추후 없앨 예정
function TestPage() {
  return (
    <>
      <MainTop/>
      <MainTopBar/>
    </>
  )
}

export default TestPage;