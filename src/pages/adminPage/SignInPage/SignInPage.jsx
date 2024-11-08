/** @jsxImportSource @emotion/react */
import { Link, useNavigate } from "react-router-dom";
import * as s from "./style";
import { useState } from "react";
import { signinApi } from "../../../apis/signinApi";
import { instance } from "../../../apis/util/instance";

function SignInPage(props) {
    const navigate = useNavigate();
    const [inputUser, setInputUser] = useState({
        username: "",
        password: ""
    })

    const handleInputUserOnChange = (e) => {
        setInputUser(inputUser => ({
            ...inputUser,
            [e.target.name]: e.target.value
        }));
    }

    // 로그인
    const handleLoginSubmitOnClick = async () => {
        const signinData = await signinApi(inputUser);
        if (!signinData.isSucess) {
            alert("로그인에 실패하였습니다.")
        }

        localStorage.setItem("accessToken", "Bearer " + signinData.token);

        instance.interceptors.request.use(config => {
            config.headers["Authorization"] = localStorage.getItem("accessToken");
            return config;
        });
        navigate("/admin")
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLoginSubmitOnClick();
        }
    }

    return (
        <div css={s.layout}>
            <Link to={"/"}><h1 css={s.logo}>ANOTHER STARBUCKS</h1></Link>
            <div css={s.loginInfoBox}>
                <div>
                    <input type="text" name='username' 
                        onChange={handleInputUserOnChange} 
                        onKeyDown={handleKeyDown} placeholder='아이디' />
                </div>
                <div>
                    <input type="password" name='password' 
                        onChange={handleInputUserOnChange} 
                        onKeyDown={handleKeyDown} placeholder='비밀번호' />
                </div>
            </div>
            <button css={s.loginButton} onClick={handleLoginSubmitOnClick}>로그인</button>

        </div>
    );
}

export default SignInPage;