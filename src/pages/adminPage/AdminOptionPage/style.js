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
    height: 125px;
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
        border-radius: 8px;
        cursor: pointer;

        &:hover {
            background-color: #cecece;
        }

        &:active {
            background-color: #bdbdbd;
        }
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