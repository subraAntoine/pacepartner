import axios from "axios";
import config from "../../config";

const VerifyUser = async (emailToken) => {
    try {
        const response = await axios.get(`${config.apiUrl}/users/confirmEmail/${emailToken}`, {
        }, {
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export default VerifyUser;