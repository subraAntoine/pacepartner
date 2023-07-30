import Login from "../../Components/Login/Login";
import Register from "../../Components/Register/Register";
import "./auth.css";
import IconLogo from "../../Components/IconLogo/IconLogo";
import {useState} from "react";
export default function Auth() {

    const [login, setLogin] = useState(false);

    const handleRegister = () => {
        setLogin(true);
    }

    const handleLogin = () => {
        setLogin(!login);
    }

    return (
       <div className="Auth">
           <IconLogo></IconLogo>
           {
                login ? <Login /> : <Register onRegister={handleRegister} />
           }
           {
               login ? <p className="auth-text">Pas encore de compte ? <span onClick={handleLogin}>S'inscrire</span></p> : <p className="auth-text">Déjà un compte ? <span onClick={handleLogin}>Se connecter</span></p>
           }


       </div>

    )
}