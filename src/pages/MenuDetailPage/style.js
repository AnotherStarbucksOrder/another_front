import { css } from "@emotion/react";
import { COLORS, SIZE } from "../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: ${SIZE.width};
    height: calc(${SIZE.height}* 0.60);
    border-left: 1px solid ${COLORS.lineColor};
    border-right: 1px solid ${COLORS.lineColor};

    & div {
        display: flex;
    }

    & button {
        border: none;
        cursor: pointer;
    }
`;

export const container = css`   
    flex-direction: column;
    width: 100%;
    height: 100%;

    & > button {
        align-self: flex-end;
        margin: 15px 15px 15px 0px;
        background-color: inherit;

        & > svg {
            color: ${COLORS.main};
            font-size: 60px;
        }
    }
`;

export const menuInfoContainer = css`
    justify-content: space-around;
    margin: 0 auto;
    width: 95%;

    & > img {
        border: 1px solid #00000055;
        border-radius: 10px;
        width: 450px;
        height: 350px;
    }
`;

export const menuInfoDetail = css`
    flex-direction: column;
    justify-content: space-around;
    margin-left: 40px;

    & p {
        margin: 0;
        font-size: 35px;
        font-weight: 600;
    }
`;

export const productNameInfo = css`
    flex-direction: column;
    align-items: center;
    height: 240px;
    text-align: center;

    & > p:nth-last-of-type(1) {
        margin-top: 25px;
        font-size: 22px;
        font-weight: 400;
    }
`;

export const productPriceInfo = css`
    justify-content: space-around;
    align-items: center;
    height: 90px;
`;

export const productCount = css`
    justify-content: space-between;
    width: 200px;
    
    & > button {
        display: flex;
        align-items: center;
        background-color: inherit;

        & > svg {
            font-size: 35px;
        }
    }
`;

export const optionInfoContainer = css`
    flex-direction: column;
    height: 100%;

    & > button {
        align-self: center;
        margin-top: 10px;
        border-radius: 8px;
        width: 250px;
        height: 75px;
        font-size: 35px;
        font-weight: 600;
        color: ${COLORS.buttonFontColor};
        background-color: ${COLORS.main};
    }
`;

