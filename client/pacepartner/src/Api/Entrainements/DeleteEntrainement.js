
import axios from "axios";
const DeleteEntrainement = async (id) => {
    try{
        const response = await axios.post(`http://localhost:3002/entrainements/delete/${id}`, {}, {withCredentials: true});

        return response;
    } catch (err) {
        return err;
    }
}

export default DeleteEntrainement