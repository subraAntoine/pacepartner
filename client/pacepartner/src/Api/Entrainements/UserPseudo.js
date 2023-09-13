import axios from "axios";

const GetUserPseudo = async (organistauerId) => {
    try{
        const response = await axios.get(`http://localhost:3002/entrainements/userPseudo/${organistauerId}`, {withCredentials: true});
        return response.data.userPseudo.pseudo;
    } catch (err) {
        return err;
    }
}

export default GetUserPseudo;