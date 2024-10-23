/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams 임포트
import * as s from "./style";
import ReactSelect from "react-select";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import { storage } from "../../../firebase/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function AdminMenuDetailPage(props) {
    const { menuId } = useParams(); // URL에서 menuId 가져오기
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [initialMenuData, setInitialMenuData] = useState(null);
    const [previewData, setPreViewData] = useState({
        menuId: 0,
        menuName: "",
        menuPrice: 0,
        imgUrl: "",
        comment: "",
        categories: "",
        options: "",
        optionIds: [],
        categoryIds: []
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
                console.log(response);
                const menuData = response?.data

                const { categories, options, ...rest } = menuData;
                setInitialMenuData(menuData);
                setPreViewData(menuData);
                setModifyMenuData(rest);
                console.log(menuData);
            }
        }
    )
    console.log(initialMenuData);
    console.log(previewData);
    console.log(modifyMenuData);

    const selectList = useQuery(
        ["optionsListQuery"],
        async () => await instance.get("/admin/menu/add"),
        {
            retry: 0,
            refetchOnWindowFocus: false
        }
    )
    console.log(selectList)

    const selectCategory = selectList?.data?.data.categories || [];
    const selectOption = selectList?.data?.data.options || [];

    const categoryArray = previewData.categories.split(',').map(category => {
        const categoryName = category.trim();
        const matchedCategory = selectCategory.find(selectCat => selectCat.categoryName === categoryName);
        return {
            value: matchedCategory ? matchedCategory.categoryId : categoryName, // ID 또는 원래 이름
            label: categoryName
        };
    });

    const optionArray = previewData.options.split(',').map(option => {
        const optionName = option.trim();
        const matchedOption = selectOption.find(selectOpt => selectOpt.optionName === optionName);
        return {
            value: matchedOption ? matchedOption.optionId : optionName, // ID 또는 원래 이름
            label: optionName
        };
    });
    console.log(categoryArray);
    console.log(optionArray);


    // const modifyMenuMutaion = useMutation(
    //     async () => await instance.post("/amdin/modify"),
    //     {
    //         retry: 0,
    //         refetchOnWindowFocus: false,
    //         onSuccess: response => {
    //             alert("메뉴정보를 수정하였습니다.")
    //             setIsEditing(false);
    //         }
    //     }
    // )

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
    }
    const handleConfirmOnClick = () => {
        // modifyMenuMutaion.mutateAsync();
        console.log(modifyMenuData);
    }
    const handleCancleOnClick = () => {
        setIsEditing(false);
        if (initialMenuData) {
            setModifyMenuData(initialMenuData);
        }
    }
    const handleDeleteMenuOnClick = () => {
        if(window.confirm("삭제하시겠습니끼?")) {
            deleteMenuMutation.mutateAsync();
        }
    }

    // const handleImgLoad = useCallback(() => {
    //     const input = document.getElementById("fileInput");
    //     const imgFile = input.files[0];

    //     if(!imgFile) return;

    //     if(!modifyMenuData.imgUrl || modifyMenuData.imgUrl !== imgFile.name) {
    //         const storgeRef = ref(storage, `product/drink/${imgFile.name}`);
    //         const task = uploadBytesResumable(storgeRef, imgFile);
    const handleSubmitOnClick = async () => {
        let response = null;
        const storageRef = ref(storage, `product/drink/${modifyMenuData.imgUrl}`);
        console.log(modifyMenuData.imgUrl);
        const task = uploadBytesResumable(storageRef, modifyMenuData.imgUrl);
        task.on(
            "state_changed",
            (snapshot) => {
                console.log("업로드 중")
            },
            (e) => {
                console.log("파이어베이스 업로드 중 에러발생");
                console.error(e);
            },
            async (success) => {
                const url = await getDownloadURL(storageRef);
                let data = {
                    ...modifyMenuData,
                    imgUrl: url
                };
                data.imgUrl = url;
                console.log("바뀐 데이터");
                console.log(data);
                try {
                    response = await instance.post("/admin/modify", data);
                    if (response.status !== 200) {
                        deleteObject(storageRef);
                    }
                    if (response.status === 200) {
                        deleteObject(storageRef, initialMenuData.imgUrl)
                    }
                } catch (e) {
                    console.error(e);
                    return;
                }
                alert("등록하였습니다.");
                setIsEditing(false);
            }
        );
    }
    // }, [modifyMenuData])

    const handleSelectCategoryChange = (selectedOptions) => {
        const newCategories = selectedOptions.map(option => ({
            categoryId: option.value,
            categoryName: option.label
        }));

        const categoryNames = newCategories.map(cat => cat.categoryName).join(', ');
        const categoryIds = newCategories.map(cat => cat.categoryId); // ID 리스트로 저장

        setPreViewData(previewData => ({
            ...previewData,
            categories: categoryNames, // 이름을 문자열로 저장
            categoryIds: categoryIds // ID 리스트 저장
        }));
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

        setPreViewData(previewData => ({
            ...previewData,
            options: optionNames, // 이름을 문자열로 저장
            optionIds: optionIds // ID 리스트 저장
        }));
        setModifyMenuData(modifyMenuData => ({
            ...modifyMenuData,
            optionIds: optionIds // ID 리스트 저장
        }));
    };


    const handleModifyInputOnChange = (e) => {
        setPreViewData(previewData => ({
            ...previewData,
            [e.target.name]: e.target.value
        }))
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
                                            <img src={previewData.imgUrl} alt="" />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div css={s.img}>
                                            <img src={previewData.imgUrl} alt="" onClick={handleImageClick} />
                                        </div>
                                        <input type="file" accept="image/*" id="fileInput" onChange={handleModifyInputOnChange} />
                                        <input type="text" value={previewData.imgUrl} readOnly />
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
                                                    <input type="text" css={s.input} readOnly value={previewData.categories} />
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
                                    <input type="text" name="menuName" css={s.input} readOnly={!isEditing} onChange={handleModifyInputOnChange} value={previewData.menuName || ""} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메뉴 가격 : </p>
                                    </div>
                                    <input type="text" name="menuPrice" css={s.input} readOnly={!isEditing} onChange={handleModifyInputOnChange} value={previewData.menuPrice || ""} />
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
                                                    value={previewData.options}
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
                                    <textarea name="comment" css={s.input} readOnly={!isEditing} onChange={handleModifyInputOnChange} value={previewData.comment || ""}></textarea>
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

