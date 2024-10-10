import { css } from "@emotion/react";
import { COLORS } from "../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border-right: 1px solid ${COLORS.lineColor};
    border-left: 1px solid ${COLORS.lineColor};
    width: 80vh;
    height: 558px;
`;

export const container = css`
    border-radius: 5px;
    width: 740px;
    height: 530px;
    background-color: ${COLORS.menuBackgroundColor};
`;

export const remove = css`
    display: flex;
    justify-content: flex-end;
    
    button {
        border: none;
        background-color: inherit;
        cursor: pointer;
        & svg {
            font-size: 30px;
        }
    }
`;

export const menuContainer = css`
    display: flex;
    justify-content: space-around;

    & img {
        width: 200px;
        height: 200px;
    }
`;

export const menuInfo = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 350px;
    text-align: center;

    & div:nth-of-type(1) {
        & p:nth-of-type(1) {
            font-size: 24px;
            font-weight: 600;
            margin-top: 0;
        }

        & p:nth-last-of-type(1) {
            display: block;
            font-size: 14px; 
            width: 350px;
            margin-bottom: 0;
        }
    }
`;

export const buttons = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    & p {
        font-size: 24px;
        font-weight: 600;
    }

    & button {
        border: none;
        background-color: inherit;
        align-self: center;
        cursor: pointer;
        
        & svg {
            font-size: 24px;
            vertical-align: middle;
        }
    }

    & span {
        display: inline-block;
        text-align: center; 
        font-size: 20px;
        min-width: 40px; 
        vertical-align: bottom;
    }
`;

export const option = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > button {
        border: none;
        border-radius: 8px;
        font-size: 18px;
        font-weight: 600;
        width: 150px;
        height: 45px;
        color: ${COLORS.buttonFontColor};
        background-color: ${COLORS.buttonColor};
        cursor: pointer;

        &:active {
            background-color: ${COLORS.main};
        }
    }

`;

export const optionContainer = css`
    margin: 10px 0px 10px ;
    overflow-y: auto;
    width: 500px;
    height: 210px;
    
    ::-webkit-scrollbar {
        width: 15px;  
        height: 20px;  
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${COLORS.menuBackgroundColor};
    }
`;

export const optionInfo = css`
    display: flex;
    align-items: center;

    & p {
        font-size: 20px;
        font-weight: 600;
    }

    & div:nth-of-type(1) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
    }

    & button {
        border: none;
        color: ${COLORS.mainBackground};
        background-color: ${COLORS.optionButtonColor};
        cursor: pointer;
        width: 100px;
        height: 45px;
        border-right: 1px solid ${COLORS.mainBackground};

        &:nth-of-type(1) {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }

        &:nth-last-of-type(1) {
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            border: none;
        }

        &:active {
            background-color: ${COLORS.optionButtonActiveColor};
        }
    }
`;





