/** @jsxImportSource @emotion/react */
import * as s from "./style";
import ReactSelect from "react-select";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import { useNavigate } from "react-router-dom";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase/firebase";


function AdminMenuAddPage(props) {
    const navigate = useNavigate();
    const [previewImg, setPreviewImg] = useState("");
    const [inputMenu, setInputMenu] = useState({
        menuId: 0,
        menuName: "",
        menuPrice: 0,
        imgUrl: "",
        comment: "",
        option: [{
            optionId: 0,
        }],
        category: [{
            categoryId: 0,
        }]
    });

    // const handleimgUrlOnChange = async (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         if (!file.type.startsWith('image/')) {
    //             alert("이미지 파일만 업로드 가능합니다.");
    //             return;
    //         }

    //         const imageName = file.name; // 파일 이름
    //         const folderRef = ref(storage, 'board/img/'); // 이미지가 저장될 폴더

    //         // 중복 파일 체크
    //         const result = await listAll(folderRef);
    //         const existingFiles = result.items.map(item => item.name);

    //         if (existingFiles.includes(imageName)) {
    //             alert("이미 존재하는 이미지입니다.");
    //             return;
    //         }

    //         const imageUrl = URL.createObjectURL(file);
    //         setInputMenu({
    //             ...inputMenu,
    //             imgUrl: imageUrl // 이미지 URL 업데이트
    //         });
    //     }
    // };
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

    // const addMenuMutation = useMutation(
    //     async () => await instance.post("/admin/menu"),
    //     {
    //         retry: 0,
    //         refetchOnWindowFocus: false,
    //         onSuccess: response => {
    //             alert("작성이 완료되었습니다.")
    //             navigate(`/admin/menu/detail/${response?.data.menuId}`)
    //         },
    //         onError: e => {
    //             const fieldErrors = e.response.data;
    //             for(let fieldError of fieldErrors) {
    //                 if(fieldError.field === "menuName") {
    //                     alert(fieldError.defaultMessage);
    //                     return;
    //                 }
    //             }
    //         }
    //     }
    // )

    const handleSubmitOnClick = async () => {
        let response = null;
        const storageRef = ref(storage, `product/drink/${inputMenu.imgUrl}`);
        console.log(inputMenu.imgUrl);
        const task = uploadBytesResumable(storageRef, inputMenu.imgUrl);
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
                    ...inputMenu,
                    imgUrl: url
                };
                data.imgUrl = url;
                console.log("바뀐 데이터");
                console.log(data);
                try {
                    response = await instance.post("/admin/menu", data);
                    if (response.status !== 200) {
                        deleteObject(storageRef);
                    }
                } catch (e) {
                    console.error(e);
                    return;
                }
                console.log(response);
                alert("등록하였습니다.");
                navigate(`/admin/menu/detail/${response.data.menuId}`)
            }
        );
    }

    const handleimgUrlOnChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert("이미지 파일만 업로드 가능합니다.");
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            setPreviewImg(imageUrl); // 미리보기 이미지 URL 설정
        }
    };

    const handleInputMenuOnChange = (e) => {
        setInputMenu({
            ...inputMenu,
            [e.target.name]: e.target.value
        })
    }

    const handleImageClick = () => {
        document.getElementById('fileInput').click();
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
            category: newCategories
        });
    };

    const handleSelectOptionChange = (selectedOptions) => {
        const newOptions = selectedOptions.map(option => ({
            optionId: option.value,
            optionName: option.label
        }));
        setInputMenu({
            ...inputMenu,
            option: newOptions
        });
    };

    // const handleMenuSubmitOnClick = () => {
    //     addMenuMutation.mutateAsync();
    // }


    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>메뉴 관리</p>
                </div>
                <div>
                    <div css={s.imgContainer}>
                        <div css={s.imgBox}>
                            <div css={s.img}>
                                <img src={previewImg} alt="" onClick={handleImageClick} />
                            </div>
                            <input type="file" accept="image/*"  id="fileInput" onChange={handleimgUrlOnChange} />
                            <input type="text" value={previewImg.name} readOnly />
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
                                                label: category.categoryName // 오타 수정
                                            })) || []} // options에도 변환된 데이터 사용
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
                                    <input type="text" css={s.input} name="menuName" onChange={handleInputMenuOnChange}/>
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메뉴 가격 : </p>
                                    </div>
                                    <input type="text" css={s.input} name="menuPrice" onChange={handleInputMenuOnChange}/>
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
                                            label: option.optionName // 오타 수정
                                        })) || []} // options에도 변환된 데이터 사용
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
                                    <textarea  css={s.input} name="comment" onChange={handleInputMenuOnChange}></textarea>
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
        </>
    );
}

export default AdminMenuAddPage;
