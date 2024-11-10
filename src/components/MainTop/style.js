import { css } from "@emotion/react";
import { COLORS, SIZE } from "../../constants/colors";

export const layout = css`
    box-sizing: border-box; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 20px 20px;
    width: ${SIZE.width};
    height: calc(${SIZE.height}* 0.075);
    border-left: 1px solid ${COLORS.lineColor};
    border-right: 1px solid ${COLORS.lineColor};

    // icon이 svg임 
    & svg {
        font-size: 60px;
        color: ${COLORS.main};
        cursor: pointer;
    }
`;

export const titleBox = css`
    display: flex;
    justify-content: center;
    align-content: center;

    & > p {
        margin: 0;
        padding-top: 8px;
        font-size: 40px;
        font-weight: 900;
    }
`;

export const imgBox = css`
    width: 100px;
    height: 70px;
    
    & img {
        width: 100%;
        height: 100%;
    }
`;
