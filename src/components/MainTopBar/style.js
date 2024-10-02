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
  height: 80px;
  width: 80vh;
  background-color: ${COLORS.main};
`;

// 각 메뉴 버튼들 
export const menuButtons = css`
  display: flex;

  & button { 
    margin-right: 10px;

    &:last-of-type{
      margin-right: 0;
    }
  }
`;

// > 오른쪽 버튼 
export const rightButton = css`
  background-color: inherit;
  border: none;
  margin-right: 10px;

  svg {
    color: #ffffff;
    font-size: 30px;
  }
`;

// > 왼쪽 버튼 
export const leftButton = css`
  background-color: inherit;
  border: none;
  margin-left: 10px;

  svg {
    color: #ffffff;
    font-size: 30px;
  }
`;