import { css } from "@emotion/react";
import { COLORS } from "../../constants/colors";

export const layout = css`
    box-sizing: border-box; 
    margin: 0 auto;
    border-right: 1px solid ${COLORS.lineColor};
    border-left: 1px solid ${COLORS.lineColor};
    width: 80vh;
    height: 558px;
`;