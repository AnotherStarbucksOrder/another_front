/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import { useMutation } from "react-query";
import { instance } from "../../../apis/util/instance";
import { useNavigate } from "react-router-dom";

function AdminUserAddPage(props) {
    const navigate = useNavigate();
    const [inputUser, setInputUser ] = useState({
        phoneNumber: "",
        starCount: 0,
        memo: ""
    })

    // 회원 추가
    const addUserMutation = useMutation(
        async () => await instance.post("/admin/user", inputUser),
        {
            onSuccess: () => {
                alert("등록하였습니다.");
                navigate("/admin/user?page=1")
            }
        }
    )

    const handleUserInputChange = (e) => {
        setInputUser({
            ...inputUser,
            [e.target.name]: e.target.value
        });
    }

    const handleInputUserSubmitClick = () => {
        addUserMutation.mutateAsync();
    }

    const handleBackOnClick = () => {
        window.history.back();
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
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>전화번호 : </p>
                                    </div>
                                    <input type="text" name="phoneNumber" 
                                        css={s.input} onChange={handleUserInputChange} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메모 : </p>
                                    </div>
                                    <textarea name="memo" css={s.input} 
                                        onChange={handleUserInputChange}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div css={s.buttonBox}>
                    <button onClick={handleBackOnClick}>취소</button>
                    <button onClick={handleInputUserSubmitClick}>등록</button>
                </div>
            </div>
        </>
    );
}

export default AdminUserAddPage;
