import "./creationEntrainement.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import MapBox from "../MapBox/MapBox";
import Button from "../Button/Button";
import axios from "axios";
import getUserInfo from "../../Api/User/UserInfo";
import {useUser} from "../../Context/userContext";
export default function CreationEntrainement ({toggleCreaEntrainement, updateDataTrigger}) {

    const [dataEntrainement, setDataEntrainement] = useState({});
    const [alertFormat, setAlertFormat] = useState({
        dateEntrainement: false,
        nbMaxParticipants: false,
    });
    const [error, setError] = useState(false);


    const handleData = (e) => {
        if(e.target.name === "dateEntrainement"){
            const today = new Date();
            const dateEntrainement = new Date(e.target.value);
            if(dateEntrainement < today){
                setAlertFormat({...alertFormat, dateEntrainement: true});
                return;
            }
            setAlertFormat({...alertFormat, dateEntrainement: false});
        }
        if(e.target.name === "nbMaxParticipants"){
            if(e.target.value < 1 || e.target.value > 8){
                setAlertFormat({...alertFormat, nbMaxParticipants: true});
                return;
            }
            setAlertFormat({...alertFormat, nbMaxParticipants: false});
        }
        setDataEntrainement({...dataEntrainement, [e.target.name]: e.target.value});
        console.log(dataEntrainement);
    }

    const handleAdresseData = (adresse) => {
        setDataEntrainement({...dataEntrainement, lieuEntrainement: adresse});
        console.log(dataEntrainement);
    }

    const handleCreateEntrainement = async (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:3002/entrainements/create', dataEntrainement, {withCredentials: true});
            setError(false)
            updateDataTrigger(true)
            toggleCreaEntrainement();
        } catch (error) {
            console.log(error);
            setError(true)
        }

    }


    return (
        <div className="creation-entrainement-wrapper">
            <h2> Créer un nouvel entraînement </h2>
            {
                error && <p className={"crea-entrainement-alert"}> Une erreur est survenue lors de la création de l'entraînement. </p>
            }
            <form onSubmit={handleCreateEntrainement} className="creation-entrainement-form">
                <div className="item-creation-entrainement">
                    <label className={"crea-entrainement-label"} htmlFor="dateEntrainement"> Date de l'entraînement </label>
                    <input onChange={handleData} className={"crea-entrainement-input"} type="date" name="dateEntrainement" id="dateEntrainement" required/>
                    {
                        alertFormat.dateEntrainement && <p className={"crea-entrainement-alert"}> La date de l'entraînement ne peut pas être antérieure à la date du jour </p>
                    }
                </div>
                <div className="item-creation-entrainement">
                    <label className={"crea-entrainement-label"} htmlFor="heureEntrainement"> Heure de l'entraînement </label>
                    <input onChange={handleData} className={"crea-entrainement-input"} type="time" name="heureEntrainement" id="heureEntrainement" required/>
                </div>
                <div className="item-creation-entrainement">
                    <label className={"crea-entrainement-label"} htmlFor="heureEntrainement"> Point de départ </label>
                    <MapBox type={'address'} onSuggestionSelected={handleAdresseData} mapPlaceholder={"Rechercher une adresse"}></MapBox>
                </div>
                <label className={"crea-entrainement-label"} htmlFor="sportEntrainement"> Sport </label>
                <div className="item-creation-entrainement-checkbox">

                    <div className="checkbox-item-crea-entrainement">
                        <input onChange={handleData} className={"crea-entrainement-input-checkbox"} type="radio" name="sportEntrainement" id="sportEntrainement" value="running" required/>
                        <label className={"crea-entrainement-label"} htmlFor="sportEntrainement"> Course à pied </label>
                    </div>
                    <div className="checkbox-item-crea-entrainement">
                        <input onChange={handleData} className={"crea-entrainement-input-checkbox"} type="radio" name="sportEntrainement" id="sportEntrainement" value="trail" required/>
                        <label className={"crea-entrainement-label"} htmlFor="sportEntrainement"> Trail </label>
                    </div>
                    <div className="checkbox-item-crea-entrainement">
                        <input onChange={handleData} className={"crea-entrainement-input-checkbox"} type="radio" name="sportEntrainement" id="sportEntrainement" value="velo" required/>
                        <label className={"crea-entrainement-label"} htmlFor="sportEntrainement"> Cyclisme </label>
                    </div>
                </div>
                <label className={"crea-entrainement-label"} htmlFor="typeEntrainement" id={"label-type-entrainement"}> Type d'entrainement </label>
                <div className="item-creation-entrainement-checkbox">

                    <div className="checkbox-item-crea-entrainement">
                        <input onChange={handleData} className={"crea-entrainement-input-checkbox"} type="radio" name="typeEntrainement" id="typeEntrainement" value="VMA" required/>
                        <label className={"crea-entrainement-label"} htmlFor="typeEntrainement"> VMA </label>
                    </div>
                    <div className="checkbox-item-crea-entrainement">
                        <input onChange={handleData} className={"crea-entrainement-input-checkbox"} type="radio" name="typeEntrainement" id="typeEntrainement" value="Seuil" required/>
                        <label className={"crea-entrainement-label"} htmlFor="typeEntrainement"> Seuil </label>
                    </div>
                    <div className="checkbox-item-crea-entrainement">
                        <input onChange={handleData} className={"crea-entrainement-input-checkbox"} type="radio" name="typeEntrainement" id="typeEntrainement" value="Endurance" required/>
                        <label className={"crea-entrainement-label"} htmlFor="typeEntrainement"> Endurance </label>
                    </div>
                    <div className="checkbox-item-crea-entrainement">
                        <input onChange={handleData} className={"crea-entrainement-input-checkbox"} type="radio" name="typeEntrainement" id="typeEntrainement" value="SortieLongue" required/>
                        <label className={"crea-entrainement-label"} htmlFor="typeEntrainement"> Sortie longue </label>
                    </div>

                </div>
                <div className="item-creation-entrainement">
                    <label className={"crea-entrainement-label"} htmlFor="descriptionEntrainement"> Description de l'entrainement </label>
                    <textarea onChange={handleData} className={"crea-entrainement-input"} name="descriptionEntrainement" id="descriptionEntrainement" placeholder={"Détaillez les allures et durées des différents intervalles de l'entrainement. "} required/>
                </div>
                <div className="item-creation-entrainement">
                    <label className={"crea-entrainement-label"} htmlFor="distanceEntrainement"> Distance estimée (km) </label>
                    <input onChange={handleData} className={"crea-entrainement-input"} type="number" name="distanceEntrainement" id="distanceEntrainement" required/>
                </div>
                <div className="item-creation-entrainement">
                    <label className={"crea-entrainement-label"} htmlFor="dureeEntrainement"> Durée estimée (min) </label>
                    <input onChange={handleData} className={"crea-entrainement-input"} type="number" name="dureeEntrainement" id="dureeEntrainement" required/>
                </div>
                <div className="item-creation-entrainement">
                    <label className={"crea-entrainement-label"} htmlFor="nbMaxParticipants"> Nombre de participants maximum </label>
                    <input onChange={handleData} className={"crea-entrainement-input"} type="number" name="nbMaxParticipants" id="nbMaxParticipants" required/>
                    {
                        alertFormat.nbMaxParticipants && <p className={"alert-crea-entrainement"}>Le nombre de participants doit être compris entre 1 et 8.</p>
                    }
                </div>
                <div className="item-creation-entrainement">
                    <Button className={"crea-entrainement-btn"} text={"Créer un entrainement"} disabled={(alertFormat.dateEntrainement || alertFormat.nbMaxParticipants)}></Button>
                </div>

            </form>
        </div>

    )
}