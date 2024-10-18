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

    & p {
        padding-left: 100px;
        font-size: 40px;
        font-weight: 600;

    }
`;

export const imgContainer = css`
    box-sizing: border-box;
    display: flex;
    padding-left: 200px;
    padding-top: 100px;
    width: 100%;
    height: 100%;
`;

export const imgBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    width:400px;

    & input {
        display: none;
    }
`;

export const img = css`
    box-sizing: border-box;
    width: 250px;
    height: 250px;

    & img {
        width: 100%;
        height: 100%;
    }
`;

export const infoContainer = css`
    box-sizing: border-box;
    width: 800px;
    height: 100%;
`;

export const infoBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 10px;
    width: 100%;
    height: 100px;
`;

export const option = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%; /* 부모의 너비를 모두 사용 */
`;
export const optionTitle = css`
    box-sizing: border-box;
    width: 75px;
`;

export const select = css`
    flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
    padding-left: 10px;
`;

export const input = css`
    flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
    margin-left: 10px; /* p 태그와의 간격 설정 */
    padding-left: 10px;
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
        &:nth-of-type(2) {
            margin-right: 30px;
        }
    }
`;
