import axios from "axios";
import config from "../../config";

const AddComments = async (contenuCommentaire, entrainementID) => {
  try {
    const data = {
      contenuCommentaire: contenuCommentaire,
      entrainementID: entrainementID,
    };

    const response = await axios.post(
      `${config.apiUrl}/commentaires/addCommentaire`,
      data,
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export default AddComments;
