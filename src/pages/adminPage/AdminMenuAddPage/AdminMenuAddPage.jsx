/** @jsxImportSource @emotion/react */
import * as s from "./style";
import ReactSelect from "react-select";
import { useState } from "react";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase/firebase";

function AdminMenuAddPage(props) {
    const navigate = useNavigate();
    const [inputMenu, setInputMenu] = useState({
        menuName: "",
        menuPrice: 0,
        imgUrl: "",
        comment: "",
        optionIds: [],
        categories: []
    });

    // 메뉴 등록에 필요한 카테고리, 옵션 조회
    const optionList = useQuery(
        ["optionsListQuery"],
        async () => await instance.get("/admin/menu/values"),
        {
            retry: 0,
            refetchOnWindowFocus: false
        }
    )

    const categories = optionList?.data?.data.categories || [];
    const options = optionList?.data?.data.options || [];

    // 메뉴 등록
    const submitMenuData = async (data) => {
        try {
            const response = await instance.post(`/admin/menu`, data);
            if (response.status === 200) {
                alert("등록되었습니다.");
                navigate("/admin/menus?page=1")
            } else {
                alert("등록 실패");
            }
        } catch (e) {
            console.error(e);
            if(e.status === 400) {
                alert(e.response.data);
                return;
            }
            if(inputMenu.categories.length === 0) {
                alert("카테고리는 1개 이상 선택하여야 합니다.")
                return;
            }
            if(e.response.data.defaultMessage.menuName) {
                alert("메뉴 이름은 " + e.response.data.defaultMessage.menuName);
                return;
            }
            if(e.response.data.defaultMessage.menuPrice) {
                alert(e.response.data.defaultMessage.menuPrice);
            }
        }
    };

    // 이미지 선택 및 메뉴 등록
    const handleSubmitOnClick = async () => {
        try {
            const input = document.getElementById("fileInput");
            const imgFile = input.files[0];

            let uploaddData = { ...inputMenu };

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
                        uploaddData.imgUrl = url;
                        await submitMenuData(uploaddData);
                    }
                );
            } else {
                // 이미지가 선택되지 않았을 경우
                await submitMenuData(uploaddData);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleImageChange = (e) => {
        const imgFile = e.target.files[0];
        if (imgFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setInputMenu(inputMenu => ({
                    ...inputMenu,
                    imgUrl: reader.result // 미리보기 URL 설정
                }));
            };
            reader.readAsDataURL(imgFile);
        }
    };

    const handleInputMenuOnChange = (e) => {
        setInputMenu({
            ...inputMenu,
            [e.target.name]: e.target.value
        })
    }

    const handleImageClick = () => {
        document.getElementById("fileInput").click();
    };

    const handleBackOnClick = () => {
        window.history.back();
    }

    const handleSelectCategoryChange = (selectedOptions) => {
        const newCategories = selectedOptions.map(option => ({
            categoryId: option.value,
            categoryName: option.label
        }));

        setInputMenu({
            ...inputMenu,
            categories: newCategories.map(category => category.categoryId)
        });
    };

    const handleSelectOptionChange = (selectedOptions) => {
        const newOptions = selectedOptions.map(option => ({
            optionId: option.value,
            optionName: option.label
        }));

        setInputMenu({
            ...inputMenu,
            optionIds: newOptions.map(option => option.optionId)
        });
    };

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <div>
                        <div css={s.imgContainer}>
                            <div css={s.imgBox}>
                                <div css={s.img}>
                                    <img src={inputMenu.imgUrl} alt="" onClick={handleImageClick} />
                                </div>
                                <input type="file" accept="image/*"  id="fileInput" 
                                    name="imgUrl" onChange={handleImageChange} />
                                <input type="text" value={inputMenu.imgUrl} readOnly />
                            </div>
                            <div css={s.infoContainer}>
                                <div css={s.infoBox}>
                                    <div>
                                        <div css={s.option}>
                                            <div css={s.optionTitle}>
                                                <p>카테고리 : </p>
                                            </div>
                                            <ReactSelect
                                                isMulti
                                                css={s.select}
                                                name="categories"
                                                onChange={handleSelectCategoryChange}
                                                options={categories.map(category => ({
                                                    value: category.categoryId,
                                                    label: category.categoryName
                                                })) || []} 
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div css={s.infoBox}>
                                    <div css={s.option}>
                                        <div css={s.optionTitle}>
                                            <p>메뉴 이름 : </p>
                                        </div>
                                        <input type="text" css={s.input} 
                                            name="menuName" 
                                            onChange={handleInputMenuOnChange}/>
                                    </div>
                                </div>
                                <div css={s.infoBox}>
                                    <div css={s.option}>
                                        <div css={s.optionTitle}>
                                            <p>메뉴 가격 : </p>
                                        </div>
                                        <input type="text" css={s.input}
                                            name="menuPrice" 
                                            onChange={handleInputMenuOnChange}/>
                                    </div>
                                </div>
                                <div css={s.infoBox}>
                                    <div css={s.option}>
                                        <div css={s.optionTitle}>
                                            <p>메뉴 옵션 : </p>
                                        </div>
                                        <ReactSelect
                                            isMulti
                                            css={s.select}
                                            name="options"
                                            onChange={handleSelectOptionChange}
                                            options={options.map(option => ({
                                                value: option.optionId,
                                                label: option.optionName 
                                            })) || []} 
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                        />
                                    </div>
                                </div>
                                <div css={s.infoBox}>
                                    <div css={s.option}>
                                        <div css={s.optionTitle}>
                                            <p>메뉴 설명 : </p>
                                        </div>
                                        <textarea  css={s.input} name="comment" 
                                            onChange={handleInputMenuOnChange}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div css={s.buttonBox}>
                        <button onClick={handleBackOnClick}>취소</button>
                        <button onClick={handleSubmitOnClick}>확인</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminMenuAddPage;
