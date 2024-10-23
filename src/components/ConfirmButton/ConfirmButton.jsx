import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ordersAtom } from '../../atoms/ordersAtom';
import Swal from 'sweetalert2';
import { useQuery } from 'react-query';
import { instance } from '../../apis/util/instance';

// 포인트 적립 - 확인버튼 컴포넌트
function ConfirmButton({ inputValue, updateNewPhoneNumber }) {
    
    const navigate = useNavigate();

    const [ orders, setOrders ] = useRecoilState(ordersAtom);
    const phoneNumber = orders.user.phoneNumber;
    
    const getUser = useQuery(
        ["getUserQuery"],
        async () => await instance.get(`/points/user/${phoneNumber}`),
        {
            onSuccess: response => {
                if(orders.paymentType === "card") {
                    setOrders(orders => ({
                        ...orders,
                        user: {
                            ...orders.user,
                            phoneNumber: phoneNumber
                        }
                    }))
                    navigate("/payment/card")
                }
                if(orders.paymentType === "point") {
                    navigate("/payment/point")
                }
            },
            enabled: false
        }
    )    

    // 확인버튼 클릭 시
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

        getUser.refetch();
    }

    return (
        <button onClick={handleConfirmOnClick}>확인</button>
    )
}

export default ConfirmButton;