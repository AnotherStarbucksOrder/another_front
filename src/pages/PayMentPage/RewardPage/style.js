import { css } from "@emotion/react";
import { COLORS, SIZE } from "../../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: ${SIZE.width};
    height: calc(${SIZE.height}* 0.85);
    border: 1px solid ${COLORS.lineColor};
    border-top: none;
    
    & div {
        display: flex;
    }

    & button {
        border: none;
        cursor: pointer;
    }

    & > button {
        align-self: flex-end;
        margin: 15px 15px 0px 0px;
        background-color: inherit;

        & > svg {
            font-size: 60px;
            color: ${COLORS.main};
        }
    }
`;


export const container = css`
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 85%;

`;

export const phoneNumber = css`
    flex-direction: column;
    align-items: center;

    & > p {
        font-size: 60px;
        font-weight: 600;
        color: ${COLORS.main};
    }

    & > input {
        box-sizing: border-box;
        border-radius: 10px;
        text-align: center;
        border: 2px solid ${COLORS.main};
        outline: none;
        font-size: 60px;
        width: 750px;
        height: 100px;
    }
`;

export const numberPad = css`
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    height: 55%;
    width: 750px;
    
    & > button {
        border: 1px solid ${COLORS.main};
        border-radius: 8px;
        font-size: 50px;
        font-weight: 600;
        width: 230px;
        height: 150px;
        background-color: ${COLORS.mainBackground};

        &:active {
            color: ${COLORS.buttonFontColor};
            background-color: ${COLORS.main};
        }
    }
`;