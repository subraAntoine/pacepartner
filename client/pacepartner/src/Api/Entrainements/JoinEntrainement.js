import axios from "axios";
import config from "../../config";
const joinEntrainement = async (entrainementID) => {
    try{
        const response = await axios.post(`${config.apiUrl}/entrainements/joinEntrainement/${entrainementID}`, {}, {withCredentials: true});
        console.log(response);
    } catch (err) {
        return err;
    }
}

export default joinEntrainement;