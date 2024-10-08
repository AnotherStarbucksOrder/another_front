import { css } from "@emotion/react";
import { COLORS } from "../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    width: 80vh;
    height: 100%;
    background-color: ${COLORS.main};
`;

export const logo = css`
    text-align: center;

    img {
        width: 450px;
        height: 450px;
    }

    div {
        margin-top: 30px;
        font-size: 50px;
        font-weight: 900;
    }
`;

export const buttons = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 70px;
    width: 100%;

    button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 40px;
        border: none;
        border-radius: 10px;
        width: 250px;
        height: 200px;
        font-size: 24px;
        cursor: pointer;

        &:hover {
        box-shadow: 10px 10px 10px ${COLORS.hoverColor};
        }

        &:active {
        background-color: ${COLORS.buttonColor};
        }

        & > svg {
        font-size: 40px;
        }
    }
`;