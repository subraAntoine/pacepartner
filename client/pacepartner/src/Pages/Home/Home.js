import handleLogout from "../../Api/User/Logout";
import getUserInfo from "../../Api/User/UserInfo";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../Context/userContext";
import LeftMenu from "../../Layout/LeftMenu/LeftMenu";
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



    return (
        <div>
            <LeftMenu/>
        </div>
    )
}