import { instance } from "./util/instance"

export const signinApi = async (user) => {
    let signinData = {
        isSucess: false,
        token: null,
    }

    try {
        const response = await instance.post("/auth/signin", user);
        signinData = {
            isSucess: true,
            token: response.data,
        }
    }catch (error) {
        const response = error;
        console.error(response.response.data);

        signinData = {
            isSucess: false
        }
    }
    return signinData;
}