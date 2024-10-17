import { atom } from "recoil";

export const ordersAtom = atom({
    key: "ordersState",
    default: {
        orderType: "",
        paymentType: "",
        user: {
            phoneNumber: "010-"
        },
        menuCart: {
            menuId: "",
            options: [
                // 당도: 덜달게(optionDetailId)
                {menuDetailId: ""},
            ]
        }
    }
})
