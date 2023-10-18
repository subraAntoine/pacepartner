import axios from "axios";

const AddComments = async (content, entrainement) => {
    try {
        const response = axios.post('http://localhost:3002/commentaires/addCommentaire', {

            withCredentials: true
        })

    } catch (err) {
        console.log(err)
    }

}

export default AddComments