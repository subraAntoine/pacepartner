import axios from "axios";
const getUserInfo = async (userId) => {
    try {
        const response = await axios.post(`http://localhost:3002/users/user`, {

        }, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default getUserInfo;