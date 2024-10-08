/** @jsxImportSource @emotion/react */
import AdminPageSideBar from "../../../components/AdminPageSideBar/AdminPageSideBar";
import * as s from "./style";

function IndexPage(props) {
    return (
        <>
            <AdminPageSideBar />
            <div css={s.layout}>
                <img src="https://flexible.img.hani.co.kr/flexible/normal/640/512/imgdb/original/2024/0403/20240403501300.jpg" alt="" />
            </div>
        </>
    );
}

export default IndexPage;