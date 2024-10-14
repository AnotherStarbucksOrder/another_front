import React, { useState } from 'react'
import MainTop from '../../../components/MainTop/MainTop';
import MainTopBar from '../../../components/MainTopBar/MainTopBar';
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

function RewardPage() {

    const navigate = useNavigate();


    const [ inputValue, setInputValue ] = useState("010-");

    // 상단에 x 버튼 클릭 시
    const handleOrderCancleOnClick = () => {
        navigate("/payment");
    }

    const formatPhoneNumber = (number) => {
        number = number.replace(/^010/g, "");
        if (number.length < 4) {
            return `010-${number}`; 
        } else {
            return `010-${number.slice(0, 4)}-${number.slice(4, 8)}`; 
        }
    };

    // 키패드 onChange
    const handleInputOnChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setInputValue(formatPhoneNumber(value));
    }


    const handleKeyPadOnClick = (value) => {
        if(value === "backspace") {
            if(inputValue.length === 4) {
                return;
            }
            setInputValue(inputValue => inputValue.slice(0, -1));
            return;
        }
        if(value === "confirm") {
            if(inputValue.length !== 13) {
                Swal.fire({
                    title: "올바르지않은 전화번호입니다.\n다시입력해주세요",
                    showConfirmButton: true,
                    confirmButtonText: "네",
                    confirmButtonColor: "#036635"
                }).then(result => {
                    setInputValue("010-");
                })
                return;
            }
            navigate("/payment/card");
            return;
        }
        const onlyNumbers = inputValue.replace(/[^0-9]/g, ""); // 숫자만 남기기
        const newValue = onlyNumbers + value; // 숫자만 추가
        setInputValue(formatPhoneNumber(newValue)); // 포맷된 값으로 업데이트
    } 


    
    return (
    <>
        <MainTop/>
        <MainTopBar/>
        <div css={s.layout}>
            <button onClick={handleOrderCancleOnClick}><FontAwesomeIcon icon={faXmark} /></button>
            <div css={s.container}>
                <div css={s.phoneNumber}>
                    <p>포인트번호를 입력해주세요</p>
                    <input type="text" 
                        value={inputValue}
                        onChange={handleInputOnChange} 
                        maxLength={13}
                    />
                </div>
                <div css={s.numberPad}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, "backspace", 0, "confirm"].map((key) => (
                    <button 
                        key={key} 
                        onClick={() => handleKeyPadOnClick(key)}
                    >
                        {key === "backspace" ? "⌫" : key === "confirm" ? "확인" : key}
                    </button>
                    ))}
                </div>
            </div>
        </div>
    </>
    )
}

export default RewardPage;