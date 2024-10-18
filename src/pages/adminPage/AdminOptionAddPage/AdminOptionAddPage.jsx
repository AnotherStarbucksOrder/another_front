/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { Radio } from "pretty-checkbox-react";

function AdminOptionAddPage(props) {


    const handleBackOnClick = () => {
        window.history.back();
    }

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <p>옵션 관리</p>
                </div>
                <div css={s.Container}>
                    <div css={s.infoContainer}>
                        <div css={s.infoBox}>
                            <div css={s.option}>
                                <p css={s.optionTitle}>옵션 명 : </p>
                                <input type="text" css={s.selectContainer} />
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
                            <button>등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminOptionAddPage;
