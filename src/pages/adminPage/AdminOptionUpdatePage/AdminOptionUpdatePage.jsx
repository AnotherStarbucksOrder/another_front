/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useParams } from "react-router-dom"; // useParams 임포트
import AdminPageSideBar from "../../../components/AdminPageSideBar/AdminPageSideBar";
import * as s from "./style";
import { Radio } from "pretty-checkbox-react";

function AdminOptionUpdatePage(props) {
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
            <AdminPageSideBar />
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>옵션 관리</p>
                </div>
                <div css={s.Container}>
                    <div css={s.infoContainer}>
                        <div css={s.infoBox}>
                            <div css={s.option}>
                                <p css={s.optionTitle}>코드 번호 : </p>
                                <input type="text" css={s.selectContainer} disabled value={order ? order.orderId : ''} />
                            </div>
                            <div css={s.option}>
                                <p css={s.optionTitle}>옵션 명 : </p>
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
                                    <div css={s.inputBox}>
                                        <input type="text" />
                                        <input type="text" />
                                        <p>원</p>
                                    </div>
                                    <button>x</button>
                                </div>
                            </div>
                        </div>
                        <div css={s.buttonBox}>
                            <button onClick={handleBackOnClick}>취소</button>
                            <button>수정</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminOptionUpdatePage;
