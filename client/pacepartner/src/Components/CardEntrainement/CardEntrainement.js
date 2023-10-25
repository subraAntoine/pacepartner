import "./cardEntrainement.css";
import moment from "moment";
import { useEffect, useState, useSyncExternalStore, useRef } from "react";
import MapComponent from "../Map/Map";
import Button from "../Button/Button";
import { useUser } from "../../Context/userContext";
import joinEntrainement from "../../Api/Entrainements/JoinEntrainement";
import getProfilePic from "../../Api/User/GetProfilePic";
import Modal from "../Modal/Modal";
import DeleteEntrainement from "../../Api/Entrainements/DeleteEntrainement";
import {
  MdDelete,
  MdHighlightOff,
  MdComment,
  MdFavoriteBorder,
  MdFavorite,
  MdCancel,
} from "react-icons/md";
import LeaveEntrainement from "../../Api/Entrainements/LeaveEntrainement";
import AddToFavorites from "../../Api/Entrainements/AddToFavorites";
import RemoveFavorite from "../../Api/Entrainements/RemoveFavorite";
import AddComments from "../../Api/Commentaires/AddComments";
import GetComments from "../../Api/Commentaires/GetComments";
import GetLikes from "../../Api/Commentaires/GetLikes";
import axios from "axios";
import GetUserPseudo from "../../Api/Entrainements/UserPseudo";
import deleteEntrainement from "../../Api/Entrainements/DeleteEntrainement";
import addComments from "../../Api/Commentaires/AddComments";
import getComments from "../../Api/Commentaires/GetComments";
import Like from "../../Api/Commentaires/Like";
import GetUsersInfo from "../../Api/User/GetUsersInfo";
import DeleteComment from "../../Api/Commentaires/DeleteComment";

