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

export const tableContainer = css`
    box-sizing: border-box;
    padding: 0 20px;
    width: 100%;
`;

export const tableLayout = css`
position: relative;
box-sizing: border-box;
border: 1px solid #ddd; /* 셀 테두리 추가 */
width: 100%;
max-height: 660px;
overflow-y: auto;

& table {
    box-sizing: border-box;
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;

    
}

& thead {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #f4f4f4; /* 헤더 배경 색상 */
}

& th, & td {
    box-sizing: border-box;
    height: 25px;
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ddd; /* 셀 테두리 추가 */
    border-right: 1px solid #ddd;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:nth-last-of-type(1) {
        border-right: none; 
    }
}

& th {
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

// 992-234-64
export const tableButton = css`
    box-sizing: border-box;
    border: none;
    cursor: pointer;
    width: 100%;
    background-color: white;

        &:active {
            background-color: #f0f0f0;
        }

`;

