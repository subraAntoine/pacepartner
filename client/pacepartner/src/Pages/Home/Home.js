import handleLogout from "../../Api/User/Logout";
import getUserInfo from "../../Api/User/UserInfo";
import {useEffect, useState} from "react";
export default function Home() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserInfo();
            setUser(response);
            console.log(response);
        }
        fetchData();

    }, []);

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleLogout}>Logout</button>
            {
                user && (
                    <div>
                        <p>{user.email}</p>
                    </div>
                )
            }
        </div>
    )
}