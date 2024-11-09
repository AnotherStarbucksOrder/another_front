import { css } from "@emotion/react";
import { COLORS } from "../../constants/colors";

export const layout = css`
    position: absolute;
    top: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
    background-color: #dbdbdb;
`;

export const titleBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 270px;

    & p {
        margin: 0;
        font-size: 35px;
        font-weight: 600;
    }
`;

export const buttonContainer = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 100%;
    

    & button {
        box-sizing: border-box;
        border: 1px solid ${COLORS.main};
        border-radius: 8px;
        width: 260px;
        height: 80px;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
            background-color: ${COLORS.buttonHoverColor};
        }

        &:active{
            background-color: ${COLORS.buttonActiverColor};
        }
    }
`;