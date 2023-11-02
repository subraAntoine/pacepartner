
import axios from "axios";
import config from "../../config";
const DeleteEntrainement = async (id) => {
    try{
        const response = await axios.post(`${config.apiUrl}/entrainements/delete/${id}`, {}, {withCredentials: true});

        return response;
    } catch (err) {
        return err;
    }
}

export default DeleteEntrainement