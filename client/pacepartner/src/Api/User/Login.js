import axios from 'axios';
const handleLogin = async (e, email, password) => {
    e.preventDefault();
    try {

        const response = await axios.post("http://localhost:3002/users/login", {
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