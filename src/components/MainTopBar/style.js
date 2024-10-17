import { css } from "@emotion/react";
import { COLORS, SIZE } from "../../constants/colors";

// 메뉴 카테고리 
export const menuCategory = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 10px;
    width: ${SIZE.width};
    height: calc(${SIZE.height}* 0.075);
    background-color: ${COLORS.main};

    & button {
        cursor: pointer;
    }

    & svg {
        font-size: 70px;
        color: ${COLORS.buttonFontColor};
    }
`;

// 각 메뉴 버튼들 
export const menuButtons = css`
    display: flex;
    gap: 32px; // gap을 사용하면 행과 열 사이의 간격 쉽게 조절 가능

    & > button { 
        border: none;
        border-radius: 10px;
        width: 200px;
        height: 100px;
        font-size: 30px;
        font-weight: 600;
        color: ${COLORS.buttonFontColor};
        background-color: ${COLORS.buttonColor};

        &:hover {
            background-color: ${COLORS.categoryActiveColor};
        }
    }
`;

// 오른쪽 or 왼쪽 버튼
export const button = (direction) => css`
    border: none;
    background-color: inherit;
    ${direction === 'left' ? 'margin-left: 10px' : 'margin-right: 10px'}
`;