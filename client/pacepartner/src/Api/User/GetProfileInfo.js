import axios from "axios";
import config from "../../config";




const getProfileInfo = async (userId) => {
    try {
        const response = await axios.post(`${config.apiUrl}/users/userAllInfo`, {
            userId: userId
        }, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
}




export default getProfileInfo;