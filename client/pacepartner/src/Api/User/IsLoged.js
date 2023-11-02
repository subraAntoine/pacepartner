import axios from "axios";
import config from "../../config";

const IsLoged = async () => {
    try{
        const response = await axios.post(`${config.apiUrl}/users/isloged`, {}, {withCredentials: true});
        return response;
    } catch (err) {
        return err;
    }
}

export default IsLoged;