import Button from "../Button/Button";
import {useState} from "react";
export default function Login() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });


    return (
        <form className="auth-form" action="">
            <h1 className={"form-title"}>Connexion</h1>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <Button className={"auth-btn"} text={"Se connecter"}></Button>
        </form>
    )
}