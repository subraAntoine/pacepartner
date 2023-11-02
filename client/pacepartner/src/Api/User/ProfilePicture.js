import axios from "axios";
import config from "../../config";


const handleImageUpload = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const repsonse = await axios.post(`${config.apiUrl}/users/uploadProfilePic`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
        return repsonse;

    } catch (err) {
        return err;
    }
}

export default handleImageUpload;