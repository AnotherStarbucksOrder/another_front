import { css } from "@emotion/react";
import { COLORS } from "../../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    padding-top: 40px;
    padding-left: 300px;
    width: 100%;
    height: 100%;
`;

export const container = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    width: 100%;
    height: 450px;
`;

export const salesTableBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 420px;
    border: 1px solid #ddd;
    padding: 20px; /* 내부 여백 추가 */
`;

export const selectedYear = css`
    & select {
        width: 85px;
        height: 40px;
        border-radius: 10px;
        text-align: center;
    }
`;

export const toggleContainer = css`
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 20px; /* 둥근 모서리 */
    overflow: hidden; /* 둥근 모서리 효과 */
`;


export const salesInfoBox = css`
    box-sizing: border-box;
    width: 200px;
    height: 200px;
    /* border: 1px solid #ddd; */
    margin-left: 30px;
    & img {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

`;


export const toggleButton = css`
    flex: 1; /* 버튼이 동일한 크기로 확장 */
    padding: 10px;
    cursor: pointer; /* 커서 모양 변경 */
    text-align: center; /* 텍스트 가운데 정렬 */
    font-weight: bold; /* 텍스트 굵게 */
    transition: background-color 0.3s ease; /* 배경색 전환 효과 */;
`;

export const activeButton = css`
    background-color: ${COLORS.buttonColor}; /* 선택된 버튼 배경색 */
    color: white; /* 선택된 버튼 텍스트 색상 */
`;

export const inactiveButton = css`
    background-color: white; /* 비선택 버튼 배경색 */
    color: black; /* 비선택 버튼 텍스트 색상 */
`;

export const tableLayout = css`
    width: 100%;
    border-collapse: collapse; /* 테이블 경계 겹침 처리 */
    margin-top: 20px; /* 테이블과 라디오 버튼 간격 */
    
    th, td {
        padding: 10px; /* 셀 패딩 */
        border: 1px solid #ddd; /* 셀 테두리 */
        text-align: center;
    }

    th {
        background-color: #f8f9fa; /* 헤더 배경색 */
    }
`;

export const bottomContainer = css`
    display: flex;
    justify-content: space-between;
    width: 95%;
`;

export const menuInfoBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 900px;
    height: 420px;
    border: 1px solid #ddd;
`;


export const chartInfoBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 420px;
    border: 1px solid #ddd;
    /* margin-left: 30px; */
`;