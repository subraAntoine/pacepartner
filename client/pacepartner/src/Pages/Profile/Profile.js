import LeftMenu from "../../Layout/LeftMenu/LeftMenu";
import "./Profile.css"
import {useUser} from "../../Context/userContext";
import handleImageUpload from "../../Api/User/ProfilePicture";
import {useState} from "react";
export default function Profile() {

    const {user, setUser} = useUser();
    const [file, setFile] = useState(null);

    const handleImage = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = async () =>  {

        try{
            const response = await handleImageUpload(file);
            setUser({...user, photo: `http://localhost:3002/images/${response.data.filename}`});


        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className={"profile-page-container"}>
            <LeftMenu></LeftMenu>
            <div className="profile-content-wrapper">
                <h1 className={"page-title"}>Profile</h1>
                <div className="photo">
                    {
                        user.photo && <img src={user.photo} alt="Avatar" className={"user-avatar"}/>
                    }
                    <input type="file" name={"file"} id={"file"} onChange={handleImage}/>
                    <button onClick={handleUpload}>enregitsrer</button>
                </div>
                
            </div>
        </div>
    )
}