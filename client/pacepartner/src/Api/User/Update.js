import axios from "axios";
const handleUpdate = async (data) => {
    try {
        const response = await axios.post('http://localhost:3002/users/update', data, {
            withCredentials: true,
        });
        return response.data;

    } catch (err) {
        return err
    }

}
export default handleUpdate;