import { atom } from "recoil";

export const ordersAtom = atom({
    key: "ordersState",
    default: {
        orderType: 0,          
        paymentType: "",        
        amount: 0,              // 총 가격         
        quantity: 0,            // 총 수량
        user: {                 
            phoneNumber: "010-",
            point: 0
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
    customer: {},
    orderType: 0,
    paymentId: "", 
    orderName: "AnotherStarbucks",
    totalAmount: 0, 
    currency: 'CURRENCY_KRW',
    locale: 'KO_KR',
    channelKey: "channel-key-fbf79352-9ad6-4d07-b0c6-0a5d1504f884",
    payMethod: 'EASY_PAY',
    products: [],
    windowType: {
        pc: 'IFRAME',
    }
};

// ordersAtom 초기화 
export const defaultOrders = {
    orderType: 0,          
    paymentType: "",        
    amount: 0,                      
    quantity: 0,            
    user: {                 
        phoneNumber: "010-",
        point: 0
    },
    products: [],
};



/*
    *포트원형식*
    {
        "merchantId": "your_merchant_id",
        "orderId": "order_123456",          // 보류
        "amount": 12000,                    // 예시 금액 (아메리카노 + 샷 추가 + 라떼 + 휘핑 추가)
        "currency": "KRW",
        "productList": [
            {
                "productName": "아메리카노",
                "productCode": "americano_001",
                "quantity": 1,
                "options": [
                    {
                        "optionName": "샷 추가",
                        "optionCode": "shot_add"
                    }
                ]
            },
            {
                "productName": "라떼",
                "productCode": "latte_001",
                "quantity": 1,
                "options": [
                    {
                        "optionName": "휘핑 추가",
                        "optionCode": "whipped_add"
                    }
                ]
            }
        ],
        "totalQuantity" : 2
        "transactionType": "payment",
        "callbackUrl": "https://yourcallback.url",
        "userIp": "192.168.1.1",
        "device": "kiosk"
    }

    요청부분 
        PortOne.requestPayment({
            storeId: "store-ccaa5637-3226-4a54-b96c-a1cc9c70bbe4",
            paymentId: crypto.randomUUID(),                              
            orderName: "anotherStarbucks",
            totalAmount: 100,                                
            currency: 'CURRENCY_KRW',
            locale: 'KO_KR',
            channelKey: "channel-key-fbf79352-9ad6-4d07-b0c6-0a5d1504f884",
            payMethod: 'EASY_PAY',
            products: orders.products.map(product => ({
                id: product.menuId,
                name:product.menuName,
                amount:product.totalPrice,
                quantity: product.count,
            })),
            windowType: {
                pc: 'IFRAME',
            },

*/