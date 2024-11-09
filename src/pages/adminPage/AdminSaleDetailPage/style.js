import { css } from "@emotion/react";
import { COLORS } from "../../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    padding-left: 300px;
    width: 100%;
    height: 100%;

`;

export const titleBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 125px;
    border-bottom: 1px solid ${COLORS.lineColor};
    background-color: white;

    & p {
        padding-left: 100px;
        font-size: 40px;
        font-weight: 600;
    }
`;

export const container = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const saleContainer = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${COLORS.lineColor};
    margin-top: 40px;
    padding: 10 0 30px;
    width: 500px;
    height: 750px;
    overflow: scroll;
`;

export const saleInfoTitle = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90px;
    border-bottom: 1px solid ${COLORS.lineColor};
    background-color: white;

    & p {
        font-size: 40px;
        font-weight: 600;
    }
`;

export const totalPriceBox = css`
    box-sizing: border-box;
    padding-top: 30px;

    & p {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
    }
`;

export const orderTypeBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 100px;
    width: 100%;
    height: 550px;
    overflow: auto;
    ::-webkit-scrollbar {
        display: none;
    }

    & p {
        font-size: 20px;
        font-weight: 600;
    }
`;

export const typeTitle = css`
    box-sizing: border-box;
    padding-top: 50px;

    & p {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
    }
`;

export const priceBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const buttonBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    & button {
        background-color: #fff;
        border-radius: 4px;
        margin: 15px 0;
        width: 60px;
        height: 35px;
        font-size: 17px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
            background-color: #f0f0f0;
        }
        &:active{
            background-color: #c0c0c0;
        }

    }
`;