import { atom } from "recoil";

export const ordersAtom = atom({
    key: "ordersState",
    default: {
        orderType: "",
        paymentType: "",
        orderAmount: "",
        user: {
            phoneNumber: "010-"
        },
        menuCart: []
    }
})
