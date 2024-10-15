import { atom } from "recoil";

export const ordersAtom = atom({
    key: "ordersState",
    default: {
        orderType: "",
        paymentType: "",
        user: {
            phoneNumber: "010-"
        }
    }
})
