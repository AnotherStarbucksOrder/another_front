/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import { useMutation } from "react-query";
import { instance } from "../../../apis/util/instance";
import { useNavigate } from "react-router-dom";

function AdminUserAddPage(props) {
    const navigate = useNavigate();
    const [inputUser, setInputUser ] = useState({
        phoneNumber: "010-",
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

    const formatPhoneNumber = (number) => {
        // 숫자가 아닌 문자는 제거
        number = number.replace(/[^0-9]/g, "").replace(/^010/g, "");

        if (number.length <= 3) {
            return `010-${number}`; 
        } else if (number.length <= 7) {
            return `010-${number.slice(0, 3)}-${number.slice(3)}`; 
        } else {
            return `010-${number.slice(0, 4)}-${number.slice(4, 8)}`; 
        }
    };

    const updateNewPhoneNumber = (newPhoneNumber) => {
        setInputUser(inputUser => ({
            ...inputUser,
            phoneNumber: newPhoneNumber
        }));
    };

    const handleUserPhoneNumberInputChange = (e) => {
        const value = e.target.value;
        updateNewPhoneNumber(formatPhoneNumber(value));
    };

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
                                        css={s.input} value={inputUser.phoneNumber} 
                                        onChange={handleUserPhoneNumberInputChange} />
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
