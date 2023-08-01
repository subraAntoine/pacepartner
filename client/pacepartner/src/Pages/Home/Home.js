import handleLogout from "../../Api/User/Logout";
import getUserInfo from "../../Api/User/UserInfo";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
export default function Home() {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserInfo();

                if(!response){
                    navigate("/auth");
                    return;
                }
                setUser(response.user);

            } catch (error) {

                navigate("/auth");

            }
        }
        fetchData();

    }, []);

    const Logout = () => {
        try {
            handleLogout();
            navigate("/auth");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={Logout}>Logout</button>
            {
                user && <p>Bonjour {user.pseudo}</p>
            }

        </div>
    )
}