import axios from 'axios';
import config from '../../config';

const RemoveFavorite = async (entrainementID) => {
    try {
        const response = await axios.post(`${config.apiUrl}/entrainements/removeFavorite/${entrainementID}`, {},{
            withCredentials: true
        });
        console.log(response);
        return response;

    } catch (err) {
        console.log(err);
    }

}

export default RemoveFavorite;