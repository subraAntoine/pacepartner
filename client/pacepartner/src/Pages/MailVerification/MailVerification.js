import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./mailVerification.css";
import VerifyUser from "../../Api/User/VerifyUser";

export default function MailVerification() {
  const { emailToken } = useParams();
  const [response, setResponse] = useState();

  useEffect(() => {
    const reponse = VerifyUser(emailToken);
    console.log(reponse);
  }, []);

  return (
    <div>
      <h1>Verification de l'email en cours</h1>
    </div>
  );
}
