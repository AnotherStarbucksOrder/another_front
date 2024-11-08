/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import { Radio } from "pretty-checkbox-react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminOptionUpdatePage(props) {
    const { optionId } = useParams();
    const navigate = useNavigate();
    const [initailData, setInitailData] = useState({
        optionId: 0,
        optionName: "",
        optionStatus: 0,
        optionDetail: [{
            optionDetailValue: "",
            optionDetailPrice: 0
        }]
    })
    const [modifyOptionData, setModifyOptionData] = useState({
        optionId: 0,
        optionName: "",
        optionStatus: 0,
        optionDetail: [{
            optionDetailValue: "",
            optionDetailPrice: 0
        }]
    })

    // 옵션 상세 조회
    const option = useQuery(
        ["optionQuery", optionId],
        async () => await instance.get(`/admin/option/${optionId}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                setInitailData(response?.data);
                const { optionDetail, ...rest } = response?.data;

                // optionDetail에서 optionDetailId를 제외한 새로운 배열 생성
                const filteredOptionDetail = optionDetail.map(({ optionDetailId, ...restDetail }) => restDetail);

                setModifyOptionData({ ...rest, optionDetail: filteredOptionDetail });
            }
        }
    )

    // 옵션 수정
    const modifyOptionMutation = useMutation(
        async (data) => await instance.patch(`/admin/option/${optionId}`, data),
        {
            onSuccess: () => {
                alert("수정되었습니다.")
                navigate("/admin/option")
            }
        }
    )

    const handleOptionInputOnChange = (e) => {
        setModifyOptionData(modifyOptionData => ({
            ...modifyOptionData,
            [e.target.name]: e.target.value
        }))
    }

    const handleOptionStatusChange = (e) => {
        setModifyOptionData(modifyOptionData => ({
            ...modifyOptionData,
            optionStatus: Number(e.target.value)
        }));
    }

    const handleDetailInputOnChange = (index, e) => {
        const newValue = [...modifyOptionData.optionDetail];

        if (e.target.name === "optionDetailPrice") {
            newValue[index][e.target.name] = Number(e.target.value);
        } else {
            newValue[index][e.target.name] = e.target.value;
        }

        setModifyOptionData(modifyOptionData => ({
            ...modifyOptionData,
            optionDetail: newValue
        }));
    };

    const handleAddDetail = () => {
        setModifyOptionData(modifyOptionData => ({
            ...modifyOptionData,
            optionDetail: [
                ...modifyOptionData.optionDetail, {
                    optionDetailValue: "",
                    optionDetailPrice: 0
                }]
        }));
    };

    // 해당 인덱스 삭제
    const handleRemoveDetail = (index) => {
        const newValue = modifyOptionData.optionDetail.filter((_, i) => i !== index);
        setModifyOptionData(modifyOptionData => ({
            ...modifyOptionData,
            optionDetail: newValue
        }));
    };

    const handleModifySubmitOnClick = () => {
        modifyOptionMutation.mutateAsync(modifyOptionData);
    }

    const handleBackOnClick = () => {
        setModifyOptionData(initailData);
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
                                <p css={s.optionTitle}>코드 번호 : </p>
                                <input type="text" css={s.selectContainer} 
                                    value={modifyOptionData.optionId} disabled />
                            </div>
                            <div css={s.option}>
                                <p css={s.optionTitle}>옵션 명 : </p>
                                <input type="text" name="optionName"
                                    value={modifyOptionData.optionName}
                                    css={s.selectContainer}
                                    onChange={handleOptionInputOnChange} />
                            </div>
                            <div css={s.option}>
                                <div css={s.optionTitle}>
                                    <p>노출 여부</p>
                                </div>
                                <div css={s.radioBox}>
                                    <Radio css={s.radio} name="optionStatus" 
                                        value={1} checked={modifyOptionData.optionStatus === 1} 
                                        onChange={handleOptionStatusChange}>사용</Radio>
                                    <Radio name="optionStatus" value={0} 
                                        checked={modifyOptionData.optionStatus === 0} 
                                        onChange={handleOptionStatusChange} bigger>미사용</Radio>
                                </div>
                            </div>
                            <div css={s.registerContainer}>
                                <div css={s.registerMenu}>
                                    <p>OptionList</p>
                                    <button onClick={handleAddDetail}>+</button>
                                </div>
                                <div css={s.menuContainer}>
                                    {
                                        modifyOptionData.optionDetail.map((detail, index) => {
                                            return (
                                                <div key={index} css={s.menuBox}>
                                                    <div css={s.inputBox}>
                                                        <input
                                                            type="text"
                                                            name="optionDetailValue"
                                                            value={detail.optionDetailValue}
                                                            onChange={(e) => handleDetailInputOnChange(index, e)}
                                                        />
                                                        <input
                                                            type="text"
                                                            name="optionDetailPrice"
                                                            value={detail.optionDetailPrice}
                                                            onChange={(e) => handleDetailInputOnChange(index, e)}
                                                        />
                                                        <p>원</p>
                                                    </div>
                                                    <button type="button" onClick={() => handleRemoveDetail(index)}>x</button>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div css={s.buttonBox}>
                            <button onClick={handleBackOnClick}>취소</button>
                            <button onClick={handleModifySubmitOnClick}>수정</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminOptionUpdatePage;
