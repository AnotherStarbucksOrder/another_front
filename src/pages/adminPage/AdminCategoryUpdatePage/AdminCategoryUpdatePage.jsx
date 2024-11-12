/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useMutation, useQuery } from "react-query";
import { Radio } from "pretty-checkbox-react";
import { instance } from "../../../apis/util/instance";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AdminCategoryUpdatePage(props) {
    const {categoryId} = useParams();
    const navigate = useNavigate();

    const [initialCategoryData, setInitailCategoryData]= useState({
            categoryId: 0,
            categoryName: "",
            categoryStatus: 0,
    })
    const [modifyCategoryData, setModifyCategoryData] = useState({
        categoryId: 0,
        categoryName: "",
        categoryStatus: 0,
    })

    // 카테고리 상세 조회
    const category = useQuery(
        ["categoryQuery", categoryId],
        async () => await instance.get(`/admin/category/${categoryId}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                const categoryData = response?.data;
                const { menuList, ...rest } = categoryData;

                setInitailCategoryData(rest.category);
                setModifyCategoryData(rest.category); 
            }
        }
    );

    // 카테고리 수정
    const modifyCategoryMutation = useMutation(
        async () => await instance.patch(`/admin/category/${categoryId}`, modifyCategoryData),
        {
            onSuccess: () => {
                alert("수정되었습니다.");
                navigate("/admin/category?page=1");
            }
        }
    )

    const handleModifyDataInputOnChange = (e) => {
        setModifyCategoryData(modifyCategoryData =>({
            ...modifyCategoryData,
            [e.target.name]: e.target.value
        }));
    }

    // categoryStatus만 업데이트
    const handleCategoryStatusChange = (e) => {
        setModifyCategoryData(modifyCategoryData => ({
            ...modifyCategoryData,
            categoryStatus: Number(e.target.value)
            
        }));
    }

    const handleModifyCategoryOnClick = async () => {
        try {
            await modifyCategoryMutation.mutateAsync();
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
        setModifyCategoryData(initialCategoryData);
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
                                    <p css={s.optionTitle}>코드 번호</p>
                                    <input 
                                        type="text" 
                                        value={modifyCategoryData.categoryId} 
                                        css={s.selectContainer} 
                                        disabled  
                                    />
                                </div>
                                <div css={s.option}>
                                    <p css={s.optionTitle}>카테고리 명</p>
                                    <input 
                                        type="text" 
                                        name="categoryName" 
                                        value={modifyCategoryData.categoryName} 
                                        css={s.selectContainer} 
                                        onChange={handleModifyDataInputOnChange}
                                    />
                                </div>
                                <div css={s.option}>
                                    <p css={s.optionTitle}>노출 여부</p>
                                    <div css={s.radioBox}>
                                        <Radio 
                                            name="categoryStatus" 
                                            value={1} 
                                            checked={modifyCategoryData.categoryStatus === 1} 
                                            onChange={handleCategoryStatusChange}
                                        >
                                            사용
                                        </Radio>
                                        <Radio 
                                            name="categoryStatus" 
                                            value={0}
                                            checked={modifyCategoryData.categoryStatus === 0} 
                                            onChange={handleCategoryStatusChange} 
                                        >
                                            미사용
                                        </Radio>
                                    </div>
                                </div>
                                <div css={s.registerContainer}>
                                    <div css={s.registerMenu}>
                                        <p>등록메뉴</p>
                                    </div>
                                    <div css={s.menuContainer}>
                                        {
                                            category?.data?.data.menuList.map(menu => (
                                                <div css={s.menuBox} key={menu.menuId}>
                                                    <p>{menu.menuName}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div css={s.buttonBox}>
                                <button onClick={handleBackOnClick}>취소</button>
                                <button onClick={handleModifyCategoryOnClick}>수정</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminCategoryUpdatePage;
