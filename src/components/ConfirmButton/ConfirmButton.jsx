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
    
    // 전화번호로 point랑 userId 가져오기
        const getUserInfo = useQuery(
        ["getUserQuery"],
        async () => await instance.get(`/point/user/${phoneNumber}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setOrders(orders => ({
                    ...orders,
                    user: {
                        ...orders.user,
                        userId: response.data.userId,
                        totalPoint: response.data.totalPoint
                    }
                }))
                if(orders.paymentType === "card") {
                    navigate("/payment/card")
                    return;
                }
                if(orders.paymentType === "point") {
                    if(response.data.totalPoint < 4000) {
                        Swal.fire({
                            title: `사용가능한 포인트 개수가 부족합니다 \n 보유포인트: ${response.data.totalPoint}`,
                            showConfirmButton: true,
                            showCancleButton: false
                        }).then(result => {
                            navigate(-1)
                        })
                        return;
                    }
                    navigate("/payment/point")
                }
            },
            enabled: false,
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

        getUserInfo.refetch();
    }

    return (
        <button onClick={handleConfirmOnClick}>확인</button>
    )
}

export default ConfirmButton;