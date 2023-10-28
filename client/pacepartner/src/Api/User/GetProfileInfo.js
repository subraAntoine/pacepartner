import axios from "axios";




const getProfileInfo = async (userId) => {
    try {
        const response = await axios.post(`http://localhost:3002/users/userAllInfo`, {
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