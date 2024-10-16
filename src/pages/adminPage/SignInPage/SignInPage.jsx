/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as s from "./style";

function SignInPage(props) {
    return (
        <div css={s.layout}>
        <Link to={"/"}><h1 css={s.logo}>ANOTHER STARBUCKS</h1></Link>
        <div css={s.loginInfoBox}>
            <div>
                <input type="text" name='username' placeholder='아이디'/>
                
            </div>
            <div>
                <input type="password" name='password' placeholder='비밀번호'/>
                
            </div>
        </div>
        <button css={s.loginButton}>로그인</button>

    </div>
    );
}

export default SignInPage;