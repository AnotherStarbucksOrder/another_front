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
    width: 100%; 
    
    & > input {
        outline: none;
        border: 1px solid ${COLORS.main};
        border-radius: 5px;
        height: 40px;
    }

    & > textarea {
        outline: none;
        border: 1px solid ${COLORS.main};
        border-radius: 5px;
        height: 60px;
    }
`;

export const optionTitle = css`
    box-sizing: border-box;
    width: 75px;
    text-align: center;

    & > p {
        font-size: 20px;
        font-weight: 600;
    }
`;

export const input = css`
    flex-grow: 1; 
    margin-left: 10px;
    padding-left: 10px;
    resize: none;
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
