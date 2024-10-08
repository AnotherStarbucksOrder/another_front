import { css } from "@emotion/react";
import { COLORS } from "../../constants/colors";

export const layout = css`
    box-sizing: border-box; 
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding-left: 10px;
    width: 80vh;
    height: 260px;
    background-color: ${COLORS.main};
`;

export const orderBox = css`
    border-radius: 10px;
    width: 70%;
    height: 95%;
    background-color: ${COLORS.mainBackground};

    & div:nth-of-type(1) {
        margin: 0 auto;
        padding: 10px 20px;
        width: 90%;
        font-size: 20px;
        font-weight: 600;
        border-bottom: 1px solid ${COLORS.lineColor};
    }

    & div:nth-last-of-type(1) {
        padding: 10px;
    }
`;

export const orderValue = css`
    display: flex;
    flex-direction: column;
    align-items: center; 
    margin-left: 15px;
    height: 95%;
`;

export const totalCount = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80%;
    margin-top: 10px;
    color: ${COLORS.buttonFontColor};

    & div {
        font-size: 20px;
        font-weight: 600;
    }

    & div:nth-of-type(1) {
        padding-bottom: 10px;
        border-bottom: 1px solid ${COLORS.mainLineColor};
        width: 200px;
        text-align: center;
    }

    & div:nth-last-of-type(1) {
        padding-top: 10px;
    }
`;

export const orderMenu = css`
    button {
        border: none;
        font-size: 20px;
        font-weight: 600;
        background-color: inherit;
        cursor: pointer;
    }
`;

export const buttons = css`
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;

    button {
    border: none;
    border-radius: 10px;
    width: 200px;
    height: 60px;
    font-weight: 600; 
    font-size: 22px;
    color: ${COLORS.buttonFontColor};
    background-color: ${COLORS.buttonColor};
    cursor: pointer;
    }
`;
