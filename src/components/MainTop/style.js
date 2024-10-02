import { css } from "@emotion/react";
import { COLORS } from "../../constants/colors";

export const layout = css`
  box-sizing: border-box; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 20px 20px;
  width: 80vh;
  height: 80px;
  border-bottom: 1px solid ${COLORS.lineColor};

  // icon이 svg임 
  svg {
    font-size: 40px;
    color: ${COLORS.main};
  }
`;

export const titleBox = css`
  display: flex;
  justify-content: center;
  align-content: center;

  p {
    margin: 0;
    padding-top: 8px;
    font-size: 30px;
    font-weight: 900;
  }
`;

export const imgBox = css`
  width: 96px;
  height: 66px;
  
  img {
    width: 100%;
    height: 100%;
  }
`;
