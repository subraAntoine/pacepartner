import axios from "axios";


const DeleteComment =   async (commentID) => {
    try{
        const data = {
            commentaireId: commentID
        }
        const response = await axios.post('http://localhost:3002/commentaires/delete', data, {
            withCredentials: true
        })

    } catch (err) {
        console.log(err)
    }

}

export default DeleteComment