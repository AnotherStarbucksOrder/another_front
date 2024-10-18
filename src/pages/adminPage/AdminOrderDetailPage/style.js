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
    padding-top: 60px;
    width: 100%;
`;

export const infoContainer = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
`;

export const infoBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0 0 60px;
    width: 100%;
    height: 100px;

    &:nth-last-of-type(1) {
        margin-top: 50px;
    }
`;

export const option = css`
    box-sizing: border-box;
    border: 1px solid ${COLORS.lineColor};
    width: 100%; /* 부모의 너비를 모두 사용 */
`;

export const optionTitle = css`
    box-sizing: border-box;
    width: 75px;
`;

export const selectContainer = css`
    flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
    margin-left: 10px; /* p 태그와의 간격 설정 */
    padding-left: 10px;
`;

export const orderTitle = css`
    box-sizing: border-box;
    width: 75px;
`;

export const orderList = css`
    box-sizing: border-box;
    border: 1px solid ${COLORS.lineColor}; /* 내용에 대한 테두리 색상 */
    flex-grow: 1; 
    margin: 75px 60px 0 10px; /* p 태그와의 간격 설정 */
    padding-left: 10px;
    border-radius: 4px; /* 모서리 둥글게 */
    width: 300px; /* 부모의 너비를 모두 차지하도록 설정 */
    height: 100px;
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