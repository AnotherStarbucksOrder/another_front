import { atom } from "recoil";

export const ordersAtom = atom({
    key: "ordersState",
    default: {
        orderType: 0,          
        paymentType: 0,        
        amount: 0,                       
        quantity: 0,           
        paymentId: "",
        originalAmount: 0, 
        user: {     
            userId: 0,  
            usedCoupon: [
                // couponId: 0,
                // menuId: ""
            ],          
            phoneNumber: "010-",
            coupons: [
                // couponId: 0,         
                // couponName: "", 
                // registerDate: ""
            ]
        },
        products: [            
            // {
            //     menuId: menuId,
            //     menuName: "",
            //     options: [],
            //     menuPrice: 0,
            //     totalPrice: 0,
            //     count: 1,
            // },
        ],
    },
});

// 포트원 기본 데이터 형식 
// 백엔드 필요데이터 - customer, orderType, paymentId, totalAmount, products
export const portoneData = {
    storeId: process.env.REACT_APP_PORTONE_STORE_ID, 
    customer: {},           
    orderType: 0,          
    paymentId: "",          
    orderName: "AnotherStarbucks", 
    totalAmount: 0,        
    currency: 'CURRENCY_KRW',
    locale: 'KO_KR',
    channelKey: process.env.REACT_APP_PORTONE_CHANNEL_KEY,
    payMethod: 'EASY_PAY',
    products: [],           
    windowType: {
        pc: 'IFRAME',
    }
};

// ordersAtom 초기화 
export const defaultOrders = {
    orderType: 0,          
    paymentType: 0,        
    amount: 0,                      
    quantity: 0,   
    paymentId: "",  
    originalAmount: 0,        
    user: {     
        userId: 0,
        usedCoupon: [],            
        phoneNumber: "010-",
        coupons: []
    },
    products: [],
};