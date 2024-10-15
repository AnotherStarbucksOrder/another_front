import { css } from "@emotion/react";
import { COLORS, SIZE } from "../../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    border: 1px solid ${COLORS.lineColor};
    width: ${SIZE.width};
    height: calc(${SIZE.height}* 0.85);

    & div {
        display: flex;
    }

    & button {
        border: none;
        cursor: pointer;
    }

    & > button {
        align-self: flex-end;
        margin: 15px 15px 20px 0px;
        background-color: inherit;

        & > svg {
            color: ${COLORS.main};
            font-size: 60px;
        }
    }
`;


export const point = css`
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    width: 100%;
    height: 60%;


    & > p {
        font-size: 50px;
        font-weight: 600;
    }

    & > p:nth-last-of-type(1) {
        font-size: 35px;
        font-weight: 400;
    }

    & > div {
        justify-content: space-between;
        align-items: center;
        width: 800px;
        height: 200px;

        & > p {
            margin: 0;
            font-size: 50px;
            font-weight: 600;
        }

        & > button {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: inherit;

            & > svg {
                font-size: 45px;
            }
        }
    }
`;


export const totalCount = css`
    flex-direction: column;
    align-items: center;
    background-color: aqua;

    & > div {
        border: 1px solid black;
    }
`;
