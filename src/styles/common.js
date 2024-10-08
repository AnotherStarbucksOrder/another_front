import { css } from "@emotion/react";

export const reset = css`

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

    html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

    * {
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    font-size: 16px;
    }

    ul, ol {
        list-style-type: none;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
    
`;
