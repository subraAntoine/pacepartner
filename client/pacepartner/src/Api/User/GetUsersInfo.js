import axios from "axios";
import config from "../../config";

const GetUsersInfo = async (users) => {
    try{

        const data = {
            usersId: users
        }

        console.log(users)

        const response = await axios.post(`${config.apiUrl}/users/userProfileInfos`, data, {withCredentials: true})
        return response;
    } catch (err) {
        return err;
    }

}

export default GetUsersInfo