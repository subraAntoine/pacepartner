import React from "react";
import LeftMenu from "../../Layout/LeftMenu/LeftMenu";
import "./error.css";
import Logo from "../../Assets/Logo carré.png";
import { useEffect, useState } from "react";
import getUserInfo from "../../Api/User/UserInfo";
import { useUser } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const [updateDataTrigger, setUpdateDataTrigger] = useState(false);
  const { user, setUser } = useUser();
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
    fetchData();
  }, [updateDataTrigger]);

  return (
    <div>
      <LeftMenu></LeftMenu>
      <div className="error-page-container">
        <h1 className="main-error-title">Oups...</h1>
        <h2 className="second-error-title">
          Une erreur s'est produite ou vous n'avez pas accès à cette page.
        </h2>
        <img src={Logo} alt="" className="logo-error-page" />
      </div>
    </div>
  );
}
