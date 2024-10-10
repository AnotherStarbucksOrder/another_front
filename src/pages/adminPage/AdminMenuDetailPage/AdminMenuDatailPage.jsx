/** @jsxImportSource @emotion/react */
import { useState } from "react";
import AdminPageSideBar from "../../../components/AdminPageSideBar/AdminPageSideBar";
import * as s from "./style";
import ReactSelect from "react-select";

function AdminMenuDatailPage(props) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [menus, setMenus] = useState([
        { menuId: 1, menuName: "불고기 비빔밥", price: 8000, category: "한식", option: "계란 추가", comment:"221ddq" },
        { menuId: 2, menuName: "치킨 너겟", price: 6000, category: "패스트푸드", option: "소스 선택", comment:"221ddq" },
        { menuId: 3, menuName: "카페라떼", price: 4500, category: "음료", option: "샷 추가", comment:"221ddq" },
    ]);

    const options = [
        { value: '한식', label: '한식' },
        { value: '패스트푸드', label: '패스트푸드' },
        { value: '음료', label: '음료' }
    ]

    const handleSelectChange = (options) => {
        setSelectedOptions(options); // 선택한 값을 상태에 저장
    };

    return (
        <>
            <AdminPageSideBar />
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>메뉴 관리</p>
                </div>
                <div css={s.imgContainer}>
                    <div css={s.imgBox}>
                        <div css={s.img}>
                            <img src="https://flexible.img.hani.co.kr/flexible/normal/640/512/imgdb/original/2024/0403/20240403501300.jpg" alt="" />
                        </div>
                        <p>이미지</p>
                    </div>
                    <div css={s.infoContainer}>
                        <div css={s.infoBox}>
                            <div>
                                <div css={s.option}>
                                    <p>카테고리 : </p>
                                    <div css={s.selectContainer}>
                                        <ReactSelect
                                            isMulti
                                            name="colors"
                                            onChange={handleSelectChange}
                                            options={options}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div css={s.selectedOption}>
                                {selectedOptions && selectedOptions.map(option => (
                                    <span key={option.value}>{option.label}</span>
                                ))}
                            </div>
                        </div>
                        <div css={s.infoBox}>
                            <div css={s.option}>
                                <p>메뉴 이름 : </p>
                                {
                                    menus.filter(menu => menu.menuId === 1).map(menu => (
                                        <input type="text" key={menu.menuId} css={s.selectContainer} disabled value={menu.menuName} />
                                    ))
                                }
                            </div>
                        </div>
                        <div css={s.infoBox}>
                            <div css={s.option}>
                                <p>메뉴 가격 : </p>
                                {menus.filter(menu => menu.menuId === 1).map(menu => (
                                    <input key={menu.menuId} type="text" css={s.selectContainer} disabled value={menu.price} />
                                ))}
                            </div>
                        </div>
                        <div css={s.infoBox}>
                            <div css={s.option}>
                                <p>메뉴 옵션 : </p>
                                {menus.filter(menu => menu.menuId === 1).map(menu => (
                                    <input key={menu.menuId} type="text" css={s.selectContainer} disabled value={menu.option} />
                                ))}
                            </div>

                        </div>
                        <div css={s.infoBox}>
                            <div css={s.option}>
                                <p>메뉴 설명 : </p>
                                {menus.filter(menu => menu.menuId === 1).map(menu => (
                                <textarea name="" id={menu.menuId} css={s.selectContainer} disabled value={menu.comment}></textarea>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminMenuDatailPage;