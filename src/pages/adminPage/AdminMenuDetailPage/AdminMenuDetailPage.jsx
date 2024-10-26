/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams 임포트
import * as s from "./style";
import ReactSelect from "react-select";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import { storage } from "../../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function AdminMenuDetailPage(props) {
    const { menuId } = useParams(); // URL에서 menuId 가져오기
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [initialMenuData, setInitialMenuData] = useState({
        menuId: 0,
        menuName: "",
        menuPrice: 0,
        imgUrl: "",
        comment: "",
        categories: "",
        options: "",
    });
    const [modifyMenuData, setModifyMenuData] = useState({
        menuId: 0,
        menuName: "",
        menuPrice: 0,
        imgUrl: "",
        comment: "",
        optionIds: [],
        categoryIds: []
    });
    const menu = useQuery(
        ["menuQuery", menuId],
        async () => await instance.get(`/admin/menu/detail/${menuId}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                const menuData = response?.data;
                const { options, categories, menuStatus, ...modifyData } = menuData;
    
                setInitialMenuData(menuData);
                setModifyMenuData(modifyData);
    
                // 카테고리 ID 매핑
                const categoryIds = categories.split(',').map(category => {
                    const trimmedCategory = category.trim();
                    const matchedCategory = selectCategory.find(selectCat => selectCat.categoryName === trimmedCategory);
                    return matchedCategory ? matchedCategory.categoryId : null; // 일치하는 ID 또는 null
                }).filter(id => id !== null); // null 값 제거
    
                // 옵션 ID 매핑
                const optionIds = options.split(',').map(option => {
                    const trimmedOption = option.trim();
                    const matchedOption = selectOption.find(selectOpt => selectOpt.optionName === trimmedOption);
                    return matchedOption ? matchedOption.optionId : null; // 일치하는 ID 또는 null
                }).filter(id => id !== null); // null 값 제거
    
                // 수정할 메뉴 데이터에 ID 설정
                setModifyMenuData(modifyMenuData => ({
                    ...modifyMenuData,
                    categoryIds: categoryIds,
                    optionIds: optionIds
                }));
            }
        }
    );
    console.log(initialMenuData);
    console.log(modifyMenuData);

    const selectList = useQuery(
        ["selectListQuery"],
        async () => await instance.get("/admin/menu/values"),
        {
            retry: 0,
            refetchOnWindowFocus: false,
        }
    )
    console.log(modifyMenuData)
    console.log(selectList)

    const selectCategory = selectList?.data?.data.categories || [];
    const selectOption = selectList?.data?.data.options || [];

    const categoryArray = initialMenuData.categories.split(',').map(category => {
        const categoryName = category.trim();
        const matchedCategory = selectCategory.find(selectCat => selectCat.categoryName === categoryName)

        return {
            value: matchedCategory ? matchedCategory.categoryId : categoryName, // ID 또는 원래 이름
            label: categoryName,
        };
    });

    const optionArray = initialMenuData.options.split(',').map(option => {
        const optionName = option.trim();
        const matchedOption = selectOption.find(selectOpt => selectOpt.optionName === optionName);

        return {
            value: matchedOption ? matchedOption.optionId : optionName, // ID 또는 원래 이름
            label: optionName
        };
    });

    console.log(categoryArray.map(category => category.value));
    console.log(optionArray.map(option => option.value));

    console.log(modifyMenuData);

    const deleteMenuMutation = useMutation(
        async () => await instance.delete(`/admin/menu/${menuId}`),
        {
            onSuccess: response => {
                alert("게시글을 삭제하였습니다.");
                navigate("/admin/menus?page=")
            }
        }
    )

    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleBackOnClick = () => {
        window.history.back();
    }

    const handleEditOnClick = () => {
        setIsEditing(true);
        menu.refetch();
    }

    const handleConfirmOnClick = () => {
        // modifyMenuMutaion.mutateAsync();
        console.log(modifyMenuData);
    }

    const handleCancleOnClick = () => {
        setModifyMenuData(initialMenuData);
        setIsEditing(false);
    }

    const handleDeleteMenuOnClick = () => {
        if (window.confirm("삭제하시겠습니끼?")) {
            deleteMenuMutation.mutateAsync();
        }
    }
    // 메뉴 데이터 업데이트 함수
    const submitMenuData = async (data) => {
        try {
            const response = await instance.patch(`/admin/modify/${menuId}`, data);
            if (response.status === 200) {
                alert("수정되었습니다.");
                setIsEditing(false);
                menu.refetch();
            } else {
                alert("업데이트 실패");
            }
        } catch (error) {
            console.error("업데이트 요청 중 에러 발생:", error);
            alert("업데이트 요청 중 에러가 발생했습니다.");
        }
    };

    const handleSubmitOnClick = async () => {
        try {
            const input = document.getElementById("fileInput");
            const imgFile = input.files[0];
    
            // 기존 메뉴 데이터를 복사하여 사용
            let updatedData = { ...modifyMenuData };
    
            // 이미지가 선택된 경우
            if (imgFile) {
                const storageRef = ref(storage, `/product/drink/${imgFile.name}`);
                const task = uploadBytesResumable(storageRef, imgFile);
    
                task.on(
                    "state_changed",
                    (snapshot) => {
                        console.log("업로드 중");
                    },
                    (error) => {
                        console.error("업로드 중 에러 발생:", error);
                        alert("업로드 중 에러가 발생했습니다.");
                    },
                    async () => {
                        // 업로드 완료 후 다운로드 URL 가져오기
                        const url = await getDownloadURL(storageRef);
                        updatedData.imgUrl = url; // 새 URL 업데이트
                        await submitMenuData(updatedData);
                    }
                );
            } else {
                // 이미지가 선택되지 않았을 경우 기존 URL 유지
                updatedData.imgUrl = modifyMenuData.imgUrl || ""; // 기존 URL 유지
                await submitMenuData(updatedData);
            }
        } catch (error) {
            console.error("수정 중 에러 발생:", error);
            alert("수정 중 에러가 발생했습니다.");
        }
    };

    const handleSelectCategoryChange = (selectedOptions) => {
        const newCategories = selectedOptions.map(option => ({
            categoryId: option.value,
            categoryName: option.label
        }));

        const categoryNames = newCategories.map(cat => cat.categoryName).join(', ');
        const categoryIds = newCategories.map(cat => cat.categoryId); // ID 리스트로 저장

        setModifyMenuData(modifyMenuData => ({
            ...modifyMenuData,
            categoryIds: categoryIds // ID 리스트 저장
        }));
    };

    const handleSelectOptionChange = (selectedOptions) => {
        const newOptions = selectedOptions.map(option => ({
            optionId: option.value,
            optionName: option.label
        }));

        const optionNames = newOptions.map(opt => opt.optionName).join(', ');
        const optionIds = newOptions.map(opt => opt.optionId); // ID 리스트로 저장

        setModifyMenuData(modifyMenuData => ({
            ...modifyMenuData,
            optionIds: optionIds // ID 리스트 저장
        }));
    };


    const handleModifyInputOnChange = (e) => {

        setModifyMenuData(modifyMenuData => ({
            ...modifyMenuData,
            [e.target.name]: e.target.value
        }))
    }



    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>메뉴 관리</p>
                </div>
                <div>
                    <div css={s.imgContainer}>
                        <div css={s.imgBox}>
                            {
                                !isEditing ?
                                    <>
                                        <div css={s.img}>
                                            <img src={modifyMenuData.imgUrl} alt="" />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div css={s.img}>
                                            <img src={modifyMenuData.imgUrl} alt="" onClick={handleImageClick} />
                                        </div>
                                        <input type="file" accept="image/*" id="fileInput" name="imgUrl" onChange={handleModifyInputOnChange} />
                                        <input type="text" value={modifyMenuData.imgUrl} readOnly />
                                    </>
                            }
                        </div>
                        <div css={s.infoContainer}>
                            <div css={s.infoBox}>
                                <div>
                                    <div css={s.option}>
                                        <div css={s.optionTitle}>
                                            <p>카테고리 : </p>
                                        </div>
                                        {
                                            !isEditing ?
                                                <>
                                                    <input type="text" css={s.input} readOnly value={initialMenuData.categories} />
                                                </>
                                                :
                                                <ReactSelect
                                                    isMulti
                                                    css={s.select}
                                                    name="categories"
                                                    onChange={handleSelectCategoryChange}
                                                    options={selectCategory.map(category => ({
                                                        value: category.categoryId,
                                                        label: category.categoryName // 오타 수정
                                                    })) || []} // options에도 변환된 데이터 사용
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    defaultValue={categoryArray}
                                                />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메뉴 이름 : </p>
                                    </div>
                                    <input type="text" name="menuName" css={s.input} readOnly={!isEditing} onChange={handleModifyInputOnChange} value={modifyMenuData.menuName || ""} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메뉴 가격 : </p>
                                    </div>
                                    <input type="text" name="menuPrice" css={s.input} readOnly={!isEditing} onChange={handleModifyInputOnChange} value={modifyMenuData.menuPrice || ""} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메뉴 옵션 : </p>
                                    </div>
                                    {
                                        !isEditing ?
                                            <>
                                                <input
                                                    type="text"
                                                    css={s.input}
                                                    readOnly
                                                    value={initialMenuData.options}
                                                />
                                            </>
                                            :
                                            <ReactSelect
                                                isMulti
                                                isDisabled={!isEditing}
                                                css={s.select}
                                                name="options"
                                                onChange={handleSelectOptionChange}
                                                options={selectOption.map(option => ({
                                                    value: option.optionId,
                                                    label: option.optionName // 오타 수정
                                                })) || []} // options에도 변환된 데이터 사용
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                defaultValue={optionArray}
                                            />
                                    }
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메뉴 설명 : </p>
                                    </div>
                                    <textarea name="comment" css={s.input} readOnly={!isEditing} onChange={handleModifyInputOnChange} value={modifyMenuData.comment || ""}></textarea>
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
                            <button onClick={handleDeleteMenuOnClick}>삭제</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleCancleOnClick}>취소</button>
                            <button onClick={handleSubmitOnClick}>수정</button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminMenuDetailPage;

