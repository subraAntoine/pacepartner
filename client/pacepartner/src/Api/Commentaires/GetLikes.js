import axios from "axios";
import config from "../../config";
const GetLikes = async (commentaireIds) => {
    try {
        const response = await axios.post(`${config.apiUrl}/commentaires/getLikes`, {commentaireIDs: commentaireIds},{
            withCredentials: true
        })

        return response

    } catch (err) {
        console.log(err)
    }

}

export default GetLikes