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

export const optionLayout = css`
    padding: 20px;
`;

export const sizeContainer = css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
`;

export const sizeOption = (isSelected) => css`
    background-color: ${isSelected ? '#e0e0e0' : 'white'};
    border: 1px solid ${isSelected ? '#999' : '#ccc'};
    padding: 10px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s;
    &:nth-of-type(1) {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    &:nth-last-of-type(1) {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
`;
