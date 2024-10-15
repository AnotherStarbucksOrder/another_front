/** @jsxImportSource @emotion/react */
import AdminPageSideBar from "../../../components/AdminPageSideBar/AdminPageSideBar";
import * as s from "./style";

function AdminUserAddPage(props) {

    const handleBackOnClick = () => {
        window.history.back();
    }


    return (
        <>
            <AdminPageSideBar />
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>메뉴 관리</p>
                </div>
                <div>
                    <div css={s.imgContainer}>
                        <div css={s.infoContainer}>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>이름 : </p>
                                    </div>
                                    <input type="text" css={s.input} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>전화번호 : </p>
                                    </div>
                                    <input type="text" css={s.input} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>포인트 : </p>
                                    </div>
                                    <input type="text" css={s.input} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>가입일 : </p>
                                    </div>
                                    <input type="text" css={s.input} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메모 : </p>
                                    </div>
                                    <textarea name="" css={s.input}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div css={s.buttonBox}>
                    <button onClick={handleBackOnClick}>취소</button>
                    <button>등록</button>
                </div>
            </div>
        </>
    );
}

export default AdminUserAddPage;
