
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

    const [passwordValid, setPasswordValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    const [error, setError] = useState("");



    const validatePassword = (password) => {
        // Vérifie s'il y a au moins une majuscule et un caractère spécial dans le mot de passe
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+-])(?=.*[a-z]).{8,}$/;
        return regex.test(password);
    };

    const validateEmail = (email) => {
        // Vérifie si l'email est valide
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const emptyFields = () => {
        // Vérifie si les champs sont vides
        return email === "" || password === "" || pseudo === "" || nom === "" || prenom === "" || sports.length === 0;
    }


    const handleEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailValid(validateEmail(newEmail));
    }

    const handlePassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordValid(validatePassword(newPassword));
    }

    const handlePseudo = (e) => {
        setPseudo(e.target.value);


    }

    const handleNom = (e) => {
        setNom(e.target.value);

    }

    const handlePrenom = (e) => {
        setPrenom(e.target.value);
        console.log(prenom);
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
             const response = await axios.post("http://localhost:3002/users/register", {
                email,
                password,
                pseudo,
                nom,
                prenom,
                sports

            })

            if (response.status === 200) {
                onRegister();
            }

        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
        }
    }




    return (

        <form className="auth-form" onSubmit={handleSubmit}>
            <h1>Créer un compte</h1>
            <label htmlFor="email">Email</label>
            <input onChange={handleEmail} type="email" name="email" id="email" />
            <label htmlFor="password">Mot de passe</label>
            <input onChange={handlePassword} type="password" name="password" id="password"/>
            {passwordValid ? null : <p className="password-error">Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial.</p>}
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
                    <label htmlFor="trail">Trail</label>
                </div>
                <div className="checkbox-item">
                    <input onChange={handleSports} className="checkbox-input"  type="checkbox" name="sport" id="velo" />
                    <label htmlFor="cyclisme">Cyclisme</label>
                </div>
            </div>


            <Button className={"auth-btn"} text={"Rejoins nous !"} disabled={!passwordValid || !emailValid || emptyFields()}  ></Button>
            <p className={"error-msg"}>{error}</p>
        </form>



    )
}