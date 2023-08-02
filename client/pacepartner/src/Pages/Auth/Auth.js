import Login from "../../Components/Login/Login";
import Register from "../../Components/Register/Register";
import "./auth.css";
import IconLogo from "../../Components/IconLogo/IconLogo";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import isLoged from "../../Api/User/IsLoged";
export default function Auth() {

    const [login, setLogin] = useState(true);

    const navigate = useNavigate();

    const handleRegister = () => {
        setLogin(true);
    }

    const handleLogin = () => {
        setLogin(!login);
    }

    useEffect(() => {
        const handleIsLoged = async () => {
            try {
                const response = await isLoged();
                console.log(response);
                if (response.status === 200) {
                    navigate("/home");
                }
            } catch (err) {
                console.log(err);
            }
        }
        handleIsLoged()
    },[])



    return (
       <div className="Auth">
           <IconLogo className={"auth"}></IconLogo>
           {
                login ? <Login className={"btn"} /> : <Register onRegister={handleRegister} />
           }
           {
               login ? <p className="auth-text">Pas encore de compte ? <span onClick={handleLogin}>S'inscrire</span></p> : <p className="auth-text">Déjà un compte ? <span onClick={handleLogin}>Se connecter</span></p>
           }


       </div>

    )
}