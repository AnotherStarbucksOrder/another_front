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
    height: 150px;
    border-bottom: 1px solid ${COLORS.lineColor};
    background-color: white;

    & p {
        padding-left: 100px;
        font-size: 40px;
        font-weight: 600;
    }
`;

export const Container = css`
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
    border: 1px solid ${COLORS.lineColor};
    width: 100%; /* 부모의 너비를 모두 사용 */
    height: 100%;
`;

export const orderDetail = css`
    box-sizing: border-box;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 5px;
    width: 550px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    & p{
        margin-top: 0;
        font-size: 18px;
        font-weight: 600;
    }  

`;

export const orderMenu = css`
    box-sizing: border-box;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 5px;
    width: 550px;
    text-align: center;
    height: 170px;
    border-bottom: 1px solid #ddd;
    overflow-y: auto;
    ::-webkit-scrollbar{
        display: none;
    }
    & p{

        margin-top: 0;
        font-size: 18px;
        font-weight: 600;
    }  
`;

export const orderList = css`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 400px;
`;
export const menuName = css`
    display: flex;
    justify-content: baseline;
    width: 350px;
`;


export const buttonBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    & button {
        margin-top: 20px;
        background-color: #fff;
        border-radius: 4px;
        width: 60px;
        height: 35px;
        font-size: 17px;
        font-weight: 600;

        &:hover {
            background-color: #f0f0f0;
        }
        &:active{
            background-color: #c0c0c0;
        }

        &:nth-of-type(1) {
            margin-right: 30px;
        }

    }
`;