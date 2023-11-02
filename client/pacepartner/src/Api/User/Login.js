import axios from 'axios';
import config from '../../config';
const handleLogin = async (e, email, password) => {
    e.preventDefault();
    try {

        const response = await axios.post(`${config.apiUrl}/users/login`, {
            email,
            password
        },
            {
                withCredentials: true
            });


        return response.status === 200;

    } catch (error) {
        return false;
    }

}

export default handleLogin;