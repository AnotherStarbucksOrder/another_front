import { css } from "@emotion/react";
import { COLORS, SIZE } from "../../constants/colors";

export const layout = css`
    box-sizing: border-box;
    margin: 0 auto;
    border-right: 1px solid ${COLORS.lineColor};
    border-left: 1px solid ${COLORS.lineColor};
    width: ${SIZE.width};
    height: calc(${SIZE.height}* 0.6);

    & p {
        margin: 0;
    }
`;

export const menuContainer = css`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 13px;
    height: 1020px;
`;

export const menuBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15px;
    width: 320px;
    height: 310px;
    cursor: pointer;

    & > div {
        width: 280px;
        height: 290px;
        overflow: hidden;

        & > img {
        width: 100%;
        transition: all 0.5s ease-in-out;
        &:hover {
            transform: scale(120%);
        }
        }
    }

    & > p {
        text-align: center;
        white-space: break-spaces;
        font-size: 18px;
        font-weight: 600;
    }
`;

export const paginateContainer = css`
    & > ul {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;

        & > li {
        margin: 0px 35px;
        }

        & a {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 5px;
        min-width: 50px;
        height: 50px;
        line-height: 10px;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
        }

        & .active {
        border-radius: 32px;
        background-color: #dbdbdb;
        color: #ffffff;
        }
    }
`;
