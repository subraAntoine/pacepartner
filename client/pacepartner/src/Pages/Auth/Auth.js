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

    return (
       <div className="Auth">
           <IconLogo></IconLogo>
           {
                login ? <Login /> : <Register onRegister={handleRegister} />
           }


       </div>

    )
}