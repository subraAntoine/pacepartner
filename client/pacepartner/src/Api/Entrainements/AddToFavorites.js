import axios from "axios";
import config from "../../config";
const AddToFavorites = async (entrainementID) => {

    try {
        const response = await axios.post(`${config.apiUrl}/entrainements/addFavorite/${entrainementID}` , {},{
            withCredentials: true
        });
        console.log(response);
        return response;

    } catch (err) {
        console.log(err);
    }

}

export default AddToFavorites;