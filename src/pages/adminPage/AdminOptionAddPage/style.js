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

export const Container = css`
    box-sizing: border-box;
    flex-grow: 1;
    width: 100%;
    height: 800px;
`;


export const infoContainer = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    padding-top: 80px;
    width: 800px;
    height: 100%;
`;

export const infoBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
    
`;

export const option = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%; /* 부모의 너비를 모두 사용 */
    margin-bottom: 50px;
`;

export const optionTitle = css`
    box-sizing: border-box;
    width: 90px;
`;

export const selectContainer = css`
    flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
    margin-left: 10px; /* p 태그와의 간격 설정 */
    padding-left: 10px;
`;

export const radioBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
    padding-right: 90px;  
`;
export const radio = css`
    padding-right: 80px;
`;

export const registerContainer = css`
    & button {
        cursor: pointer;
    }

`;

export const registerMenu = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 3px solid ${COLORS.lineColor};

    & p {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
    }

    & button {
        font-size: 30px;
        border: none;
        height: 35px;
        background-color: white;
    }
`;

export const menuBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid ${COLORS.lineColor};
    overflow: scroll;



    & button {
        font-size: 30px;
        border: none;
        width: 35px;
        height: 40px;
        background-color: white;
    }
`;

export const inputBox = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 700px;
    height: 40px;
    margin: 0 60px;

    & input {
        border: none;
        border-bottom: 1px solid ${COLORS.lineColor};
        text-align: right;
        width: 180px;
        height: 30px;
        
        &:nth-of-type(1) {
            text-align: center;
            margin-right: 60px;
        }
    }

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
