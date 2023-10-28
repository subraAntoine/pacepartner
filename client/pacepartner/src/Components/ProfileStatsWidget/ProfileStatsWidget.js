import React from "react";
import "./profileStatsWidget.css";
import { MdSsidChart, MdAnalytics, MdOutlineHistory } from "react-icons/md";

export default function ProfileStatsWidget({ user }) {
  const style = {
    fontSize: "6rem",
    paddingRight: "80px",
    borderRight: "solid 2px black",
  };

  return (
    <div className="stats-widget-container">
      <MdOutlineHistory style={style}></MdOutlineHistory>
      <div className="profil-stat-item">
        <h4 className="stat-item-title">Amis</h4>
        <p className="stat-item-number">{user.friends.length}</p>
      </div>
      <div className="profil-stat-item">
        <h4 className="stat-item-title">Activités créées</h4>
        <p className="stat-item-number">{user.createdTrainings.length}</p>
      </div>
      <div className="profil-stat-item">
        <h4 className="stat-item-title">Activités rejoints </h4>
        <p className="stat-item-number">{user.trainingJoined.length}</p>
      </div>
    </div>
  );
}
