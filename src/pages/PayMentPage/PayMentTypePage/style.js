import { css } from "@emotion/react";
import { COLORS, SIZE } from "../../../constants/colors";


export const layout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border: 1px solid ${COLORS.lineColor};
    border-top: none;
    width: ${SIZE.width};
    height: calc(${SIZE.height}* 0.85);

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

export const container = css`
    flex-direction: column;
    width: 100%;
    height: 100%;

    & > button {
        margin: 15px 15px 0px 0px;
        align-self: flex-end;
        border: none;
        background-color: inherit;

        & > svg {
            color: ${COLORS.main};
            font-size: 60px;
        }
    }

    & > p {
        padding-bottom: 40px;
        text-align: center;
        font-weight: 600;
        font-size: 60px;
    }
`;


export const menuContainer = css`
    flex-direction: column;
    margin-bottom: 40px;
    width: 100%;
    height: 950px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;


export const menuInfo = css`
    justify-content: space-between;
    margin: 0 auto;
    padding: 20px;
    width: 85%;
    border-bottom: 1px solid ${COLORS.lineColor};

    &:nth-last-of-type(1) {
        border-bottom: none;
    }

    & p {
        font-size: 34px;
        font-weight: 600;
    }
`;

export const productInfo = css`
    flex-direction: column;
    width: 550px;

    & > p:nth-last-of-type(1) {
        margin-top: 5px;
        font-size: 24px;
        font-weight: 500;
    }
`;

export const productPrice = css`
    justify-content: space-between;
    align-items: center;
    width: 330px;

    & > p:nth-last-of-type(1) {
        color: ${COLORS.main};
    }
`;

export const bottom = css`
    flex-direction: column;
    justify-content: space-around;
    height: 350px;
`;

export const totalCount = css`
    align-items: center;
    margin: 0 auto;
    padding: 0 30px;
    border-radius: 8px;
    height: 120px;
    width: 88%;
    background-color: #f5f5f5;

    & > p {
        width: 600px;
        font-size: 40px;
        font-weight: 600;
        padding-left: 10px;
    }

    & > div {
        justify-content: space-between;
        width: 370px;
        padding-right: 10px;

        & > p {
            font-size: 35px;
            font-weight: 600;
        }

        & > p:nth-last-of-type(1) {
            color: ${COLORS.main};
        }
    }
`;

export const buttons = css`
    justify-content: space-around;
    align-items: center;
    margin: 0px auto;
    width: 80%;

    & > button {
        border: none;
        border-radius: 10px;
        background-color: ${COLORS.buttonColor};
        color: ${COLORS.buttonFontColor};
        font-size: 35px;
        font-weight: 600;
        width: 280px;
        height: 100px;
    }
`;
