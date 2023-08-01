import axios from "axios";

const handleLogout = async () => {
    try {
        const response = await axios.post("http://localhost:3002/users/logout", {

        }, {
            withCredentials: true
        });
        return response.status === 200;
    } catch (error) {
        console.log(error);
    }
}

export default handleLogout;