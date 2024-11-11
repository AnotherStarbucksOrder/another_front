import { css } from "@emotion/react";
import { COLORS } from "../../constants/colors";
import { Colors } from "chart.js";

export const layout = css`
    position: absolute;
    top: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
    border-right: 1px solid #03663555;
`;

export const titleBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 270px;

    & > a {
        & > img {
            width: 200px;
            height: 150px;
        }
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
    

    & > button {
        box-sizing: border-box;
        border: 1px solid ${COLORS.main};
        border-radius: 8px;
        width: 260px;
        height: 80px;
        font-size: 20px;
        font-weight: 600;
        background-color: ${COLORS.mainBackground};
        box-shadow: 5px 5px 5px #dddddd;
        cursor: pointer;
    }
`;

export const activeButton = css`
    border: none;
    color: ${COLORS.buttonFontColor};
    background-color: ${COLORS.main} !important;
`;