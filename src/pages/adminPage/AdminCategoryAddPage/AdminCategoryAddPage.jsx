/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useParams } from "react-router-dom"; // useParams 임포트
import * as s from "./style";
import { Radio } from "pretty-checkbox-react";

function AdminCategoryAddPage(props) {
    const { orderId } = useParams(); // URL에서 menuId 가져오기

    const [orders] = useState([
        { orderId: 1, orderStatus: "완료", orderType: "카트", price: 1000, orderDate: "2024-01-01", orders: "sadsadsa" },
        { orderId: 2, orderStatus: "취소", orderType: "포인트", price: 2300, orderDate: "2024-01-01", orders: "dasdsada" },
        { orderId: 3, orderStatus: "완료", orderType: "카드", price: 20000, orderDate: "2024-01-01", orders: "dasdsa" },
    ]);

    const order = orders.find(order => order.orderId === parseInt(orderId)); // menuId에 해당하는 메뉴 찾기

    const handleBackOnClick = () => {
        window.history.back();
    }

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>카테고리 관리</p>
                </div>
                <div css={s.Container}>
                    <div css={s.infoContainer}>
                        <div css={s.infoBox}>
                            <div css={s.option}>
                                <p css={s.optionTitle}>카테고리 명 : </p>
                                <input type="text" css={s.selectContainer} value={order ? order.orderId : ''} />
                            </div>
                            <div css={s.option}>
                                <div css={s.optionTitle}>
                                    <p>노출 여부</p>
                                </div>
                                <div css={s.radioBox}>
                                    <Radio css={s.radio} name="b">사용</Radio>
                                    <Radio name="b" bigger>미사용</Radio>
                                </div>
                            </div>
                            <div css={s.registerContainer}>
                                <div css={s.registerMenu}>
                                    <p>등록메뉴</p>
                                    <button>+</button>
                                </div>
                                <div css={s.menuBox}>
                                    <p>아메리카노</p>
                                    <button>x</button>
                                </div>
                            </div>
                        </div>
                        <div css={s.buttonBox}>
                            <button onClick={handleBackOnClick}>취소</button>
                            <button>등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminCategoryAddPage;
