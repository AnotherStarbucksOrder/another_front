/** @jsxImportSource @emotion/react */
import * as s from "./style";
import ReactSelect from "react-select";
import { useState } from "react";

function AdminMenuAddPage(props) {

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };
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
                                <img src={image} alt="" onClick={handleImageClick} />
                            </div>
                            <input type="file" accept="image/*" onChange={handleChange} id="fileInput" />
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
                                            // onChange={handleSelectCategoryChange}
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
                                    <input type="text" css={s.input} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메뉴 가격 : </p>
                                    </div>
                                    <input type="text" css={s.input} />
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
                                        // onChange={handleSelectOptionChange}
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
                                    <textarea name="" css={s.input} ></textarea>
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
