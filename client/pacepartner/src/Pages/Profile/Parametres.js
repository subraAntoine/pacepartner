import LeftMenu from "../../Layout/LeftMenu/LeftMenu";
import "./parametres.css"
import {useUser} from "../../Context/userContext";
import handleImageUpload from "../../Api/User/ProfilePicture";
import {useState, useEffect} from "react";
import {MdCreate, MdSave, MdClear} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import getUserInfo from "../../Api/User/UserInfo";
import handleUpdate from "../../Api/User/Update";
export default function Parametres() {

    const {user, setUser} = useUser();
    const [file, setFile] = useState(null);
    const [edit, setEdit] = useState(false);
    const [editPhoto, setEditPhoto] = useState(false);
    const [data, setData] = useState(null);

    const handleImage = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = async () =>  {

        try{
            const response = await handleImageUpload(file);
            setUser({...user, photo: `http://localhost:3002/images/${response.data.filename}`});
            setEditPhoto(!editPhoto);
            alert('Photo enregistrée avec succès !');

        } catch (err) {
            console.log(err);
        }


    }
    const handleEdit = () => {
        setEdit(!edit);
    }

    const handleEditPhoto = () => {
        setEditPhoto(!editPhoto);
    }

    const IconStyle = {'color': 'black', 'fontSize': '2.5rem', 'cursor': 'pointer', 'marginLeft': '2rem'};


    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let isCancelled = false;
            try {
                const response = await getUserInfo();

                if(!response){
                    navigate("/auth");
                    return;
                }
                if(!isCancelled) {
                    setUser(response.user);

                }

            } catch (error) {

                navigate("/auth");

            }
            return () => {
                isCancelled = true;
            }
        }
        fetchData();


    }, [() => handleUpdateData()]);

    const handleData = (e) => {
        setData({...data, [e.target.name]: e.target.value});
        console.log(data);
    }

    const handleUpdateData = async () => {
        try{
            const response = await handleUpdate(data);
            console.log(response);
            setEdit(!edit);
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div className={"profile-page-container"}>

                <LeftMenu></LeftMenu>


            <div className="profile-content-wrapper">
                <h1 className={"page-title"}>Paramètres</h1>
                <div className="photo">
                    <h3 className="item-title">Photo de profil</h3>
                    <div className="photo-content">
                        {
                            user.photo && <img src={user.photo} alt="Avatar" className={"user-avatar settings-picture"}/>
                        }
                        {editPhoto && <label htmlFor="file" className={"photo-input-label"}>Choisir une photo</label>}
                        { editPhoto && <input  className={"photo-input"} type="file" name={"file"} id={"file"} onChange={handleImage}/>}
                        { editPhoto && file && <h4 className={"file-name-text"}>{file.name}</h4>}
                        { editPhoto && <MdClear style={IconStyle} onClick={handleEditPhoto}>annuler</MdClear>}
                        { editPhoto && <MdSave style={IconStyle} onClick={handleUpload}>enregitsrer</MdSave>}
                        { !editPhoto && <MdCreate style={IconStyle} onClick={handleEditPhoto}></MdCreate>}
                    </div>
                </div>
                <div className="profile-info-container">
                    <div className="profile-info">
                        <div className="profile-info-item">
                            <label htmlFor="email">Email :</label>
                            <h4>{user.email}</h4>
                        </div>
                        <div className="profile-info-item">
                            <label htmlFor="pseudo">Pseudo :</label>
                            <h4>{user.pseudo}</h4>
                        </div>
                        <div className="profile-info-item">
                            <label htmlFor="nom">Nom :</label>
                            <input onChange={handleData} className={"input-item"} type="text" name={"nom"} id={"nom"} defaultValue={user.nom} disabled={!edit}/>
                        </div>
                        <div className="profile-info-item">
                            <label htmlFor="nom">Prénom :</label>
                            <input onChange={handleData} className={"input-item"} type="text" name={"prenom"} id={"prenom"} defaultValue={user.prenom} disabled={!edit}/>
                        </div>
                    </div>
                </div>
                <button onClick={handleEdit}>Modifier</button>
                <button onClick={handleUpdateData}>Enregistrer</button>
                
            </div>

        </div>
    )
}