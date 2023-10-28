import React from "react";
import "./profilePerfStats.css";

export default function ProfilePerfStats({ user }) {
  return (
    <div className="perf-stats-component-container">
      <h3 className="perf-stats-component-title">Performances :</h3>
      <div className="perfs-stats-items-container">
        <div className="perf-stat-item">
          <h4 className="perf-stat-title">VMA</h4>
          <p className="perf-stat-number">{user.VMA}</p>
        </div>
        <div className="perf-stat-item">
          <h4 className="perf-stat-title">Record 5km</h4>
          <p className="perf-stat-number">{user.record5km}</p>
        </div>
        <div className="perf-stat-item">
          <h4 className="perf-stat-title">Record 10km</h4>
          <p className="perf-stat-number">{user.record10km}</p>
        </div>
        <div className="perf-stat-item">
          <h4 className="perf-stat-title">Record semi-marathon</h4>
          <p className="perf-stat-number">{user.recordSemi}</p>
        </div>
        <div className="perf-stat-item">
          <h4 className="perf-stat-title">Record marathon</h4>
          <p className="perf-stat-number">{user.recordMarathon}</p>
        </div>
      </div>
    </div>
  );
}
