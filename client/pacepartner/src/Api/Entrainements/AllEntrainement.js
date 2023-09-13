import axios from "axios";

const GetAllEntrainement = async () => {
    try{
        const response = await axios.get("http://localhost:3002/entrainements/all", {withCredentials: true});

        return response;
    } catch (err) {
        return err;
    }
}

export default GetAllEntrainement;