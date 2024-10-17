import { css } from "@emotion/react";
import { COLORS, SIZE } from "../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    width: ${SIZE.width};
    height: ${SIZE.height};
    background-color: ${COLORS.main};
`;

export const logo = css`
    text-align: center;

    & > img {
        width: 750px;
        height: 750px;
    }

    & > div {
        margin-top: 60px;
        font-size: 85px;
        font-weight: 900;
    }
`;

export const buttons = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 80px;

    & > button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 40px;
        border: none;
        border-radius: 10px;
        width: 400px;
        height: 300px;
        font-size: 50px;
        font-weight: 600;
        background-color: ${COLORS.mainBackground};
        cursor: pointer;

        &:hover {
        box-shadow: 10px 10px 10px ${COLORS.hoverColor};
        }

        &:active {
        background-color: ${COLORS.buttonColor};
        }

        & > svg {
        font-size: 60px;
        }
    }
`;