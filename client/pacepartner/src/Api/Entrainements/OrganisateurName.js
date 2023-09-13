import axios from "axios";

const GetOrganisateurName = async (organistauerId) => {
    try{
        const response = await axios.get("http://localhost:3002/entrainements/organisateurName", {withCredentials: true, params: {userId: organistauerId}});
        return response.data.organisateurName.pseudo;
    } catch (err) {
        return err;
    }
}

export default GetOrganisateurName;