import Button from "../Button/Button";
import {useState} from "react";
import handleLogin from "../../Api/User/Login";
export default function Login() {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={handleEmail}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={handlePassword} />
            <Button className={"auth-btn"} text={"Se connecter"}></Button>
            <p className="error-msg">{error}</p>
        </form>
    )
}