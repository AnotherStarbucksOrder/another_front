import { css } from "@emotion/react";
import { COLORS } from "../../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    padding-left: 300px;
    width: 100%;
    height: 100%;
`;

export const titleBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;

export const container = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const saleContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-top: 40px;
    width: 500px;
    height: 900px;
`;

export const saleInfoTitle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: white;

    & > img {
        margin-right: 10px;
        width: 100px;
        height: 80px;
    }

    & > p {
        font-size: 40px;
        font-weight: 600;
    }
`;

export const totalSales = css`
    display: flex;
    flex-direction: column;
    border: 1px solid #dbdbdb;
    width: 100%;
    max-height: 600px; 
    overflow-y: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`; 

export const totalPriceBox = css`
    padding-top: 30px;

    & > p {
        margin: 0;
        text-align: center;
        font-size: 24px;
        font-weight: 600;
    }
`;

export const orderTypeBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;

    & > p {
        font-size: 20px;
        font-weight: 600;
    }
`;

export const typeTitle = css`
    box-sizing: border-box;
    padding-top: 50px;

    & > p {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
    }
`;

export const priceBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const buttonBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    & > button {
        margin-top: 20px;
        border-radius: 4px;
        width: 80px;
        height: 40px;
        font-size: 17px;
        font-weight: 600;
        border: none;
        color: ${COLORS.mainBackground};
        background-color: ${COLORS.buttonColor};
        cursor: pointer;
    }
`;