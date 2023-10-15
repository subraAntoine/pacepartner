import axios from "axios";
const AddToFavorites = async (entrainementID) => {

    try {
        const response = await axios.post(`http://localhost:3002/entrainements/addFavorite/${entrainementID}` , {},{
            withCredentials: true
        });
        console.log(response);
        return response;

    } catch (err) {
        console.log(err);
    }

}

export default AddToFavorites;