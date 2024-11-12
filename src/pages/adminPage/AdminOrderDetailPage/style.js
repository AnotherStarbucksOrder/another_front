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
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
    width: 100%;
`;

export const infoContainer = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 600px;
    height: 800px;
`;

export const order = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${COLORS.main};
    border-radius: 5px;
    width: 100%; 
    height: 100%;

    & > p {
        font-size: 18px;
        font-weight: 600;
    }

    & > div:nth-last-of-type(1) {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;

        & > p {
            font-size: 18px;
            font-weight: 600;
        }
    }
`;

export const orderDetail = css`
    box-sizing: border-box;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 5px;
    width: 550px;
    border-bottom: 1px solid #ddd;
    text-align: center;

    & p { 
        margin-top: 0;
        font-size: 18px;
        font-weight: 600;
    }  
`;

export const orderMenu = css`
    padding-bottom: 5px;
    width: 550px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    
    overflow-y: auto;
    ::-webkit-scrollbar{
        display: none;
    }

    & p {
        margin-top: 0;
        font-size: 18px;
        font-weight: 600;
    }  
`;

export const orderList = css`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 500px;
`;

export const menuName = css`
    display: flex;
    justify-content: baseline;
    width: 400px;
    text-align: start;
`;

export const buttonBox = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    width: 400px;

    & button {
        margin-top: 30px;
        border-radius: 4px;
        border: none;
        width: 100px;
        height: 40px;
        font-size: 17px;
        font-weight: 600;
        background-color: ${COLORS.buttonColor};
        color: ${COLORS.buttonFontColor};
        cursor: pointer;
    }
`;