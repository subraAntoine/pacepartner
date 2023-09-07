import LeftMenu from "../../Layout/LeftMenu/LeftMenu";
import "./parametres.css"
import {useUser} from "../../Context/userContext";
import handleImageUpload from "../../Api/User/ProfilePicture";
import {useState, useEffect} from "react";
import {MdCreate, MdSave, MdClear} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import getUserInfo from "../../Api/User/UserInfo";
import handleUpdate from "../../Api/User/Update";
import MapBox from "../../Components/MapBox/MapBox";
import Button from "../../Components/Button/Button";

export default function Parametres() {

    const {user, setUser} = useUser();
    const [file, setFile] = useState(null);
    const [edit, setEdit] = useState(false);
    const [editPhoto, setEditPhoto] = useState(false);
    const [data, setData] = useState(null);
    const [updateDataTrigger, setUpdateDataTrigger] = useState(false);
    const [sports, setSports] = useState([]);
    const [validFormat, setValidFormat] = useState({
        record5km: true,
        record10km: true,
        recordSemi: true,
        recordMarathon: true,
        VMA: true,
        RunVolumeHebdo: true,
        longestRun: true,
        FTP: true,
        BikeVolumeHebdo: true,
        longestBike: true
    });


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
                    setSports(response.user.sports);
                }

            } catch (error) {

                navigate("/auth");

            }
            setUpdateDataTrigger(false);
            return () => {
                isCancelled = true;
            }
        }
        fetchData();

    }, [updateDataTrigger]);

    const handleData = (e) => {
        setData({...data, [e.target.name]: e.target.value});
        console.log(data);
    }

    const handleUpdateData = async () => {
        if (data){
            try{
                setData({ ...data, "sports": sports});
                const response = await handleUpdate(data);
                console.log(response);
                setEdit(!edit);
                setUpdateDataTrigger(true);
            } catch (err) {
                console.log(err);
            }
        }
        else{
           setEdit(!edit)
        }
    }



    const handleCityData = (value) => {
        setData({...data, "localisation": value});
        console.log(data);
    }

    const handleSportsData = (e) => {
        const sportId = e.target.id;
        const isChecked = e.target.checked;

        // Mettre à jour la liste des sports en fonction de la case cochée/décochée
        let updatedSports;
        if (isChecked) {
            updatedSports = [...sports, sportId];
        } else {
            updatedSports = sports.filter(sport => sport !== sportId);
        }
        console.log(updatedSports);
        setSports(updatedSports);
        setData({...data, "sports": updatedSports});
    };

    const isTimeFormatValid = (time) => {
        const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
        return timePattern.test(time);
    };
    const handleTimeData = (e) => {
        if(isTimeFormatValid(e.target.value)) {
            setData({...data, [e.target.name] : e.target.value});
            setValidFormat({...validFormat, [e.target.name] : true});
        } else{
            setValidFormat({...validFormat, [e.target.name] : false});
        }
        console.log(data);
    }

    const handleVMAData = (e) => {
        if(e.target.value <= 25 && e.target.value >= 8) {
            setData({...data, [e.target.name] : e.target.value});
            setValidFormat({...validFormat, [e.target.name] : true});
        } else{
            setValidFormat({...validFormat, [e.target.name] : false});
        }
    }

    const handleVolumeData = (e) => {
        if(e.target.value <= 400 && e.target.value >= 0) {
            setData({...data, [e.target.name] : e.target.value});
            setValidFormat({...validFormat, [e.target.name] : true});
        } else{
            setValidFormat({...validFormat, [e.target.name] : false});
        }

    }

    const handleLongestRunData = (e) => {
        if(e.target.value <= 500 && e.target.value >= 0) {
            setData({...data, [e.target.name] : e.target.value});
            setValidFormat({...validFormat, [e.target.name] : true});
        } else{
            setValidFormat({...validFormat, [e.target.name] : false});
        }
    }

    const handleFTPData = (e) => {
        if(e.target.value <= 500 && e.target.value >= 0) {
            setData({...data, [e.target.name] : e.target.value});
            setValidFormat({...validFormat, [e.target.name] : true});
        } else{
            setValidFormat({...validFormat, [e.target.name] : false});
        }

    }

    const handleLongestBikeData = (e) => {
        if(e.target.value <= 1000 && e.target.value >= 0) {
            setData({...data, [e.target.name] : e.target.value});
            setValidFormat({...validFormat, [e.target.name] : true});
        } else{
            setValidFormat({...validFormat, [e.target.name] : false});
        }

    }

    const handleBikeVolumeData = (e) => {
        if(e.target.value <= 3000 && e.target.value >= 0) {
            setData({...data, [e.target.name] : e.target.value});
            setValidFormat({...validFormat, [e.target.name] : true});
        } else{
            setValidFormat({...validFormat, [e.target.name] : false});
        }

    }





    return (
        <div className={"profile-page-container"}>

                <LeftMenu></LeftMenu>


            <div className="profile-content-wrapper">

                <h1 className={"page-title"}>Paramètres</h1>
                <div className="circle-top-right"></div>

                <div className="photo-wrapper">
                    <div className="photo">
                        <h3 className="item-title">Photo de profil :</h3>
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
                </div>

                <div className="profile-info-container">
                    <div className="profile-info">

                        <div className="profile-info-item">
                            <label htmlFor="email">Email :</label>
                            <h4 className={"input-item"}>{user.email}</h4>
                        </div>
                        <div className="profile-info-item">
                            <label htmlFor="pseudo">Pseudo :</label>
                            <h4 className={"input-item"}>{user.pseudo}</h4>
                        </div>
                        <div className="profile-info-item">
                            <label htmlFor="nom">Nom :</label>
                            <input onChange={handleData} className={"input-item"} type="text" name={"nom"} id={"nom"} defaultValue={user.nom} disabled={!edit}/>
                        </div>
                        <div className="profile-info-item">
                            <label htmlFor="nom">Prénom :</label>
                            <input onChange={handleData} className={"input-item"} type="text" name={"prenom"} id={"prenom"} defaultValue={user.prenom} disabled={!edit}/>
                        </div>
                        <div className="profile-info-item">
                            <label htmlFor="nom">Localisation:</label>
                            {
                                edit && <MapBox onSuggestionSelected={handleCityData} disabled={!edit}></MapBox>
                            }

                            <h4 className={"input-item"}>{user.localisation}</h4>
                        </div>
                        <div className="profile-info-item">
                            <label htmlFor="nom">Date de naissance :</label>
                            <input type="date" defaultValue={user.dateNaissance} name={"dateNaissance"} className={"input-item"} onChange={handleData} disabled={!edit}/>
                        </div>

                        <div className="profile-info-item">
                            <label htmlFor="nom">Description :</label>
                            <textarea onChange={handleData} className={"input-item area-input"} name="description" id="description" cols="30" rows="10" defaultValue={user.description} disabled={!edit}></textarea>
                        </div>

                        <div className="profile-info-item">
                            <label htmlFor="nom">Sports :</label>
                            <div className="sports-checkbox" >
                                <div className="checkbox-item">
                                    <input onClick={handleSportsData}  className="checkbox-input" type="checkbox" name="sport" id="running" value={"running"} defaultChecked={user && user.sports && user.sports.includes("running")} disabled={!edit} />
                                    <label htmlFor="running">Running</label>
                                </div>
                                <div className="checkbox-item">
                                    <input onClick={handleSportsData}  className="checkbox-input"  type="checkbox" name="sport" id="trail" value={"trail"} defaultChecked={user && user.sports && user.sports.includes("trail")} disabled={!edit}  />
                                    <label htmlFor="trail">Trail</label>
                                </div>
                                <div className="checkbox-item">
                                    <input onClick={handleSportsData}  className="checkbox-input"  type="checkbox" name="sport" id="velo" value={"velo"} defaultChecked={user && user.sports && user.sports.includes("velo")} disabled={!edit} />
                                    <label htmlFor="cyclisme">Cyclisme</label>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="profile-info">
                        <h3 className="item-title">Indices de performances</h3>
                        <h4 className={"item-desc"}>(Ces données sont uniquement visibles par vous-même et sont utilisées pour trouver des partenaires de votre niveau.)</h4>
                        <div className="profile-info-item">
                            {
                                user && user.sports && (user.sports.includes("trail") || user.sports.includes("running")) && (
                                    <>
                                        <p className={"indice-title"}>Indices de performances de course à pied et de trail :</p>
                                        <div className="profile-info-item">
                                            <label htmlFor="record5km">record 5km :</label>
                                            <input onChange={handleTimeData} className={"input-item"} type="text" name={"record5km"} id={"record5km"} defaultValue={user.record5km} disabled={!edit}/>
                                            {
                                                !validFormat.record5km && <p className={"format-error-text"}>Le temps doit être au format "HH:MM:SS"</p>
                                            }
                                        </div>
                                        <div className="profile-info-item">
                                            <label htmlFor="record10km">record 10km :</label>
                                            <input onChange={handleTimeData} className={"input-item"} type="text" name={"record10km"} id={"record10km"} defaultValue={user.record10km} disabled={!edit}/>
                                            {
                                                !validFormat.record10km && <p className={"format-error-text"}>Le temps doit être au format "HH:MM:SS"</p>
                                            }
                                        </div>
                                        <div className="profile-info-item">
                                            <label htmlFor="recordSemi">record semi-marathon :</label>
                                            <input onChange={handleTimeData} className={"input-item"} type="text" name={"recordSemi"} id={"recordSemi"} defaultValue={user.recordSemi} disabled={!edit}/>
                                            {
                                                !validFormat.recordSemi && <p className={"format-error-text"}>Le temps doit être au format "HH:MM:SS"</p>
                                            }
                                        </div>
                                        <div className="profile-info-item">
                                            <label htmlFor="recordMarathon">record marathon :</label>
                                            <input onChange={handleTimeData} className={"input-item"} type="text" name={"recordMarathon"} id={"recordMarathon"} defaultValue={user.recordMarathon} disabled={!edit}/>
                                            {
                                                !validFormat.recordMarathon && <p className={"format-error-text"}>Le temps doit être au format "HH:MM:SS"</p>
                                            }
                                        </div>
                                        <div className="profile-info-item">
                                            <label htmlFor="VMA">VMA :</label>
                                            <input onChange={handleVMAData} className={"input-item"} type="number" name={"VMA"} id={"VMA"} defaultValue={user.VMA} disabled={!edit}/>
                                            {
                                                !validFormat.VMA && <p className={"format-error-text"}>La VMA doit être comprise entre 8 et 24km/h.</p>
                                            }
                                        </div>
                                        <div className="profile-info-item">
                                            <label htmlFor="RunVolumeHebdo">Volume hebdomadaire de course à pied (km) :</label>
                                            <input onChange={handleVolumeData} className={"input-item"} type="number" name={"RunVolumeHebdo"} id={"RunVolumeHebdo"} defaultValue={user.RunVolumeHebdo} disabled={!edit}/>
                                            {
                                                !validFormat.RunVolumeHebdo && <p className={"format-error-text"}>Cette valeur doit être un nombre compris entre 0 et 400.</p>
                                            }
                                        </div>
                                        <div className="profile-info-item">
                                            <label htmlFor="longestRun">Plus longue sortie course à pied (km) :</label>
                                            <input onChange={handleLongestRunData} className={"input-item"} type="number" name={"longestRun"} id={"longestRun"} defaultValue={user.longestRun} disabled={!edit}/>
                                            {
                                                !validFormat.longestRun && <p className={"format-error-text"}>Cette valeur doit être un nombre compris entre 0 et 500.</p>
                                            }
                                        </div>
                                    </>
                                )
                            }
                            {
                                user && user.sports && user.sports.includes("velo") && (
                                    <>
                                        <p className={"indice-title"}>Indices de performances de cyclisme :</p>
                                        <div className="profile-info-item">
                                            <label htmlFor="FTP">FTP (W) :</label>
                                            <input onChange={handleFTPData} className={"input-item"} type="number" name={"FTP"} id={"FTP"} defaultValue={user.FTP} disabled={!edit}/>
                                            {
                                                !validFormat.FTP && <p className={"format-error-text"}>Cette valeur doit être un nombre compris entre 0 et 500.</p>
                                            }
                                        </div>
                                        <div className="profile-info-item">
                                            <label htmlFor="longestBike">Plus longue sortie cyclisme (km) :</label>
                                            <input onChange={handleLongestBikeData} className={"input-item"} type="number" name={"longestBike"} id={"longestBike"} defaultValue={user.longestBike} disabled={!edit}/>
                                            {
                                                !validFormat.longestBike && <p className={"format-error-text"}>Cette valeur doit être un nombre compris entre 0 et 1000.</p>
                                            }
                                        </div>
                                        <div className="profile-info-item">
                                            <label htmlFor="BikeVolumeHebdo">Volume hebdomadaire de cyclisme (km) :</label>
                                            <input onChange={handleBikeVolumeData} className={"input-item"} type="number" name={"BikeVolumeHebdo"} id={"BikeVolumeHebdo"} defaultValue={user.BikeVolumeHebdo} disabled={!edit}/>
                                            {
                                                !validFormat.BikeVolumeHebdo && <p className={"format-error-text"}>Cette valeur doit être un nombre compris entre 0 et 3000.</p>
                                            }
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                {
                    !edit ? <Button onClick={handleEdit} text={"Modifier"}></Button> : <Button onClick={handleUpdateData} text={"Enregistrer"}></Button>
                }


                
            </div>

        </div>
    )
}