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
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    width: 100%;
    height: 100%;
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
        height: 40px;
    }

    & > textarea {
        border: 1px solid ${COLORS.main};
        border-radius: 5px;
        outline: none;
        height: 50px;
    }
`;

export const optionTitle = css`
    box-sizing: border-box;
    width: 75px;
`;

export const selectContainer = css`
    flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
    margin-left: 10px; /* p 태그와의 간격 설정 */
    padding-left: 10px;
    resize: none;
`;


export const buttonBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 50px;

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
