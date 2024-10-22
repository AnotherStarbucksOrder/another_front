import { atom } from "recoil";

export const ordersAtom = atom({
    key: "ordersState",
    default: {
        orderType: "",
        paymentType: "",
        orderAmount: "",
        orderQuantity: "",
        user: {
            phoneNumber: "010-"
        },
        menuCarts: []
    }
})
