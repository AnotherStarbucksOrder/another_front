import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import { ordersAtom } from '../../atoms/ordersAtom';


// 포인트 적립 - 확인버튼 컴포넌트
function ConfirmButton({ inputValue, updateNewPhoneNumber }) {
    
    const navigate = useNavigate();

    // const orders = useRecoilValue(ordersAtom);

    const [ orders, setOrders ] = useRecoilState(ordersAtom);
    
    const hasPoint = 10;
    const yourPoint = 8;


        const handleConfirmOnClick = () => {
            if(inputValue.length !== 13) {
                Swal.fire({
                    title: "올바르지않은 전화번호입니다.\n다시입력해주세요",
                    showConfirmButton: true,
                    confirmButtonText: "네",
                    confirmButtonColor: "#036635",
                }).then(result => {
                    updateNewPhoneNumber("010-")
                });
                return;
            }

            if (orders.paymentType === "point") {
                if(hasPoint >= 10) {
                    navigate("/payment/point");  
                    return
                }
                Swal.fire({
                    title: `사용가능한 포인트 개수가 부족합니다.\n보유포인트개수: ${yourPoint}개`,
                    showConfirmButton: true,
                    confirmButtonText: "네",
                    confirmButtonColor: "#036635"
                }).then(result => {
                    setOrders(orders => ({
                        ...orders,
                        paymentType: "",
                        user: {
                            phoneNumber: ""
                        }
                    }))
                    navigate("/payment")
                })
            } else if (orders.paymentType === "card") {
                navigate("/payment/card");  
            }
        }

    return (
        <button onClick={handleConfirmOnClick}>확인</button>
    )
}

export default ConfirmButton;