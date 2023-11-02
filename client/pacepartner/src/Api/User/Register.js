import axios from "axios";
import config from "../../config";

const handleRegister = async (e, email, password, pseudo, nom, prenom, sports) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${config.apiUrl}/users/register`, {
            email,
            password,
            pseudo,
            nom,
            prenom,
            sports

        })

        if (response.status === 200) {

            return response;
        }

    } catch (error) {

        return error;

    }
}

export default handleRegister;