import { css } from "@emotion/react";
import { COLORS, SIZE } from "../../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    width: ${SIZE.width};
    height: calc(${SIZE.height}* 0.85);
    border: 1px solid ${COLORS.lineColor};
    border-top: none;

    & div {
        display: flex;
    }

    & > img {
        margin-bottom: 15px;
        height: 730px;
        border-radius: 15px;
    }

`;

export const totalCount = css`
    flex-direction: column;
    align-items: center;

    & > p {
        margin: 0;
        font-size: 35px;
        font-weight: 500;
    }

    & > p:nth-of-type(1),
    & > p:nth-last-of-type(1) {
        margin: 20px 0;
        font-size: 50px;
        font-weight: 600;
        color: ${COLORS.main};
    }

`;

export const buttons = css`
    justify-content: space-around;
    width: 100%;
    height: 150px;

    & > button {
        border: none;
        border-radius: 10px;
        width: 350px;
        height: 150px;
        font-size: 40px;
        font-weight: 600;
        color: ${COLORS.buttonFontColor};
        background-color: ${COLORS.buttonColor};
        cursor: pointer;
    }
`;


