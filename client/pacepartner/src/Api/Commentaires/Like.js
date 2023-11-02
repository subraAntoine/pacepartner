import axios from "axios";
import config from "../../config";

const Like = async (commentaireID) => {
    try {
        const response = await axios.post(`${config.apiUrl}/commentaires/like/${commentaireID}`, {}, {
            withCredentials: true
        })
        return response;

    } catch (err) {
        console.log(err)
    }
}

export default Like