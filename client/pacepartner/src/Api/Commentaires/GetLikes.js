import axios from "axios";
const GetLikes = async (commentaireIds) => {
    try {
        const response = await axios.post(`http://localhost:3002/commentaires/getLikes`, {commentaireIDs: commentaireIds},{
            withCredentials: true
        })

        return response

    } catch (err) {
        console.log(err)
    }

}

export default GetLikes