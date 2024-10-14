import { css } from "@emotion/react";
import { COLORS, SIZE } from "../../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border-left: 1px solid ${COLORS.lineColor};
    border-right: 1px solid ${COLORS.lineColor} ;
    width: ${SIZE.width};
    height: calc(${SIZE.height}* 0.60);

    & div {
        display: flex;
    }

    & button { 
        cursor: pointer;
    }

    & p {
        margin: 0;
    }
`;