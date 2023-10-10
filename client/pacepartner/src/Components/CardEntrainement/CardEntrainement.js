import './cardEntrainement.css'
import {useEffect, useState} from "react";
import MapComponent from "../Map/Map";
import Button from "../Button/Button";
import {useUser} from "../../Context/userContext";
import joinEntrainement from "../../Api/Entrainements/JoinEntrainement";
import getProfilePic from "../../Api/User/GetProfilePic";

import axios from "axios";
import GetUserPseudo from "../../Api/Entrainements/UserPseudo";


export default function CardEntrainement({entrainement, updateDataTrigger}) {

    const [date, setDate] = useState(null);
    const [organisateurName, setOrganisateurName] = useState(null);
    const [organisateurPic, setOrganisateurPic] = useState(null);
    const {user, setUser} = useUser();
    const [participantsInfo, setParticipantsInfo] = useState(null);

    const handleJoinEntrainement = async () => {
        try{
            const response = await joinEntrainement(entrainement._id);
            updateDataTrigger(true);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (entrainement) {
            const NewDate = new Date(entrainement.dateEntrainement);
            const day = NewDate.getDate();
            const month = NewDate.getMonth() + 1;
            const year = NewDate.getFullYear();

            setDate(`${day}/${month}/${year}`);

            const getOrganisateurPseudo = async () => {
                try {
                    const nameTemp = await GetUserPseudo(entrainement.organisateur);
                    const picTemp = await getProfilePic(entrainement.organisateur);
                    setOrganisateurName(nameTemp);
                    setOrganisateurPic(picTemp.data.profilePic);

                } catch (error) {
                    console.log(error);
                }
            }

            const getParticipantsPseudo = async () => {
                try {
                    const participantsTemp = await Promise.all(entrainement.participants.map(async (participant) => {
                        const participantName = await GetUserPseudo(participant);
                        const participantPic = await getProfilePic(participant);
                        return {name: participantName, pic: participantPic.data.profilePic};
                    }));
                    setParticipantsInfo(participantsTemp);
                } catch (error) {
                    console.log(error);
                }
            }

            getOrganisateurPseudo();
            getParticipantsPseudo();



        }
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
                }>{entrainement.sportEntrainement} / {entrainement.typeEntrainement}</h3>
                <h3>Date de l'entrainement : <span className={"card-text-span"}>{
                    date
                }</span> </h3>
            </div>
            <div className="entrainement-card-body" >
                <div className="card-participants-info">
                    <div className="organisateur-info-entrainement">
                        <h3>Organisateur : </h3>
                        <div className="organisateur-info-square">
                            <h3 ><span className={"organisateur-name-entrainement"}>{organisateurName}</span> </h3>
                            {organisateurPic && <img src={organisateurPic} className={"organisateur-pic-entrainement"} alt=""/>}
                        </div>

                    </div>

                    <h3>Nombre de participants : <span className={"card-text-span"}>{entrainement.participants.length} / {entrainement.nbMaxParticipants}</span></h3>
                    {entrainement.participants.length > 0 && <h3 className={"participants-list-container"}>Participants : <span className={"participants-list-span"}>{
                        participantsInfo && participantsInfo.map((participant, index) => {
                            return(
                                <div className={"participants-entrainement-square"}>
                                    <span key={index}>{participant.name}</span>
                                    <img className={"participants-entrainement-pic"} src={participant.pic} alt=""/>
                                </div>

                            )
                        })
                    }</span></h3>}
                    <h3>Distance estimée : <span className={"card-text-span"}>{entrainement.distanceEntrainement} km</span></h3>
                    <h3>Durée estimée : <span className={"card-text-span"}>{entrainement.dureeEntrainement} min</span> </h3>
                    <h3>Description :</h3>
                    <p className={"entrainement-card-desc"}>
                        {entrainement.descriptionEntrainement}
                    </p>

                    {
                        (user._id !== entrainement.organisateur) && <Button className={"join-entrainement-btn"} onClick={() => handleJoinEntrainement(entrainement)} text={"Rejoindre l'entrainement"}></Button>
                    }



                </div>
                <div className="card-map-container">
                    <MapComponent coordinates={entrainement.gpsLocation.coordinates}></MapComponent>
                    <h3 className={"card-depart-adresse"}>Point de départ : <span className={"card-text-span"}>{entrainement.lieuEntrainement}</span></h3>
                </div>


            </div>
        </div>
    )
}