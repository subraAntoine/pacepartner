
import Button from "../Button/Button";
import {useState} from "react";
import axios from "axios";

export default function Register({onRegister}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [sports, setSports] = useState([]);


    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handlePseudo = (e) => {
        setPseudo(e.target.value);
        console.log(pseudo);
    }

    const handleNom = (e) => {
        setNom(e.target.value);
    }

    const handlePrenom = (e) => {
        setPrenom(e.target.value);
    }

    const handleSports = (e) => {

        if (e.target.checked) {
            setSports([...sports, e.target.id]);
        } else {
            setSports(sports.filter(sport => sport !== e.target.id));
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.post("http://localhost:3002/users/register", {
                email,
                password,
                pseudo,
                nom,
                prenom,
                sports

            })
            alert("Votre compte a bien été créé !")
            onRegister();

        } catch (error) {
            console.log(error);
        }
    }




    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h1>Créer un compte</h1>
            <label htmlFor="email">Email</label>
            <input onChange={handleEmail} type="email" name="email" id="email" />
            <label htmlFor="password">Mot de passe</label>
            <input onChange={handlePassword} type="password" name="password" id="password" />
            <label htmlFor="pseudo">Pseudo</label>
            <input onChange={handlePseudo} type="text" name="pseudo" id="pseudo" />
            <label htmlFor="nom">Nom</label>
            <input onChange={handleNom} type="text" name="nom" id="nom" />
            <label htmlFor="prenom">Prénom</label>
            <input onChange={handlePrenom} type="text" name="prenom" id="prenom" />
            <label htmlFor="sports">Quels sports pratiques-tu ?</label>
            <div className="sports-checkbox">
                <div className="checkbox-item">
                    <input onChange={handleSports} className="checkbox-input" type="checkbox" name="sport" id="running" />
                    <label htmlFor="running">Running</label>
                </div>
                <div className="checkbox-item">
                    <input onChange={handleSports} className="checkbox-input"  type="checkbox" name="sport" id="trail" />
                    <label htmlFor="running">Trail</label>
                </div>
                <div className="checkbox-item">
                    <input onChange={handleSports} className="checkbox-input"  type="checkbox" name="sport" id="velo" />
                    <label htmlFor="running">Cyclisme</label>
                </div>
            </div>


            <Button text={"Rejoins nous !"}></Button>
        </form>
    )
}