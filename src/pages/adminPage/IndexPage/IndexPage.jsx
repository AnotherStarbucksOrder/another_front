/** @jsxImportSource @emotion/react */
import AdminPageSideBar from "../../../components/AdminPageSideBar/AdminPageSideBar";
import * as s from "./style";

function IndexPage(props) {
    return (
        <>
            <AdminPageSideBar />
            <div css={s.layout}>
                <img src="/KakaoTalk_Photo_2024-10-17-16-40-07.jpg" alt="" />
            </div>
        </>
    );
}

export default IndexPage;