import axios from "axios";
const joinEntrainement = async (entrainementID) => {
    try{
        const response = await axios.post(`http://localhost:3002/entrainements/joinEntrainement/${entrainementID}`, {}, {withCredentials: true});
        console.log(response);
    } catch (err) {
        return err;
    }
}

export default joinEntrainement;