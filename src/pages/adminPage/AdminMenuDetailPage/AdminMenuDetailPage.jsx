/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useParams } from "react-router-dom"; // useParams 임포트
import AdminPageSideBar from "../../../components/AdminPageSideBar/AdminPageSideBar";
import * as s from "./style";
import ReactSelect from "react-select";

function AdminMenuDetailPage(props) {
    const { menuId } = useParams(); // URL에서 menuId 가져오기
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState("https://flexible.img.hani.co.kr/flexible/normal/640/512/imgdb/original/2024/0403/20240403501300.jpg");

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


    const [menus, setMenus] = useState([
        { menuId: 1, menuName: "불고기 비빔밥", price: 8000, category: "한식", option: "계란 추가", comment: "221ddq" },
        { menuId: 2, menuName: "치킨 너겟", price: 6000, category: "패스트푸드", option: "소스 선택", comment: "221ddq" },
        { menuId: 3, menuName: "카페라떼", price: 4500, category: "음료", option: "샷 추가", comment: "221ddq" },
    ]);



    const menu = menus.find(menu => menu.menuId === parseInt(menuId)); // menuId에 해당하는 메뉴 찾기

    const handleBackOnClick = () => {
        window.history.back();
    }

    const handleEditOnClick = () => {
        setIsEditing(true);
    }
    const handleConfirmOnClick = () => {
        setIsEditing(false); // 수정 모드 해제
    }
    const handleCancleOnClick = () => {
        setIsEditing(false);
    }


    const handleSelectCategoryChange = (selectedOptions) => {
        // 선택한 값을 상태에 저장 (여기서는 카테고리를 업데이트하는 로직)
        if (menu) {
            const updatedMenu = { ...menu, category: selectedOptions.map(option => option.value) };
            setMenus(menus => menus.map(m => (m.menuId === menu.menuId ? updatedMenu : m)));
        }
    };
    const handleSelectOptionChange = (selectedOptions) => {
        // 선택한 값을 상태에 저장 (여기서는 카테고리를 업데이트하는 로직)
        if (menu) {
            const updatedMenu = { ...menu, option: selectedOptions.map(option => option.value) };
            setMenus(menus => menus.map(m => (m.menuId === menu.menuId ? updatedMenu : m)));
        }
    };

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
            <AdminPageSideBar />
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
                                            <img src={image} alt="" />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div css={s.img}>
                                            <img src={image} alt="" onClick={handleImageClick} />
                                        </div>
                                        <input type="file" accept="image/*" onChange={handleChange} id="fileInput" />
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
                                                    options={categoryOptions}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    defaultValue={menu ? [{ value: menu.category, label: menu.category }] : []}
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
                                    <input type="text" css={s.input} readOnly={!isEditing} value={menu ? menu.menuName : ""} />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메뉴 가격 : </p>
                                    </div>
                                    <input type="text" css={s.input} readOnly={!isEditing} value={menu ? menu.price : ""} />
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
                                                <input type="text" css={s.input} readOnly value={menu ? menu.option : ''} />
                                            </>
                                            :
                                            <ReactSelect
                                                isMulti
                                                isDisabled={!isEditing}
                                                css={s.select}
                                                name="categories"
                                                onChange={handleSelectOptionChange}
                                                options={optionOptions}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                defaultValue={menu ? [{ value: menu.option, label: menu.option }] : []}
                                            />
                                    }
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>메뉴 설명 : </p>
                                    </div>
                                    <textarea name="" css={s.input} readOnly={!isEditing} value={menu ? menu.comment : ""}></textarea>
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
