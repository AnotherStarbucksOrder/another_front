/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useParams } from "react-router-dom"; // useParams 임포트
import AdminPageSideBar from "../../../components/AdminPageSideBar/AdminPageSideBar";
import * as s from "./style";

function AdminUserDetailPage(props) {
    const { userId } = useParams(); // URL에서 menuId 가져오기
    const [isEditing, setIsEditing] = useState(false);

    const [users ] = useState([
        { userId: 1, phoneNum: "010-1111-1111", name: "김하나", point: 10, registerDate: "2024-01-01", memo: "sadsadsa" },
        { userId: 2, phoneNum: "010-2222-2222", name: "김둘", point: 0, registerDate: "2024-01-01", memo: "dasdsada" },
        { userId: 3, phoneNum: "010-3333-3333", name: "김셋", point: 20, registerDate: "2024-01-01", memo: "dasdsa" },
    ]);

    const user = users.find(user => user.userId === parseInt(userId)); // menuId에 해당하는 메뉴 찾기

    const handleBackOnClick = () => {
        window.history.back();
    }

    const handleEditOnClick = () => {
        setIsEditing(true);
    }
    const handleConfirmOnClick = () => {
        setIsEditing(false); // 수정 모드 해제
    }
    const handleCancleOnClick = () => {
        setIsEditing(false);
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
                                <div>
                                    <div css={s.option}>
                                        <p css={s.optionTitle}>고유 번호 : </p>
                                        <input type="text" css={s.selectContainer} readOnly value={user ? user.userId : ''} />
                                    </div>
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>이름 : </p>
                                    </div>
                                    <input type="text" css={s.selectContainer} readOnly={!isEditing} value={user ? user.name : ""} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>전화번호 : </p>
                                    </div>
                                    <input type="text" css={s.selectContainer} readOnly={!isEditing} value={user ? user.phoneNum : ""} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>포인트 : </p>
                                    </div>
                                    <input type="text" css={s.selectContainer} readOnly value={user ? user.point : ''} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>가입일 : </p>
                                    </div>
                                    <input type="text" css={s.selectContainer} readOnly={!isEditing} value={user ? user.registerDate : ''} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메모 : </p>
                                    </div>
                                    <textarea name="" css={s.selectContainer} readOnly={!isEditing} value={user ? user.memo : ""}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div css={s.buttonBox}>
                    {!isEditing ? (
                        <>
                            <button onClick={handleBackOnClick}>확인</button>
                            <button onClick={handleEditOnClick}>수정</button>
                            <button onClick={() => alert("아무것도 없음")}>삭제</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleCancleOnClick}>취소</button>
                            <button onClick={handleConfirmOnClick}>수정</button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminUserDetailPage;