export default function CardEntrainement({ entrainement, updateDataTrigger }) {
  const [date, setDate] = useState(null);
  const [organisateurName, setOrganisateurName] = useState(null);
  const [organisateurPic, setOrganisateurPic] = useState(null);
  const { user, setUser } = useUser();
  const [participantsInfo, setParticipantsInfo] = useState(null);
  const [modalTrigger, setModalTrigger] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [leaveModal, setLeaveModal] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [commentList, setCommentList] = useState(null);
  const [updateCommentaire, setUpdateCommentaire] = useState(false);
  const style = {
    zIndex: "3",
    color: "black",
    fontSize: "2rem",
    position: "absolute",
    bottom: "0",
    left: "0",
    marginTop: "3rem",
    cursor: "pointer",
  };
  const styleFavorite = {
    zIndex: "3",
    color: "black",
    fontSize: "1.5rem",
    cursor: "pointer",
  };
  const commentIconStyle = {
    zIndex: "3",
    color: "black",
    fontSize: "2rem",
    cursor: "pointer",
    position: "absolute",
    bottom: "0",
    left: "450px",
  };
  const [commentsInfo, setCommentsInfo] = useState(null);
  const [updateLikes, setUpdateLikes] = useState(false);
  const [displayModalDeleteComment, setDisplayModalDeleteComment] =
    useState(false);

  const handleJoinEntrainement = async () => {
    try {
      const response = await joinEntrainement(entrainement._id);
      updateDataTrigger(true);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (entrainement) {
      const NewDate = new Date(entrainement.dateEntrainement);
      const day = NewDate.getDate();
      const month = NewDate.getMonth() + 1;
      const year = NewDate.getFullYear();

      setDate(`${day}/${month}/${year}`);

      const getOrganisateurPseudo = async () => {
        try {
          const nameTemp = await GetUserPseudo(entrainement.organisateur);
          const picTemp = await getProfilePic(entrainement.organisateur);
          setOrganisateurName(nameTemp);
          setOrganisateurPic(picTemp.data.profilePic);
        } catch (error) {
          console.log(error);
        }
      };

      const getParticipantsPseudo = async () => {
        try {
          const participantsTemp = await Promise.all(
            entrainement.participants.map(async (participant) => {
              const participantName = await GetUserPseudo(participant);
              const participantPic = await getProfilePic(participant);
              return {
                name: participantName,
                pic: participantPic.data.profilePic,
              };
            })
          );
          setParticipantsInfo(participantsTemp);
        } catch (error) {
          console.log(error);
        }
      };

      getOrganisateurPseudo();
      getParticipantsPseudo();

      console.log(commentList);
    }
  }, [entrainement]);

  const handleDeleteEntrainement = async () => {
    try {
      const response = await deleteEntrainement(entrainement._id);
      updateDataTrigger(true);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLeaveEntrainement = async () => {
    try {
      const response = await LeaveEntrainement(entrainement._id);
      updateDataTrigger(true);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddFavorite = async () => {
    try {
      const response = await AddToFavorites(entrainement._id);
      updateDataTrigger(true);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const response = await RemoveFavorite(entrainement._id);
      updateDataTrigger(true);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentContent = (e) => {
    setCommentContent(e.target.value);
    console.log(commentContent);
  };

  const handleAddComment = async () => {
    try {
      const response = await addComments(commentContent, entrainement._id);
      setUpdateCommentaire(true);
      setCommentContent("");
      handleLoadComments();
    } catch (err) {
      console.log(err);
    }
  };

  const getCommentsInfo = async (commentaireList) => {
    try {
      if (!Array.isArray(commentaireList)) {
        throw new Error("commentaireList n'est pas un tableau.");
      }

      console.log(commentaireList);

      const commentsTemp = await Promise.all(
        commentaireList.map(async (comment) => {
          const authorName = await GetUserPseudo(comment.author);
          const authorPic = await getProfilePic(comment.author);
          return {
            id: comment._id,
            name: authorName,
            pic: authorPic.data.profilePic,
            content: comment.content,
            likes: comment.likedBy,
          };
        })
      );
      console.log(commentsTemp);
      setCommentsInfo(commentsTemp);
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentsUsersInfo = async (commentaireList) => {
    try {
      const authorsId = commentaireList.map(
        (commentaire) => commentaire.author
      );
      const commentairesInfo = await GetUsersInfo(authorsId);
      return commentairesInfo.data.profilePics;
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadComments = async () => {
    try {
      if (updateLikes === true) {
        // Si les commentaires sont déjà chargés, charger uniquement les informations des personnes ayant liké les commentaires.
        const commentIDs = commentsInfo.map((commentaire) => commentaire._id);
        const likedUsersInfo = await GetLikes(commentIDs);
        const likesInfo = likedUsersInfo.data.data;
        console.log(likedUsersInfo);
        setUpdateLikes(false);

        // Mettre à jour les informations des personnes qui ont liké les commentaires dans le state existant.
        const updatedCommentsInfo = commentsInfo.map((commentaire) => {
          const usersInfo = likesInfo.find(
            (userInfo) => userInfo.commentID === commentaire._id
          );
          return {
            ...commentaire,
            likedBy: usersInfo.likedBy,
          };
        });

        console.log(updatedCommentsInfo);

        setCommentsInfo(updatedCommentsInfo);
      } else {
        const commentaireList = await getComments(entrainement._id);
        const commentListInfo = commentaireList.data.data;
        const commentsUserInfo = await getCommentsUsersInfo(
          commentaireList.data.data
        );
        const commentaireAvecInfo = commentListInfo.map((commentaire) => {
          const authorInfos = commentsUserInfo.find(
            (utilisateur) => utilisateur.userID === commentaire.author
          );
          console.log(authorInfos);
          return {
            ...commentaire,
            auteurInfo: authorInfos,
          };
        });
        console.log(commentaireAvecInfo);
        setCommentsInfo(commentaireAvecInfo);
        setUpdateCommentaire(false);
        setDisplayComments(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDisplayComments = async () => {
    if (displayComments === false) {
      await handleLoadComments();
      setDisplayComments(true);
    } else {
      setDisplayComments(false);
    }
  };

  const handleLikeComments = async (commentaireID) => {
    try {
      const response = await Like(commentaireID);
      setUpdateLikes(true);
      handleLoadComments();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = async (commentaireID) => {
    try {
      const reponse = await DeleteComment(commentaireID);
      handleLoadComments();
    } catch (err) {
      console.log(err);
    }
  };

  const renderDate = (date) => {
    if (moment().diff(date, "minutes") < 60) {
      return (
        <h3 className="comment-date">
          {" "}
          Il y'a {moment().diff(date, "minutes")} minutes
        </h3>
      );
    } else if (
      moment().diff(date, "minutes") >= 60 &&
      moment().diff(date, "minutes") < 1440
    ) {
      return (
        <h3 className="comment-date">
          {" "}
          Il y'a {moment().diff(date, "hours")} heure(s)
        </h3>
      );
    } else if (
      moment().diff(date, "days") >= 1 &&
      moment().diff(date, "days") < 31
    ) {
      return (
        <h3 className="comment-date">
          {" "}
          Il y'a {moment().diff(date, "days")} jour(s)
        </h3>
      );
    } else if (
      moment().diff(date, "months") >= 1 &&
      moment().diff(date, "months") < 13
    ) {
      return (
        <h3 className="comment-date">
          {" "}
          Il y'a {moment().diff(date, "months")} mois
        </h3>
      );
    } else if (moment().diff(date, "years") >= 1) {
      return (
        <h3 className="comment-date">
          {" "}
          Il y'a {moment().diff(date, "years")} an(s)
        </h3>
      );
    }
  };

  return (
    <div className={"global-card-container"}>
      <div className="entrainement-card-wrap">
        <div className="favorite-icon-div">
          {user.favoriteTrainings.includes(entrainement._id) ? (
            <MdFavorite
              onClick={handleRemoveFavorite}
              style={styleFavorite}
            ></MdFavorite>
          ) : (
            <MdFavoriteBorder
              onClick={handleAddFavorite}
              style={styleFavorite}
            ></MdFavoriteBorder>
          )}
        </div>
        <div className="comments-icon-div">
          {displayComments ? (
            <MdCancel
              style={styleFavorite}
              onClick={handleDisplayComments}
            ></MdCancel>
          ) : (
            <MdComment
              style={styleFavorite}
              onClick={handleDisplayComments}
            ></MdComment>
          )}
        </div>

        <div className="entrainement-card-header">
          <h3
            className={(() => {
              switch (entrainement.typeEntrainement) {
                case "SortieLongue":
                  return "entrainement-card-header-long-run";
                case "Seuil":
                  return "entrainement-card-header-seuil";
                case "Endurance":
                  return "entrainement-card-header-endurance";
                case "VMA":
                  return "entrainement-card-header-vma";
                default:
                  return "entrainement-card-header-default";
              }
            })()}
          >
            {entrainement.sportEntrainement} / {entrainement.typeEntrainement}
          </h3>
          <h3>A {(entrainement.distance / 1000).toFixed(1)}km de vous !</h3>
          <h3>
            Date de l'entrainement :{" "}
            <span className={"card-text-span"}>{date}</span>{" "}
          </h3>
        </div>
        <div className="entrainement-card-body">
          <div className="card-participants-info">
            <div className="organisateur-info-entrainement">
              <h3>Organisateur : </h3>
              <div className="organisateur-info-square">
                <h3>
                  <span className={"organisateur-name-entrainement"}>
                    {organisateurName}
                  </span>{" "}
                </h3>
                {organisateurPic && (
                  <img
                    src={organisateurPic}
                    className={"organisateur-pic-entrainement"}
                    alt=""
                  />
                )}
              </div>
            </div>

            <h3>
              Nombre de participants :{" "}
              <span className={"card-text-span"}>
                {entrainement.participants.length} /{" "}
                {entrainement.nbMaxParticipants}
              </span>
            </h3>
            {entrainement.participants.length > 0 && (
              <h3 className={"participants-list-container"}>
                Participants :{" "}
                <span className={"participants-list-span"}>
                  {participantsInfo &&
                    participantsInfo.map((participant, index) => {
                      return (
                        <div className={"participants-entrainement-square"}>
                          <span key={index}>{participant.name}</span>
                          <img
                            className={"participants-entrainement-pic"}
                            src={participant.pic}
                            alt=""
                          />
                        </div>
                      );
                    })}
                </span>
              </h3>
            )}
            <h3>
              Distance estimée :{" "}
              <span className={"card-text-span"}>
                {entrainement.distanceEntrainement} km
              </span>
            </h3>
            <h3>
              Durée estimée :{" "}
              <span className={"card-text-span"}>
                {entrainement.dureeEntrainement} min
              </span>{" "}
            </h3>
            <h3>Description de l'entrainement :</h3>
            <p className={"entrainement-card-desc"}>
              {entrainement.descriptionEntrainement}
            </p>

            {user._id !== entrainement.organisateur &&
              !entrainement.participants.some(
                (participant) => participant === user._id
              ) &&
              entrainement.participants.length <
                entrainement.nbMaxParticipants && (
                <Button
                  className={"join-entrainement-btn"}
                  onClick={() => setModalTrigger(!modalTrigger)}
                  text={"Rejoindre l'entrainement"}
                ></Button>
              )}

            {modalTrigger && (
              <Modal
                modalTrigger={modalTrigger}
                setModalTrigger={setModalTrigger}
                textContent={
                  "Etes vous sur de vouloir rejoindre cet entrainement ?"
                }
                modalFunc={handleJoinEntrainement}
              ></Modal>
            )}

            {user._id === entrainement.organisateur && (
              <MdDelete
                onClick={() => setDeleteModal(!deleteModal)}
                style={style}
              ></MdDelete>
            )}

            {deleteModal && (
              <Modal
                modalTrigger={deleteModal}
                setModalTrigger={setDeleteModal}
                textContent={
                  "Etes vous sur de vouloir supprimer cet entrainement ?"
                }
                modalFunc={handleDeleteEntrainement}
              ></Modal>
            )}
            {entrainement.participants.some(
              (participant) => participant === user._id
            ) && (
              <MdHighlightOff
                onClick={() => setLeaveModal(!leaveModal)}
                style={style}
              ></MdHighlightOff>
            )}
            {leaveModal && (
              <Modal
                modalTrigger={leaveModal}
                setModalTrigger={setLeaveModal}
                textContent={
                  "Etes vous sur de vouloir quitter cet entrainement ?"
                }
                modalFunc={handleLeaveEntrainement}
              ></Modal>
            )}
          </div>
          <div className="card-map-container">
            <MapComponent
              coordinates={entrainement.gpsLocation.coordinates}
            ></MapComponent>
            <h3 className={"card-depart-adresse"}>
              Point de départ :{" "}
              <span className={"card-text-span"}>
                {entrainement.lieuEntrainement}
              </span>
            </h3>
          </div>
        </div>
      </div>
      {displayComments && (
        <div className={"comments-container"}>
          <div className="comment-list-wrap">
            <div className="comments-items">
              {commentsInfo &&
                commentsInfo.map((comment, index) => {
                  return (
                    <div key={index} className={"commentaire-container"}>
                      <div className="profile-info-content-wrap">
                        <div className="comment-author-info">
                          <img
                            className={"comment-profile-picture"}
                            src={comment.auteurInfo.profilePicDir}
                            alt=""
                          />
                          <h3 className="comment-author-pseudo">
                            {" "}
                            {comment.auteurInfo.pseudo}
                          </h3>
                        </div>
                        <p className="comment-content">{comment.content}</p>
                      </div>

                      <div className="comment-general-info">
                        {renderDate(comment.date)}
                        <div className="comment-likes-wrap">
                          {comment.likedBy.some((like) => like === user._id) ? (
                            <MdFavorite
                              style={styleFavorite}
                              onClick={() => handleLikeComments(comment._id)}
                            ></MdFavorite>
                          ) : (
                            <MdFavoriteBorder
                              style={styleFavorite}
                              onClick={() => handleLikeComments(comment._id)}
                            ></MdFavoriteBorder>
                          )}
                          <p>{comment.likedBy.length}</p>
                        </div>
                        {comment.author === user._id && (
                          <MdDelete
                            style={styleFavorite}
                            onClick={() => handleDeleteComment(comment._id)}
                          ></MdDelete>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="comment-input-wrap">
            <input
              className="comment-input"
              value={commentContent}
              type="text"
              placeholder="Nouveau commentaire"
              onChange={handleCommentContent}
            />
            <button
              className="button-comment-input"
              type={"submit"}
              onClick={handleAddComment}
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
