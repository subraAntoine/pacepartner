import axios from "axios";
import config from "../../config";



const getUserInfo = async (userId) => {
    try {
        const response = await axios.post(`${config.apiUrl}/users/user`, {

        }, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
}




export default getUserInfo;