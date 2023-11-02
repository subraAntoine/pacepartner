import axios from "axios";
import config from "../../config";

const DeleteComment = async (commentID) => {
  try {
    const data = {
      commentaireId: commentID,
    };
    const response = await axios.post(
      `${config.apiUrl}/commentaires/delete`,
      data,
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export default DeleteComment;
