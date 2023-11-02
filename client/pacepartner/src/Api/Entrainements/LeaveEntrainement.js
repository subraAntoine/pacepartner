import axios from "axios";
import config from "../../config";
const LeaveEntrainement = async (id) => {
    try{
        const response = await axios.post(`${config.apiUrl}/entrainements/leaveEntrainement/${id}`, {}, {withCredentials: true});

        return response;
    } catch (err) {
        return err;
    }

}

export default LeaveEntrainement