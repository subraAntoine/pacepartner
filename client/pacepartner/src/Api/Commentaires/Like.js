import axios from "axios";

const Like = async (commentaireID) => {
    try {
        const response = await axios.post(`http://localhost:3002/commentaires/like/${commentaireID}`, {}, {
            withCredentials: true
        })
        return response;

    } catch (err) {
        console.log(err)
    }
}

export default Like