import "./creationEntrainement.css"
import {useState} from "react";
import MapBox from "../MapBox/MapBox";
export default function CreationEntrainement () {

    const [dataEntrainement, setDataEntrainement] = useState({});

    const handleData = (e) => {
        setDataEntrainement({...dataEntrainement, [e.target.name]: e.target.value});
        console.log(dataEntrainement);

    }

    const handleAdresseData = (adresse) => {
        setDataEntrainement({...dataEntrainement, lieuEntrainement: adresse});
        console.log(dataEntrainement);
    }

    return (
        <div className="creation-entrainement-wrapper">
            <h2> Créer un nouvel entraînement </h2>
            <form className="creation-entrainement-form">
                <div className="item-creation-entrainement">
                    <label className={"crea-entrainement-label"} htmlFor="dateEntrainement"> Date de l'entraînement </label>
                    <input onChange={handleData} className={"crea-entrainement-input"} type="date" name="dateEntrainement" id="dateEntrainement" required/>
                </div>
                <div className="item-creation-entrainement">
                    <label className={"crea-entrainement-label"} htmlFor="heureEntrainement"> Heure de l'entraînement </label>
                    <input onChange={handleData} className={"crea-entrainement-input"} type="time" name="heureEntrainement" id="heureEntrainement" required/>
                </div>
                <div className="item-creation-entrainement">
                    <label className={"crea-entrainement-label"} htmlFor="heureEntrainement"> Point de départ </label>
                    <MapBox type={'address'} onSuggestionSelected={handleAdresseData}></MapBox>
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

            </form>
        </div>

    )
}