import axios from "axios";

const GetUsersInfo = async (users) => {
    try{

        const data = {
            usersId: users
        }

        console.log(users)

        const response = await axios.post(`http://localhost:3002/users/userProfileInfos`, data, {withCredentials: true})
        return response;
    } catch (err) {
        return err;
    }

}

export default GetUsersInfo