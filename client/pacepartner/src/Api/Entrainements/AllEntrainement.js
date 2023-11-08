import axios from "axios";
import config from "../../config";

const GetAllEntrainement = async (
  userLat,
  userLong,
  maxDistance,
  sportEntrainement,
  typeEntrainement,
  adaptedEntrainement,
  researchType,
  conditionUserId,
  enableDistanceFilter
) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/entrainements/allMatch`,
      {
        params: {
          userLat,
          userLong,
          maxDistance,
          sportEntrainement,
          typeEntrainement,
          adaptedEntrainement,
          researchType,
          conditionUserId,
          enableDistanceFilter
        },
        withCredentials: true, // Avec les paramètres de la requête
      }
    );

    console.log(response);
    return response;
  } catch (err) {
    return err;
  }
};

export default GetAllEntrainement;
