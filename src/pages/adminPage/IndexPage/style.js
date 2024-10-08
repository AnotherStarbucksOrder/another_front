import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 300px;
    width: 100%;
    height: 100%;

    & img {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
`;

