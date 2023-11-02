import axios from "axios";
import config from "../../config";

const handleLogout = async () => {
    try {
        const response = await axios.post(`${config.apiUrl}/users/logout`, {

        }, {
            withCredentials: true
        });
        return response.status === 200;
    } catch (error) {
        console.log(error);
    }
}

export default handleLogout;