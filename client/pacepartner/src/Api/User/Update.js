import axios from "axios";
import config from "../../config";
const handleUpdate = async (data) => {
    try {
        const response = await axios.post(`${config.apiUrl}/users/update`, data, {
            withCredentials: true,
        });
        return response.data;

    } catch (err) {
        return err
    }

}
export default handleUpdate;