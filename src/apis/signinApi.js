import { instance } from "./util/instance"

export const signinApi = async (user) => {
    let signinData = {
        isSucess: false,
        token: null,
        fieldErrors: [
            {
                field: "",
                defaultMessage: ""
            }
        ]
    }

    try {
        const response = await instance.post("/auth/signin", user);
        console.log(response);
        signinData = {
            isSucess: true,
            token: response.data,
        }
    }catch (error) {
        const response = error;
        console.error(response);

        signinData = {
            isSucess: false
        }

        if (response.data === 'string') {
            signinData['errorStatus'] = "loginError";
            signinData['error'] = response.data
        } else {
            signinData['errorStatus'] = "fieldError";
            signinData['error'] = response?.data.map(fieldError => ({
                field: fieldError.field,
                defaultMessage: fieldError.defaultMessage
            }));
        }
    }
    return signinData;
}