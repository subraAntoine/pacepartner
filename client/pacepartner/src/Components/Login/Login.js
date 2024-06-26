import Button from "../Button/Button";
import {useState} from "react";
import handleLogin from "../../Api/User/Login";

import {useNavigate} from "react-router-dom";
export default function Login() {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await handleLogin(e, email, password);

            console.log(response);

            if (response) {
                navigate("/home");
            } else {
                setError("Email ou mot de passe incorrect");
            }
        } catch (error) {
            setError("Email ou mot de passe incorrect");
        }
    }


    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h1 className={"form-title"}>Connexion</h1>
            <label className={"auth-label"} htmlFor="email">Email</label>
            <input className={"auth-input"} type="email" name="email" id="email" onChange={handleEmail}/>
            <label className={"auth-label"} htmlFor="password">Password</label>
            <input className={"auth-input"} type="password" name="password" id="password" onChange={handlePassword} />
            <Button className={"auth-btn"} text={"Se connecter"}></Button>
            <p className="error-msg">{error}</p>
        </form>
    )
}