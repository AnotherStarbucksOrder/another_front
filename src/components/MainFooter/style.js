import { css } from "@emotion/react";
import { COLORS, SIZE } from "../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto;
    padding: 0px 12px;
    width: ${SIZE.width};
    height: calc(${SIZE.height}* 0.25);
    background-color: ${COLORS.main};

    & div {
        display: flex;
    }

    & button {
        cursor: pointer;
    }
`;

export const orderContainer = css`
    flex-direction: column;
    border-radius: 8px;
    width: 75%;
    height: 95%; 
    background-color: ${COLORS.mainBackground};

    & p {
        margin: 0;
    }

    & > p {
        margin: 10px 30px;
        font-size: 30px;
        font-weight: 600;
    }
`;

export const orderDetailContainer = css`
    flex-direction: column;
    height: 100%;
`;

export const orderDetail = css`
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 15px 0px;
    border-bottom: 1px solid #00000055;
    width: 93%;

    & p {
        margin: 0;
        font-size: 26px;
        font-weight: 600;
    }
`;

export const orderProduct = css`
    & > button {
        border: none;
        background-color: inherit;

        & > svg {
        margin-right: 20px;
        font-size: 30px;
        }   
    }
`;

export const countButtons = css`
    justify-content: space-between;
    align-items: center;
    width: 350px;

    & > button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: inherit;

        & > svg {
            font-size: 25px;
        }
    }
`;

export const totalContainer = css`
    flex-direction: column;
    justify-content: space-between;
    margin-left: 15px;
    width: 250px;
    height: 90%;

    & p {
        font-size: 26px;
        font-weight: 600;
    }
`;

export const totalCount = css`
    flex-direction: column;
    justify-content: space-around;
    height: 170px;

    & > p {
        margin: 0;
        font-size: 28px;
        font-weight: 600;
        color: ${COLORS.mainFontColor};
    }
`;



export const buttons = css`
    flex-direction: column;
    justify-content: space-between;
    height: 220px;

    & > button {
        border: none;
        border-radius: 8px;
        height: 85px;
        font-size: 30px;
        font-weight: 600;
        color: ${COLORS.buttonFontColor};
        background-color: ${COLORS.buttonColor};
    }
`;

