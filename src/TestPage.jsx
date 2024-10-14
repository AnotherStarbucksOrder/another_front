import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const layout = css`
  margin: 0 auto;
  border: 0;
  padding: 0;
  width: 1080px;
  height: 1920px;
  background-color: black;
  display: flex;
  flex-direction: column;
`;
const top = css`
  width: 100%;
  height: 5%;
  background-color: #3f4acc;
`;
const bar = css`
  width: 100%;
  height: 10%;
  background-color: #952a2a;
`;
const main = css`
  width: 100%;
  height: 60%;
  background-color: #3eac79;
`;
const bottom = css`
  width: 100%;
  height: 20%;
  background-color: #a8d839;
`;

// 컴포넌트들끼리 합치면 어떤 느낌인지 볼려고 만든 페이지
// 추후 없앨 예정
function TestPage() {
  return (
    <>
      <div css={layout}>
        <div css={top}></div>
        <div css={bar}></div>
        <div css={main}></div>
        <div css={bottom}></div>
      </div>
    </>
  );
}

export default TestPage;
