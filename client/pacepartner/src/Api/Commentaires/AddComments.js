import axios from "axios";

const AddComments = async (contenuCommentaire, entrainementID) => {
    try {

        const data = {
            contenuCommentaire: contenuCommentaire,
            entrainementID: entrainementID
        }

        const response = await axios.post('http://localhost:3002/commentaires/addCommentaire',data, {

            withCredentials: true
        })

    } catch (err) {
        console.log(err)
    }

}

export default AddComments