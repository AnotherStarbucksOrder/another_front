/** @jsxImportSource @emotion/react */
import { Link, useNavigate } from "react-router-dom";
import * as s from "./style";
import { useState } from "react";
import { signinApi } from "../../../apis/signinApi";
import { instance } from "../../../apis/util/instance";

function SignInPage(props) {
    const navigate = useNavigate();
    const [ inputUser, setInputUser ] = useState({
        username: "",
        password: ""
    })

    const [ fieldErrorMessages, setFieldErrorMessages ] = useState({
        username: <></>,
        password: <></>
    })

    const handleInputUserOnChange = (e) => {
        setInputUser (inputUser =>({
            ...inputUser,
            [e.target.name]: e.target.value
        }));
    }

    const showFieldErrorMessage = (fieldErrors) => {
        let EmptyFieldErrors = {
            username: <></>,
            password: <></>
        };

        for (let fieldError of fieldErrors) {
            EmptyFieldErrors = {
                ...EmptyFieldErrors,
                [fieldError.field]: <p>{fieldError.defaultMessage}</p>
            }
        }
        setFieldErrorMessages(EmptyFieldErrors);
    }

    const handleLoginSubmitOnClick = async () => {
        const signinData = await signinApi(inputUser);
        console.log(signinData);
        if(!signinData.isSucess) {
            if(signinData.errorStatus === "fieldError") {
                showFieldErrorMessage(signinData.error);
            }
            if(signinData.errorStatus === "loginError") {
                let EmptyFieldErrors = {
                    username: <></>,
                    password: <></>
                };
                setFieldErrorMessages(EmptyFieldErrors);
                alert(signinData.error);
            }
        }
        
        localStorage.setItem("accessToken", "bearer " + signinData.token);
        
        instance.interceptors.request.use(config => {
            config.headers["Authorization"] = localStorage.getItem("accessToken");
            return config;
        });
        navigate("/admin")
    }

    return (
        <div css={s.layout}>
        <Link to={"/"}><h1 css={s.logo}>ANOTHER STARBUCKS</h1></Link>
        <div css={s.loginInfoBox}>
            <div>
                <input type="text" name='username' onChange={handleInputUserOnChange} placeholder='아이디'/>
                {fieldErrorMessages.username}
            </div>
            <div>
                <input type="password" name='password' onChange={handleInputUserOnChange} placeholder='비밀번호'/>
                {fieldErrorMessages.password}
            </div>
        </div>
        <button css={s.loginButton} onClick={handleLoginSubmitOnClick}>로그인</button>

    </div>
    );
}

export default SignInPage;