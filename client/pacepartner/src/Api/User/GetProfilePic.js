import axios from "axios";

const GetProfilePic = async (id) => {
    try{
        const response = axios.get(`http://localhost:3002/users/userProfilePic/${id}`, {withCredentials: true});
        return response;
    } catch (err) {
        return err;
    }

}

export default GetProfilePic;