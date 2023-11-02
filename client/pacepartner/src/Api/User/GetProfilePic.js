import axios from "axios";
import config from "../../config";

const GetProfilePic = async (id) => {
    try{
        const response = axios.get(`${config.apiUrl}/users/userProfilePic/${id}`, {withCredentials: true});
        return response;
    } catch (err) {
        return err;
    }

}

export default GetProfilePic;