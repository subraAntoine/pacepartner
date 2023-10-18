import axios from "axios";
const GetComments = async (entrainementID) => {
    try{
        const response = await axios.get(`http://localhost:3002/commentaires/getComments/${entrainementID}`,{
            withCredentials: true
        })
        return response
    } catch (err){
        console.log(err)
    }

}

export default GetComments
