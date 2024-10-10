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

export const imgContainer = css`
    box-sizing: border-box;
    display: flex;
    padding-left: 200px;
    padding-top: 100px;
    width: 100%;
    height: 100%;
`;

export const imgBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width:400px;
`;

export const img = css`
    box-sizing: border-box;
    width: 250px;
    height: 250px;

    & img {
        width: 100%;
        height: 100%;
    }
`;

export const infoContainer = css`
    box-sizing: border-box;
    width: 800px;
    height: 100%;
`;

export const infoBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
    width: 100%;
    height: 100px;
`;

export const option = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%; /* 부모의 너비를 모두 사용 */
`;

export const selectContainer = css`
    flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
    margin-left: 10px; /* p 태그와의 간격 설정 */
`;

export const selectedOption = css`
    box-sizing: border-box;
    border: 1px solid ${COLORS.lineColor};
    margin-left: 80px;
    padding-top: 5px;
    width: 400px;
    height: 36px;
    & span {
        margin: 0 10px;
        background-color: #f0f0f0;
    }

`;
