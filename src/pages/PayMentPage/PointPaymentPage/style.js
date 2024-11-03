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

    & > p:nth-of-type(1) {
        text-align: center;
        font-size: 60px;
        font-weight: 600;
        margin-top: 0;
    }
`;

export const container = css`
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    ::-webkit-scrollbar {
        display: none;
    }

    & > button {
        margin: 0 auto;
        margin-top: 25px;
        border-radius: 8px;
        width: 300px;
        height: 90px;
        font-size: 40px;
        font-weight: 600;
        color: ${COLORS.buttonFontColor};
        background-color: ${COLORS.buttonColor};
    }

    & > div {
        flex-direction: column;
        margin: 0 auto;
        overflow-y: auto;
        ::-webkit-scrollbar {
            display: none;
        }
        width: 80%;
        height: 85%;
    }
`;

export const couponInfo = (isUsed) => css`
    align-items: center;
    margin-bottom: 20px;
    padding-left: 10px;
    border: 3px solid #F1EFE8;
    border-radius: 10px;
    background-color: ${isUsed ? '#d3d3d3' : 'white'};
    opacity: ${isUsed ? 0.6 : 1};
    cursor: pointer;

    & > img {
        width: 200px;
        height: 170px;
    }
`;

export const couponDetail = css`
    flex-direction: column;
    align-items: center;
    margin-left: 30px;
    width: 550px;

    & > p {
        font-size: 18px;
    }

    & > p:nth-last-of-type(2) {
        font-size: 20px;
        font-weight: 600;
    }
`;
