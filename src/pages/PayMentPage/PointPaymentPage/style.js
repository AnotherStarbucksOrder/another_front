import { css } from "@emotion/react";
import { COLORS, SIZE } from "../../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    border: 1px solid ${COLORS.lineColor};
    width: ${SIZE.width};
    height: calc(${SIZE.height}* 0.85);

    & button {
        border: none;
        cursor: pointer;
    }

    & div {
        display: flex;
    }


    & > button {
        align-self: flex-end;
        margin: 15px 15px 20px 0px;
        background-color: inherit;

        & > svg {
        color: ${COLORS.main};
        font-size: 60px;
        }
    }
`;


export const container = css`
    flex-direction: column;
    margin-top: 40px;
    height: 100%;

    & > button {
        align-self: center;
        width: 400px;
        height: 100px;
        font-size: 50px;
        font-weight: 600;
        border-radius: 10px;
        color: ${COLORS.buttonFontColor};
        background-color: ${COLORS.buttonColor};
    }
`;  

export const point = css`
    flex-direction: column;
    align-items: center;
    height: 1000px;

    & > p {
        font-size: 60px;
        font-weight: 600;
        color: ${COLORS.main};
    }

    & > p:nth-last-of-type(1) {
        font-size: 40px;
        font-weight: 400;
        color: ${COLORS.lineColor};
    }
`;

export const buttons = css`
    justify-content: space-around;
    width: 100%;

    & > p {
        font-size: 50px;
        font-weight: 600;
    }

    & > button {
        background-color: inherit;
        & > svg {
            font-size: 60px;
        }
    }
`;

export const totalCount = css`
    height: 300px;
    background-color: bisque;
    
`;