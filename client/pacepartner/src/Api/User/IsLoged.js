import axios from "axios";

const IsLoged = async () => {
    try{
        const response = await axios.post("http://localhost:3002/users/isloged", {}, {withCredentials: true});
        return response;
    } catch (err) {
        return err;
    }
}

export default IsLoged;