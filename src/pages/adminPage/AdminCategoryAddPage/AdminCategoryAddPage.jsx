/** @jsxImportSource @emotion/react */
import { useState } from "react";
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
    
    // 카테고리 추가
    const addCategoryMutation = useMutation(
        async () => await instance.post("/admin/category", inputCategory),
        {   
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: () => {
                alert("등록되었습니다.");
                navigate("/admin/category?page=1");
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
            categoryStatus: Number(e.target.value)
        });
    }

    const handleCategorySubmitOnClick = async () => {
        try {
            await addCategoryMutation.mutateAsync();
            console.log(inputCategory);
        }catch (e) {
            if(e.status === 401) {
                alert(e.response.data.defaultMessage.categoryName);
                return;
            } else {
                alert(e.response.data);
            }
        }
    }

    const handleBackOnClick = () => {
        window.history.back();
    }

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <div css={s.container}>
                        <div css={s.infoContainer}>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <p css={s.optionTitle}>카테고리 명</p>
                                    <input 
                                        type="text" 
                                        name="categoryName" 
                                        css={s.selectContainer} 
                                        onChange={handleInputOnChange}  
                                    />
                                </div>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>노출 여부</p>
                                    </div>
                                    <div css={s.radioBox}>
                                        <Radio 
                                            name="categoryStatus" 
                                            value={1} 
                                            checked={inputCategory.categoryStatus === 1} 
                                            onChange={handleCategoryStatusChange}
                                        >
                                            사용
                                        </Radio>
                                        <Radio 
                                            name="categoryStatus" 
                                            value={0} 
                                            checked={inputCategory.categoryStatus === 0} 
                                            onChange={handleCategoryStatusChange}
                                            >
                                            미사용
                                        </Radio>
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
            </div>
        </>
    );
}

export default AdminCategoryAddPage;
