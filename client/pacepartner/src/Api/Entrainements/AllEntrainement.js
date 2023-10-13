import axios from "axios";

const GetAllEntrainement = async (userLat, userLong, maxDistance) => {
    try {
        const response = await axios.get("http://localhost:3002/entrainements/allMatch", {
            params: {
                userLat,
                userLong,
                maxDistance
            },
            withCredentials: true  // Avec les paramètres de la requête
        });

        console.log(response);
        return response;
    } catch (err) {
        return err;
    }
}


export default GetAllEntrainement;