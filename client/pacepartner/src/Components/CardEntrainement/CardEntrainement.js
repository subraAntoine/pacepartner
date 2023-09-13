import './cardEntrainement.css'
import {useEffect, useState} from "react";
import MapComponent from "../Map/Map";
import GetOrganisateurName from "../../Api/Entrainements/OrganisateurName";
import axios from "axios";


export default function CardEntrainement({entrainement}) {

    const [date, setDate] = useState(null);
    const [organisateurName, setOrganisateurName] = useState(null);

    useEffect(() => {
        if (entrainement) {
            const NewDate = new Date(entrainement.dateEntrainement);
            const day = NewDate.getDate();
            const month = NewDate.getMonth() + 1;
            const year = NewDate.getFullYear();

            setDate(`${day}/${month}/${year}`);

            const getOrganisateurPseudo = async () => {
                try {
                    const nameTemp = await GetOrganisateurName(entrainement.organisateur);
                    setOrganisateurName(nameTemp);
                } catch (error) {
                    console.log(error);
                }
            }
            getOrganisateurPseudo();
            console.log(organisateurName)


        }
        console.log(entrainement);
    }, [entrainement])





    return (
        <div className="entrainement-card-wrap">
            <div className="entrainement-card-header">
                <h3 className={
                    (() => {
                        switch (entrainement.typeEntrainement) {
                            case "SortieLongue":
                                return "entrainement-card-header-long-run";
                            case "Seuil":
                                return "entrainement-card-header-seuil";
                            case "Endurance":
                                return "entrainement-card-header-endurance";
                            case "VMA":
                                return "entrainement-card-header-vma";
                            default:
                                return "entrainement-card-header-default";
                        }
                    })()
                }>{entrainement.typeEntrainement}</h3>
                <h3><span className={"card-text-span"}>Date de l'entrainement :</span> {
                    date
                }</h3>
            </div>
            <div className="entrainement-card-body" >
                <div className="card-participants-info">
                    <h3> <span className={"card-text-span"}>Nombre de participants : </span>{entrainement.participants.length} / {entrainement.nbMaxParticipants}</h3>
                    <h3>Organisateur : {organisateurName}</h3>
                </div>
                <div className="card-map-container">
                    <MapComponent adresse={entrainement.lieuEntrainement}></MapComponent>
                    <h3 className={"card-depart-adresse"}> <span className={"card-text-span"}>Point de départ : </span>{entrainement.lieuEntrainement}</h3>
                </div>


            </div>
        </div>
    )
}