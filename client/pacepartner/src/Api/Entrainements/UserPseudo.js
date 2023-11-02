import axios from "axios";
import config from "../../config";

const GetUserPseudo = async (organistauerId) => {
    try{
        const response = await axios.get(`${config.apiUrl}/entrainements/userPseudo/${organistauerId}`, {withCredentials: true});
        return response.data.userPseudo.pseudo;
    } catch (err) {
        return err;
    }
}

export default GetUserPseudo;