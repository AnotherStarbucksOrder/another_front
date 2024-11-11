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
    justify-content: space-around;
    height: 100%;
`;

export const container = css`
    box-sizing: border-box;
    flex-grow: 1;
    width: 100%;
    height: 800px;
`;

export const infoContainer = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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
    width: 100%; 
    margin-bottom: 50px;

    & > p {
        font-weight: 600;
    }

    & > input {
        border: 1px solid ${COLORS.main};
        border-radius: 5px;
        height: 40px;
    }
`;

export const optionTitle = css`
    text-align: center;
    width: 90px;

    & > p {
        font-weight: 600;
    }
`;

export const selectContainer = css`
    flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
    margin-left: 10px; /* p 태그와의 간격 설정 */
    padding-left: 10px;
`;

export const radioBox = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 550px;
`;


export const registerContainer = css`
    box-sizing: border-box;
    height: 330px;

    & button {
        cursor: pointer;
    }
`;

export const registerMenu = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 2px solid #4D4D4D55;

    & p {
        margin: 0;
        padding-left: 10px;
        font-size: 20px;
        font-weight: 600;
    }
`;

export const menuContainer = css`
    box-sizing: border-box;
    /* border-bottom: 3px solid ${COLORS.lineColor}; */
    height: 250px;
    overflow-y: auto;
`;


export const menuBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 15px;
    padding-bottom: 3px;
    border-bottom: 1px solid ${COLORS.lineColor};

    & p {
        margin: 0;
        padding: 10px 10px;
    }
`;


export const buttonBox = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    width: 400px;

    & button {
        margin-top: 20px;
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
