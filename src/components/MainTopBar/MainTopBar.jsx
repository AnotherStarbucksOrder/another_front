import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function MainTopBar() {

  // 메뉴 목록을 상태로 관리
  const menus = ['Best Menu', 'Coffee', 'ColdBrew', 'Latte', 'Tea', 'Ade', 'Smoothie', 'Bakery'];
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0); 

  const handlePrevOnClick = () => {
    if (currentMenuIndex > 0) {
      setCurrentMenuIndex(currentMenuIndex - 1);
    }
  };

  const handleNextOnClick = () => {
    if (currentMenuIndex < menus.length - 4) {
      setCurrentMenuIndex(currentMenuIndex + 1);
    }
  };

  return (
    <div>
      <div css={s.menuCategory}>
          <button css={s.rightButton} onClick={handlePrevOnClick}><FaAngleLeft/></button>
          <div css={s.menuButtons}>
            {menus.slice(currentMenuIndex, currentMenuIndex + 4).map((menu, index) => (
              <button key={index}>{menu}</button>))
            }
          </div>
          <button css={s.leftButton} onClick={handleNextOnClick}><FaAngleRight/></button>
      </div>
    </div>
  )
}

export default MainTopBar;