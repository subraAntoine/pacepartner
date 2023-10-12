import axios from "axios";
const LeaveEntrainement = async (id) => {
    try{
        const response = await axios.post(`http://localhost:3002/entrainements/leaveEntrainement/${id}`, {}, {withCredentials: true});

        return response;
    } catch (err) {
        return err;
    }

}

export default LeaveEntrainement