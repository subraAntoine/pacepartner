import axios from 'axios';

const RemoveFavorite = async (entrainementID) => {
    try {
        const response = await axios.post(`http://localhost:3002/entrainements/removeFavorite/${entrainementID}`, {},{
            withCredentials: true
        });
        console.log(response);
        return response;

    } catch (err) {
        console.log(err);
    }

}

export default RemoveFavorite;