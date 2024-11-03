import { css } from "@emotion/react";
import { COLORS } from "../../constants/colors";

export const layout = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    
    & > p {
        align-self: center;
        font-size: 35px;
        font-weight: 600;
    }

    & div {
        display: flex;
    }

    & > button {
        margin: 0 auto;
        margin-top: 20px;
        border-radius: 8px;
        width: 200px;
        height: 80px;
        font-size: 28px;
        font-weight: 600;
        color: ${COLORS.buttonFontColor};
        background-color: ${COLORS.buttonColor};
        cursor: pointer;
    }
`;

export const productContainer = css`
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const productInfo = css`
    padding-bottom: 10px;
    align-items: center;
    border-bottom: 2px solid #f5f5f5;

    & > p:nth-last-of-type(1) {
        width: 150px;
        font-size: 25px;
        font-weight: 600;
        text-align: center;
    }
`;

export const productDetailInfo = css`
    width: 650px;

    & > img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    & > div {
        flex-direction: column;
        justify-content: space-around;
        margin-left: 40px;
        cursor: pointer;

        & > p {
            margin: 0;
        }

        & > p:nth-of-type(1) {
            font-size: 25px;
            font-weight: 600;
        }

        & > p:nth-last-of-type(1) {
            font-size: 18px;
        }
    }
`;