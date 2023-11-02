import axios from "axios";
import config from "../../config";
const GetComments = async (entrainementID) => {
    try{
        const response = await axios.get(`${config.apiUrl}/commentaires/getComments/${entrainementID}`,{
            withCredentials: true
        })
        return response
    } catch (err){
        console.log(err)
    }

}

export default GetComments
