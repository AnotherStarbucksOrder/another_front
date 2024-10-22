/** @jsxImportSource @emotion/react */
import * as s from "./style";
import ReactSelect from "react-select";
import { useState } from "react";


function AdminMenuAddPage(props) {
    const [inputMenu, setInputMenu] = useState({
        menuId: 0,
        menuName: "",
        menuPrice: 0,
        imgUrl: "",
        comment: "",
        option: [{
            optionId: 0,
            optionName: ""
        }],
        category: [{
            categoryId: 0,
            categoryName: ""
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

    // 카테고리 옵션 배열
    const categoryOptions = [
        { value: "한식", label: "한식" },
        { value: "패스트푸드", label: "패스트푸드" },
        { value: "음료", label: "음료" },
    ];
    const optionOptions = [
        { value: "계란 추가", label: "계란 추가" },
        { value: "소스 선택", label: "소스 선택" },
        { value: "샷 추가", label: "샷 추가" },
    ];

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
                                <img src={inputMenu.imgUrl} alt="" onClick={handleImageClick} />
                            </div>
                            <input type="file" accept="image/*"  id="fileInput" />
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
                                            onChange={handleInputMenuOnChange}
                                            options={categoryOptions}
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
                                    <input type="text" css={s.input} id={inputMenu.menuName} onChange={handleInputMenuOnChange}/>
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메뉴 가격 : </p>
                                    </div>
                                    <input type="text" css={s.input} id={inputMenu.menuPrice} onChange={handleInputMenuOnChange}/>
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
                                        name="categories"
                                        onChange={handleInputMenuOnChange}
                                        options={optionOptions}
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
                                    <textarea name="" css={s.input} id={inputMenu.comment} onChange={handleInputMenuOnChange}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div css={s.buttonBox}>
                    <button onClick={handleBackOnClick}>취소</button>
                    <button>확인</button>
                </div>
            </div>
        </>
    );
}

export default AdminMenuAddPage;
