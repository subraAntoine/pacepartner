import React from 'react';
import LeftMenu from "../../Layout/LeftMenu/LeftMenu";
import "./profile.css";
export default function Profile() {
    return (
        <>
            <LeftMenu/>
            <div className="user-profile-page-container">
                <h1>Profile</h1>
            </div>
        </>
    )
}