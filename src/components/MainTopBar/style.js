import { css } from "@emotion/react";
import { COLORS } from "../../constants/colors";

// 메뉴 카테고리 
export const menuCategory = css`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 10px;
  height: 85px;
  width: 80vh;
  background-color: ${COLORS.main};

  & > button {
    cursor: pointer;
  }
`;

// 각 메뉴 버튼들 
export const menuButtons = css`
  display: flex;
  gap: 10px; // gap을 사용하면 행과 열 사이의 간격 쉽게 조절 가능

  & button { 
    border: none;
    border-radius: 10px;
    width: 130px;
    height: 60px;
    font-size: 20px;
    font-weight: 600;
    color: ${COLORS.buttonFontColor};
    background-color: ${COLORS.buttonColor};
    cursor: pointer;
  }
`;

// > 오른쪽 버튼 
export const rightButton = css`
  margin-right: 10px;
  border: none;
  background-color: inherit;

  svg {
    font-size: 40px;
    color: ${COLORS.buttonFontColor};
  }
`;

// > 왼쪽 버튼 
export const leftButton = css`
  margin-left: 10px;
  border: none;
  background-color: inherit;

  svg {
    font-size: 40px;
    color: ${COLORS.buttonFontColor};
  }
`;