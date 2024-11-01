/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams 임포트
import * as s from "./style";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminUserDetailPage(props) {
    const { userId } = useParams(); // URL에서 menuId 가져오기
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [ initialUserData, setInitialUserData ] = useState({
        userId: 0,
        phoneNumber: "",
        starCount: 0,
        registerDate: "",
        memo: ""
    })

    const [ modifyUserData, setModifyUserData] = useState({
        phoneNumber: "",
        starCount: 0,
        memo: ""
    })

    const user = useQuery(
        ["userQuery", userId],
        async () => await instance.get(`/admin/user/${userId}`),
        {
            retry:0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                const userData = response?.data;
                // const { userId, registerDate, ...rest} = userData
                console.log(response.data);
                setInitialUserData(userData);
                setModifyUserData(userData);
            }
        }
    )

    const modifyUserMutation = useMutation(
        async () => await instance.patch(`/admin/user/modify/${userId}`, modifyUserData),
        {
            onSuccess: () => {
                alert("수정되었습니다.");
                setIsEditing(false);
                user.refetch();
            }
        }
    )

    const deleteUserMutation = useMutation(
        async () => await instance.delete(`/admin/user/${userId}`),
        {
            onSuccess: () => {
                alert("삭제되었습니다.");
                navigate("/admin/user?page=1");
            }
        }
    )

    const handleModifyChange = (e) => {
        const updatedValue = e.target.name === "starCount" ? Number(e.target.value) : e.target.value;

        setModifyUserData(modifyUserData => ({
            ...modifyUserData,
            [e.target.name]: updatedValue
        }));
    }

    const handleDeleteButtonOnClick = () => {
        if(window.confirm("삭제하시겠습니까?")) {
            deleteUserMutation.mutateAsync();
        }
    }

    const handleBackOnClick = () => {
        window.history.back();
    }

    const handleEditOnClick = () => {
        setIsEditing(true);
    }
    const handleConfirmOnClick = () => {
        modifyUserMutation.mutateAsync();
        console.log(modifyUserData);
    }
    const handleCancleOnClick = () => {
        setModifyUserData(initialUserData);
        setIsEditing(false);
    }

    return (
        <>
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
                                        <input type="text" css={s.selectContainer} disabled value={initialUserData.userId} />
                                    </div>
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>전화번호 : </p>
                                    </div>
                                    <input type="text" name="phoneNumber" css={s.selectContainer} readOnly={!isEditing} onChange={handleModifyChange} value={modifyUserData.phoneNumber} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>포인트 : </p>
                                    </div>
                                    <input type="text" name="starCount" css={s.selectContainer} readOnly={!isEditing} onChange={handleModifyChange} value={modifyUserData.starCount} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>가입일 : </p>
                                    </div>
                                    <input type="text" css={s.selectContainer} readOnly value={(initialUserData.registerDate).split("T")[0]} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메모 : </p>
                                    </div>
                                    <textarea name="memo" css={s.selectContainer} readOnly={!isEditing} onChange={handleModifyChange} value={modifyUserData.memo}></textarea>
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
                            <button onClick={handleDeleteButtonOnClick}>삭제</button>
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
