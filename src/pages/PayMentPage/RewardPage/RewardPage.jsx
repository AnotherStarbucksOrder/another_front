import React from 'react'
import MainTop from '../../../components/MainTop/MainTop';
import MainTopBar from '../../../components/MainTopBar/MainTopBar';
/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ConfirmButton from '../../../components/ConfirmButton/ConfirmButton';
import { useRecoilState } from 'recoil';
import { ordersAtom } from '../../../atoms/ordersAtom';

// 포인트 적립 페이지
function RewardPage() {

    const navigate = useNavigate();

    const [ orders, setOrders ] = useRecoilState(ordersAtom);
    const { phoneNumber: inputValue } = orders.user;

    // 상단에 x 버튼 클릭 시
    const handleOrderCancleOnClick = () => {
        setOrders(orders => ({
            ...orders,
            paymentType: 0,
            user: {
                ...orders.user,
                phoneNumber: "010-"
            }
        }))
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

    // Atom안에 번호만 업데이트 (객체 안에 객체)
    const updateNewPhoneNumber = (newPhoneNumber) => {
        setOrders(orders => ({
            ...orders,
            user: {
                ...orders.user,
                phoneNumber: newPhoneNumber
            }
        }))
    };
    

    // 키패드 onChange
    const handleInputOnChange = (e) => {
        const value = e.target.value;
        updateNewPhoneNumber(formatPhoneNumber(value));
    }

    const handleKeyPadOnClick = (value) => {

        if(value === "backspace") {
            if(inputValue.length > 4) { 
                const newValue = inputValue.slice(0, -1); 
                updateNewPhoneNumber(newValue);
                return;
            }
            return
        }

        const onlyNumbers = inputValue.replace(/[^0-9]/g, "");  // 숫자만 남기기
        const newValue = onlyNumbers + value;                   // 숫자만 추가
        updateNewPhoneNumber(formatPhoneNumber(newValue));      // 포맷된 값으로 업데이트
    }


    
    return (
    <>
        <MainTop/>
        <MainTopBar/>
        <div css={s.layout}>
            <button onClick={handleOrderCancleOnClick}><FontAwesomeIcon icon={faXmark} /></button>
            <div css={s.container}>
                <div css={s.phoneNumber}>
                    {
                        orders.paymentType === 1 
                        ?
                        <p>적립 할 번호를 입력해주세요</p>
                        :
                        <p>사용 할 번호를 입력해주세요</p>
                    }
                    <input type="text" 
                        value={inputValue}
                        onChange={handleInputOnChange} 
                        maxLength={13}
                    />
                </div>
                <div css={s.numberPad}>
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "backspace", "0"].map((key) => (
                    <button 
                        key={key} 
                        onClick={() => handleKeyPadOnClick(key)}
                    >
                        {key === "backspace" ? "⌫" : key}
                    </button>
                    ))}
                    <ConfirmButton inputValue={inputValue} updateNewPhoneNumber={updateNewPhoneNumber} />
                </div>
            </div>
        </div>
    </>
    )
}

export default RewardPage;