import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { defaultOrders, ordersAtom } from '../../atoms/ordersAtom';
import Swal from 'sweetalert2';
import { useMutation, useQuery } from 'react-query';
import { instance } from '../../apis/util/instance';

// 포인트 적립 - 확인버튼 컴포넌트
function ConfirmButton({ inputValue, updateNewPhoneNumber }) {
    
    const navigate = useNavigate();

    const [ orders, setOrders ] = useRecoilState(ordersAtom);
    const phoneNumber = orders.user.phoneNumber;
    
    // 전화번호 조회로 해당 user 가져오기 
    // 사용가능한 쿠폰이 없으면 뒤로가기, 있다면 쿠폰 사용페이지로 이동 
    const getUserInfo = useQuery(
        ["getUserQuery"],
        async () => await instance.get(`/point/user/reward?phoneNumber=${phoneNumber}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            enabled: false,
            onSuccess: response => {
                // userId가 존재하면, atom에 업데이트 후 point 페이지로 이동 
                if(response.data.userId !== 0) {
                    setOrders(order => ({
                        ...order,
                        user: {
                            ...order.user,
                            userId: response.data.userId,
                            coupons: response.data.coupons.map(item => ({
                                couponId: item.couponId,
                                couponName: item.couponName,
                                registerDate: item.registerDate
                            }))
                        }
                    }))
                    navigate("/payment/point");
                }
            },
            // userId 없는 경우 & 사용가능한 쿠폰이 없는 경우
            onError: e => {
                setOrders(order => ({
                    ...order,
                    paymentType: 0,
                    user:  {
                        userId: 0,            
                        phoneNumber: "010-",
                        coupons: []
                    }
                }))
                Swal.fire({
                    title: e.response.data,
                    color: "#036635",
                    showConfirmButton: true,
                    confirmButtonText: "확인",
                    confirmButtonColor:"#459661"
                }).then(result => {
                    navigate(-1)
                })
            }
        }
    )    

    // 확인버튼 클릭 시
    const handleConfirmOnClick = () => {

        if(inputValue.length !== 13) {
            updateNewPhoneNumber("010-");
                Swal.fire({
                title: "올바르지않은 전화번호입니다.\n다시입력해주세요",
                color: "#036635",
                showConfirmButton: true,
                confirmButtonText: "확인",
                confirmButtonColor: "#459661",
            });
            return;
        }

        setOrders(order => ({
            ...order,
            user: {
                ...order.user,
                phoneNumber: inputValue
            }
        }))

        // 카드 결제로 들어온 거 
        if(orders.paymentType === 1){
            orderData();
            return;
        }
        // 쿠폰 결제로 들어온 거 
        getUserInfo.refetch();
    }

    // 결제 완료 데이터 + 전화번호 담아서 전송 
    const orderData = () => {
        const orderData = {
            paymentId: orders.paymentId,
            totalAmount: orders.amount,
            orderType: orders.orderType,
            paymentType: orders.paymentType,
            totalQuantity: orders.quantity,
            customer: {
                userId: orders.user.userId,
                phoneNumber: orders.user.phoneNumber,
                usedCoupon: orders.user.usedCoupon.map(coupon => coupon.couponId) 
            },
            products: orders.products.map(item => ({
                id: item.menuId,
                name: item.menuName + "(" + item.options.map(option => option.optionName + "-" + option.optionDetailValue).join(', ') + ")",
                amount: item.totalPrice,
                quantity: item.count,
            })) 
        };
        orderMutation.mutateAsync(orderData);
    };

    // 결제 완료 데이터 저장 mutation
    const orderMutation = useMutation(
        async (orderData) => await instance.post('/order', orderData),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: () => {
                let timerInterval;
                Swal.fire({
                    title: "결제가 완료되었습니다!",
                    color: "#036635",
                    html: "<b>5</b>초 뒤 자동으로 홈화면으로 이동합니다!",
                    timer: 5000,
                    timerProgressBar: false,
                    showConfirmButton: false,
                    didOpen: () => {
                        const b = Swal.getHtmlContainer().querySelector('b');
                        timerInterval = setInterval(() => {
                            b.textContent = Math.ceil(Swal.getTimerLeft()/1000);
                        }, 1000)
                    },
                    willClose: () => {
                        clearInterval(timerInterval);  
                    }
                }).then(result => {
                    setOrders(defaultOrders);
                    navigate("/");
                })
            }
        }
    );

    return (
        <button onClick={handleConfirmOnClick}>확인</button>
    )
}

export default ConfirmButton;