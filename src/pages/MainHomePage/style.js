import { css } from "@emotion/react";
import { COLORS, SIZE } from "../../constants/colors";

export const layout = css`
    box-sizing: border-box; 
    margin: 0 auto;
    border-right: 1px solid ${COLORS.lineColor};
    border-left: 1px solid ${COLORS.lineColor};
    width: ${SIZE.width};
    height: calc(${SIZE.height}* 0.60);
`;