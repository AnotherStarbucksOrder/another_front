/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import { Radio } from "pretty-checkbox-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { instance } from "../../../apis/util/instance";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPlus } from "react-icons/fa6";

function AdminOptionAddPage(props) {
    const navigate = useNavigate();

    const [inputOptionData, setInputOptionData] = useState({
        optionName: "",
        optionStatus: 1,
        optionDetail: [{
            optionDetailValue: "",
            optionDetailPrice: 0
        }]
    })

    // 옵션 추가
    const addOptionMutation = useMutation(
        async () => await instance.post("/admin/option", inputOptionData),
        {
            onSuccess: () => {
                alert("등록되었습니다.");
                navigate("/admin/option")
            }
        }
    )

    const handleOptionInputOnChange = (e) => {
        setInputOptionData({
            ...inputOptionData,
            [e.target.name]: e.target.value
        })
    }

    const handleOptionStatusChange = (e) => {
        setInputOptionData(inputOptionData => ({
            ...inputOptionData,
            optionStatus: Number(e.target.value)
        }));
    };

    // 옵션 디테일 추가 시 인덱스 추가
    const handleDetailInputOnChange = (index, e) => {
        const newValue = [...inputOptionData.optionDetail];
        newValue[index][e.target.name] = e.target.value;
        setInputOptionData({
            ...inputOptionData,
            optionDetail: newValue
        });
    };

    const handleAddDetail = () => {
        setInputOptionData({
            ...inputOptionData,
            optionDetail: [
                ...inputOptionData.optionDetail, { 
                optionDetailValue: "",
                optionDetailPrice: 0 
            }]
        });
    };

    // 선택된 인덱스 삭제
    const handleRemoveDetail = (index) => {
        const newValue = inputOptionData.optionDetail.filter((_, i) => i !== index);
        setInputOptionData({
            ...inputOptionData,
            optionDetail: newValue
        });
    };

    const handleSubmitOptionOnClick = async () => {
        try{
            await addOptionMutation.mutateAsync();
        } catch (e) {
            if(e.status === 401) {
                alert(e.response.data.defaultMessage.optionName);
            } else {
                alert(e.response.data);
            }
        }
    }

    const handleBackOnClick = () => {
        window.history.back();
    }

    return (
        <>
            <div css={s.layout}>
                <div css={s.titleBox}>
                    <div css={s.container}>
                        <div css={s.infoContainer}>
                            <div css={s.infoBox}>
                                <div css={s.option}>
                                    <p css={s.optionTitle}>옵션 명</p>
                                    <input type="text" name="optionName" 
                                        css={s.selectContainer} 
                                        onChange={handleOptionInputOnChange} />
                                </div>
                                <div css={s.option}>
                                    <div css={s.optionTitle}>
                                        <p>노출 여부</p>
                                    </div>
                                    <div css={s.radioBox}>
                                        <Radio 
                                            name="optionStatus" 
                                            value={1} 
                                            checked={inputOptionData.optionStatus === 1} 
                                            onChange={handleOptionStatusChange}
                                        >
                                            사용
                                        </Radio>
                                        <Radio 
                                            name="optionStatus" 
                                            value={0}
                                            checked={inputOptionData.optionStatus === 0}
                                            onChange={handleOptionStatusChange}
                                        >
                                            미사용
                                        </Radio>
                                    </div>
                                </div>
                                <div css={s.registerContainer}>
                                    <div css={s.registerMenu}>
                                        <p>OptionList</p>
                                        <button onClick={handleAddDetail}><FaPlus /></button>
                                    </div>
                                    <div css={s.menuContainer}>
                                        {
                                            inputOptionData.optionDetail.map((detail, index) => {
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
                                                        <button onClick={() => handleRemoveDetail(index)}><FontAwesomeIcon icon={faXmark} /></button>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div css={s.buttonBox}>
                                <button onClick={handleBackOnClick}>취소</button>
                                <button onClick={handleSubmitOptionOnClick}>등록</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminOptionAddPage;
