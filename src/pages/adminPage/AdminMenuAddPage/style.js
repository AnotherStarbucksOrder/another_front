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

    & input:nth-of-type(1) {
        display: none;
    }
    & input:nth-of-type(2) {
        box-sizing: border-box;
        border: none;
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const img = css`
    box-sizing: border-box;
    width: 250px;
    height: 250px;

    & img {
        width: 100%;
        height: 100%;
        cursor: pointer;
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
    
    & > input {
        border: 1px solid ${COLORS.main};
        border-radius: 5px;
        outline: none;
    }

    & > textarea {
        border: 1px solid ${COLORS.main};
        border-radius: 5px;
        outline: none;
    }
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
