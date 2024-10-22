/** @jsxImportSource @emotion/react */
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom"; // useParams 임포트
import * as s from "./style";
import ReactSelect from "react-select";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import { storage } from "../../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function AdminMenuDetailPage(props) {
    const { menuId } = useParams(); // URL에서 menuId 가져오기
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState("");
    const [ initialMenuData, setInitialMenuData ] = useState(null)
    const [ modifyMenuData, setModifyMenuData ] = useState({
        menuId: 0,
        menuName: "",
        menuPrice: 0,
        imgUrl: "",
        comment: "",
        option: [{
            optionId: 0,
            optionName: ""
        }],
        category:[{
            categoryId: 0,
            categoryName: ""
        }]
    })

    const menu = useQuery(
        ["menuQuery", menuId],
        async () => await instance.get(`/menu/${menuId}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                const menuData = response?.data
                setInitialMenuData(menuData);
                setModifyMenuData(menuData);
                console.log(menuData);
            }
        }
    )
    console.log(menu);

    const optionList = useQuery(
        ["optionsListQuery"],
        async () => await instance.get("/admin/menu/add"),
        {
            retry: 0,
            refetchOnWindowFocus: false
        }
    )
    console.log(optionList)

    const categories = optionList?.data?.data.categories || [];
    const options = optionList?.data?.data.options || [];

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
        setIsEditing(false); // 수정 모드 해제
        console.log(modifyMenuData);
    }
    const handleCancleOnClick = () => {
        setIsEditing(false);
        if(initialMenuData) {
            setModifyMenuData(initialMenuData);
        }
    }

    const handleImgLoad = useCallback(() => {
        const input = document.getElementById("fileInput");
        const imgFile = input.files[0];

        if(!imgFile) return;

        if(!modifyMenuData.imgUrl || modifyMenuData.imgUrl !== imgFile.name) {
            const storgeRef = ref(storage, `product/drink/${imgFile.name}`);
            const task = uploadBytesResumable(storgeRef, imgFile);
            task.on(
                "state_changed",
                () => { },
                () => { },
                async () => {
                    const url = await getDownloadURL(storgeRef);
                    setImage(url);
                    setModifyMenuData(modifyMenuData => ({
                        ...modifyMenuData,
                        imgUrl: url
                    }));
                }
            );
        } else {
            alert("이미지가 이미 존재합니다.")
        }
    }, [modifyMenuData])

    const handleSelectCategoryChange = (selectedOptions) => {
        const newCategories = selectedOptions.map(option => ({
            categoryId: option.value,
            categoryName: option.label
        }));
        setModifyMenuData({
            ...modifyMenuData,
            category: newCategories
        });
    };

    const handleSelectOptionChange = (selectedOptions) => {
        const newOptions = selectedOptions.map(option => ({
            optionId: option.value,
            optionName: option.label
        }));
        setModifyMenuData({
            ...modifyMenuData,
            option: newOptions
        });
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
                                        <input type="file" accept="image/*"  id="fileInput" onChange={handleImgLoad} />
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
                                                    <input type="text" css={s.input} readOnly value={menu ? menu.category : ''} />
                                                </>
                                                :
                                                <ReactSelect
                                                    isMulti
                                                    css={s.select}
                                                    name="categories"
                                                    onChange={handleSelectCategoryChange}
                                                    options={categories.map(category => ({
                                                        value: category.categoryId,
                                                        label: category.categoryName // 오타 수정
                                                    })) || []} // options에도 변환된 데이터 사용
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    // defaultValue={menu ? 
                                                    //     categotyList?.data?.data.categories
                                                    //         .filter(category => menu.categories.includes(category.categoryId)) // menu에 있는 카테고리만 필터링
                                                    //         .map(category => ({
                                                    //             value: category.categoryId,
                                                    //             label: category.categoryName // 오타 수정
                                                    //         })) : []}
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
                                                    value={menu?.data?.data.menuDetailList.map(menuDetail => menuDetail.option.optionName).join(', ')}
                                                />
                                            </>
                                            :
                                            <ReactSelect
                                                isMulti
                                                isDisabled={!isEditing}
                                                css={s.select}
                                                name="options"
                                                onChange={handleSelectOptionChange}
                                                options={options.map(option => ({
                                                    value: option.optionId,
                                                    label: option.optionName // 오타 수정
                                                })) || []} // options에도 변환된 데이터 사용
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                defaultValue={menu ? 
                                                    menu.data.data.menuDetailList
                                                        .filter(menuDetail => 
                                                            options.some(option => option.optionId === menuDetail.option.optionId)
                                                        )
                                                        .map(menuDetail => ({
                                                            value: menuDetail.option.optionId,
                                                            label: menuDetail.option.optionName
                                                        })) : []}
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

export default AdminMenuDetailPage;

