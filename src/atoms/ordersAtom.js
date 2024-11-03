import { atom } from "recoil";

export const ordersAtom = atom({
    key: "ordersState",
    default: {
        orderType: 0,          
        paymentType: 0,        
        amount: 0,              // 총 가격         
        quantity: 0,            // 총 수량
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
export const portoneData = {
    storeId: "store-ccaa5637-3226-4a54-b96c-a1cc9c70bbe4",
    customer: {},           // 줘야해
    orderType: 0,           // 줘야해
    paymentId: "",          // 줘야해 
    orderName: "AnotherStarbucks", 
    totalAmount: 0,         // 줘야해
    currency: 'CURRENCY_KRW',
    locale: 'KO_KR',
    channelKey: "channel-key-fbf79352-9ad6-4d07-b0c6-0a5d1504f884",
    payMethod: 'EASY_PAY',
    products: [             // 줘야해
        
    ],           
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
}

/*
    paymentId
    totalAmount
    totalQuantity
    orderType
    paymentType
    customer: {
        userId
        phoneNumber
        usedCoupon
    },
    products(+옵션)
*/