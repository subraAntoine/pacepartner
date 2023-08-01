import handleLogout from "../../Api/User/Logout";
import getUserInfo from "../../Api/User/UserInfo";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../Context/userContext";
export default function Home() {

    const {user, setUser} = useUser();

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
            setUser({});
            navigate("/auth");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {
                console.log(user)
            }
            <h1>Home</h1>
            <button onClick={Logout}>Logout</button>
            {
                user && (
                    <div>
                        <h1>{user.pseudo}</h1>
                    </div>
                )
            }
        </div>
    )
}