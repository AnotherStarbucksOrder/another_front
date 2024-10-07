import React from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { FaCoffee } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function HomePage() {

  const navigate = useNavigate();

  // 메인화면으로 이동
  const handleOnClick = () => {
    navigate('/main');
  }

  return (
    <div css={s.layout}>
      <div css={s.logo}>
        <img src="https://i.namu.wiki/i/9p8OVxJTce_f2HnuZF1QOU6qMSHqXBHdkcx3q_hlGxvhcyaOXKxBVyoDkeg-Cb4Nx2p60W0AUh6RzjAH59vHwQ.svg" alt="" />
        <div>ANOTHER STARBUCKS</div>
      </div>
      <div css={s.buttons}>
        <button onClick={handleOnClick}><FaCoffee/>가져 갈게요</button>
        <button onClick={handleOnClick}><FaCoffee/>먹고 갈게요</button>
      </div>
    </div>
  )
}

export default HomePage;