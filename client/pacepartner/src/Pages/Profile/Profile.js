import React from "react";
import LeftMenu from "../../Layout/LeftMenu/LeftMenu";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/userContext";
import { Link } from "react-router-dom";
import "./profile.css";

import getUserInfo from "../../Api/User/UserInfo";
import getProfileInfo from "../../Api/User/GetProfileInfo";

import ProfileStatsWidget from "../../Components/ProfileStatsWidget/ProfileStatsWidget";
import ProfilePerfStats from "../../Components/ProfilePerfStats/ProfilePerfStats";

export default function Profile() {
  const { userId } = useParams();

  const [ownProfile, setOwnProfile] = useState(false);
  const [title, setTitle] = useState(null);
  const [userTrainingTitle, setUserTrainingTitle] = useState(null);
  const { user, setUser } = useUser();
  const [updateDataTrigger, setUpdateDataTrigger] = useState(false);
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  const style = { fontSize: "3rem" };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let isCancelled = false;
      try {
        const response = await getUserInfo();
        if (!response) {
          navigate("/auth");
          return;
        }
        if (!isCancelled) {
          setUser(response.user);
        }
      } catch (error) {
        navigate("/auth");
      }
      setUpdateDataTrigger(false);
      return () => {
        isCancelled = true;
      };
    };

    const fetchUserInfo = async () => {
      try {
        const response = await getProfileInfo(userId);
        setUserProfileInfo(response.user);
        const userData = response.user;
        setTitle(`Profile de ${userData.pseudo}`);
        setOwnProfile(false);
        setUserTrainingTitle(`Entrainements créés par ${userData.pseudo}`);
        localStorage.setItem("userPseudo", userData.pseudo);
      } catch (err) {
        console.log(err);
        navigate("/error");
      }
    };

    fetchData();

    if (userId === user._id) {
      setOwnProfile(true);
      setTitle("Mon profile");
      setUserProfileInfo(user);

      setUserTrainingTitle("Entrainements créés");
    } else {
      fetchUserInfo();

      setOwnProfile(false);
    }
  }, [updateDataTrigger, userId]);

  return (
    <>
      <LeftMenu />
      <div className="user-profile-page-container">
        <h1>{title}</h1>
        {userProfileInfo && (
          <div className="user-profile-container">
            <div className="user-profile-picture-wrap">
              <img
                src={userProfileInfo.photo}
                className="user-profile-picture"
                alt=""
              />
              <h3 className="user-profile-pseudo">{userProfileInfo.pseudo}</h3>
            </div>
            <ProfileStatsWidget user={userProfileInfo}></ProfileStatsWidget>
            <ProfilePerfStats user={userProfileInfo}></ProfilePerfStats>
            {ownProfile === false && (
              <div className="user-trainings-link-div">
                <button>Ajouter en amis</button>
              </div>
            )}
            <Link to={`/entrainement/created/${userProfileInfo._id}`}>
              <div className="user-trainings-link-div">
                <h3>{userTrainingTitle && userTrainingTitle}</h3>
              </div>
            </Link>
            <Link to={`/entrainement/joined/${userProfileInfo._id}`}>
              <div className="user-trainings-link-div">
                <h3>Entrainements rejoints</h3>
              </div>
            </Link>
            {ownProfile && ownProfile === true && (
              <Link to={`/entrainement/favorite/${userProfileInfo._id}`}>
                <div className="user-trainings-link-div">
                  <h3>Mes favoris</h3>
                </div>
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
