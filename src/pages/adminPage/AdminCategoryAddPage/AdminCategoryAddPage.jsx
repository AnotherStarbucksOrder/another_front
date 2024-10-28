/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { Radio } from "pretty-checkbox-react";
import { useMutation } from "react-query";
import { instance } from "../../../apis/util/instance";
import { useNavigate } from "react-router-dom";

function AdminCategoryAddPage(props) {
    const navigate = useNavigate();
    const [inputCategory, setInputCategory] = useState({
        categoryName: "",
        categoryStatus: 1
    })

    const addCategoryMutation = useMutation(
        async () => await instance.post("/admin/category", inputCategory),
        {
            onSuccess: () => {
                alert("등록되었습니다.")
                navigate("/admin/category")
            }
        }
    )
    
    const handleInputOnChange = (e) => {
        setInputCategory({
            ...inputCategory,
            [e.target.name]: e.target.value
        });
    }
    const handleCategoryStatusChange = (e) => {
        setInputCategory({
            ...inputCategory,
            categoryStatus: Number(e.target.value) // categoryStatus만 업데이트
        });
    }

    const handleCategorySubmitOnClick = () => {
        addCategoryMutation.mutateAsync();
        console.log(inputCategory);
    }

    const handleBackOnClick = () => {
        window.history.back();
    }

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>카테고리 관리</p>
                </div>
                <div css={s.Container}>
                    <div css={s.infoContainer}>
                        <div css={s.infoBox}>
                            <div css={s.option}>
                                <p css={s.optionTitle}>카테고리 명 : </p>
                                <input type="text" name="categoryName" css={s.selectContainer} onChange={handleInputOnChange}  />
                            </div>
                            <div css={s.option}>
                                <div css={s.optionTitle}>
                                    <p>노출 여부</p>
                                </div>
                                <div css={s.radioBox}>
                                    <Radio css={s.radio} name="categoryStatus" value={1} checked={inputCategory.categoryStatus === 1} onChange={handleCategoryStatusChange}>사용</Radio>
                                    <Radio name="categoryStatus" value={0} checked={inputCategory.categoryStatus === 0} onChange={handleCategoryStatusChange} bigger>미사용</Radio>
                                </div>
                            </div>
                            <div css={s.registerContainer}>
                                <div css={s.registerMenu}>
                                    <p>등록메뉴</p>
                                    <button>+</button>
                                </div>
                                <div css={s.menuBox}>
                                    <p>아메리카노</p>
                                    <button>x</button>
                                </div>
                            </div>
                        </div>
                        <div css={s.buttonBox}>
                            <button onClick={handleBackOnClick}>취소</button>
                            <button onClick={handleCategorySubmitOnClick}>등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminCategoryAddPage;
