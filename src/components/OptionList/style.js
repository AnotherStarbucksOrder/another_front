import { css } from "@emotion/react";
import { COLORS } from "../../constants/colors";

export const optionDetail = css`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    margin-top: 40px;
    height: 75%;

    & p {
        margin: 0;
    }
`;

export const options = css`
    align-items: center;
    margin-left: 20px;
    margin-bottom: 40px;
    width: 800px;
    height: 70px;

    & > p {
        width: 240px;
        font-size: 30px;
        font-weight: 600;
    }
`;

export const buttons = css`
    width: 600px;
    height: 100%;

    & > button {
        width: 170px;
        border: 1px solid ${COLORS.main};
        border-right: none;
        font-size: 24px;
        font-weight: 500;
        background-color: ${COLORS.mainBackground};

        &:nth-of-type(1) {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }

        &:nth-last-of-type(1) {
            border-right: 1px solid ${COLORS.main};
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
        }
    }
`;

export const activeButton = css`
    color: ${COLORS.buttonFontColor};
    background-color: ${COLORS.main} !important
`;