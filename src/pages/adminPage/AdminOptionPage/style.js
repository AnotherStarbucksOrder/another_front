import { css } from "@emotion/react";
import { COLORS } from "../../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    padding-left: 300px;
    width: 100%;
    height: 100%;
`;

export const titleBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 150px;
    border-bottom: 1px solid ${COLORS.lineColor};

    & p {
        padding-left: 100px;
        font-size: 40px;
        font-weight: 600;

    }
`;

export const functionBox = css`
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
`;

export const searchBox = css`
    display: flex;
    align-items: center;
    width: 100px;

    & select, & input {
        flex-grow: 1;
        text-align: center;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }
`;

export const tableButton = css`
    box-sizing: border-box;
    padding: 10px;
    border: none;
    cursor: pointer;
    width: 100%;
    background-color: white;

        &:active {
            background-color: #f0f0f0;
        }

`;

export const buttonBox = css`
    display: flex;
    align-items: center;
    border-radius: 8px;
    background-color: #f0f0f0;

    & button {
        padding: 10px;
        border: none;
        cursor: pointer;

        &:hover {
            background-color: #cecece;
        }

        &:active {
            background-color: #bdbdbd;
        }

        &:nth-of-type(1) {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }

        &:nth-last-of-type(1) {
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
        }
    }

    & div{
        width: 1px;
        height: 30px;
        background-color: #ccc;
        margin: 0;
    }
`;

export const tableLatout = css`
    box-sizing: border-box;
    padding: 0 20px;
    height: 800px; 
    width: 100%;
    

    & table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed; 
    }

    & th, & td {
        padding: 12px;
        text-align: center;
        border: 1px solid #ddd;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /* border-bottom: 1px solid #ddd; */
    }

    & th {
        background-color: #f4f4f4;
        font-weight: bold;
        &:nth-of-type(1) {
            width: 10%;
        }
        &:nth-of-type(2) {
            width: 15%;
        }
        &:nth-of-type(3) {
            width: 5%;
        }
        &:nth-of-type(4) {
            width: 5%;
        }
        &:nth-of-type(5) {
            width: 5%;
        }
    }
`;

export const paginateContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;

    & > ul {
        list-style-type: none;
        display: flex;
        padding: 0;

        & > li {
            margin: 0px 5px;
        }

        & a {
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #dbdbdb;
            border-radius: 32px;
            padding: 0px 5px;
            min-width: 32px;
            height: 32px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
        }

        & .active {
            border-radius: 32px;
            background-color: #bbbbbb;
            color: #ffffff;
        }
    }
`;