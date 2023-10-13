
import "./entrainement.css";
import LeftMenu from "../../Layout/LeftMenu/LeftMenu";
import {MdAddCircle, MdAddCircleOutline} from "react-icons/md";
import {useEffect, useState} from "react";
import CreationEntrainement from "../../Components/CreationEntrainement/CreationEntrainement";
import getUserInfo from "../../Api/User/UserInfo";
import {useUser} from "../../Context/userContext";
import {useNavigate} from "react-router-dom";
import GetAllEntrainement from "../../Api/Entrainements/AllEntrainement";
import CardEntrainement from "../../Components/CardEntrainement/CardEntrainement";
import GetGPSCoordinates from "../../Api/Entrainements/GetGPSCoordinates";

export default function Entrainement () {

    const [isNewEntrainementHovered, setIsNewEntrainementHovered] = useState(false);
    const [displayCreaEntrainement, setDisplayCreaEntrainement] = useState(false);
    const {user, setUser} = useUser();
    const [updateDataTrigger, setUpdateDataTrigger] = useState(false);
    const [entrainementList, setEntrainementList] = useState([]);
    const [maxDistance, setMaxDistance] = useState(10);
    const [sportFilter, setSportFilter] = useState("none");
    const [seanceFilter, setSeanceFilter] = useState("none");


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
            setUpdateDataTrigger(false);
            return () => {
                isCancelled = true;
            }
        }

        const fetchEntrainementList = async () => {
            try{
                const userPosition = await GetGPSCoordinates(user.localisation);

                if (userPosition) {
                    const entrainementTemp = await GetAllEntrainement(userPosition[0], userPosition[1], maxDistance);
                    setEntrainementList(entrainementTemp.data.entrainements);
                }


            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

        fetchEntrainementList();



    }, [updateDataTrigger]);

    const newEntrainementIconStyle = {color: "black", fontSize: "4rem", position: "fixed", bottom: "5%", right: "3%", cursor: "pointer", transition: "all 0.3s ease-in-out", zIndex: "10"}


    const handleHoverIcon = () => {
        setIsNewEntrainementHovered(!isNewEntrainementHovered);
    }

    const toggleCreaEntrainement = () => {
        setDisplayCreaEntrainement(!displayCreaEntrainement);
    }

    const handleDistance = (e) => {
        setMaxDistance(e.target.value);
    }

    const handleSportFilter = (e) => {
        setSportFilter(e.target.value);

    }

    const handleSeanceFilter = (e) => {
        setSeanceFilter(e.target.value);
        console.log(seanceFilter);

    }

    return (
        <>
            <LeftMenu></LeftMenu>
            <div className="entrainement-page-content-wrapper">
                <h1> Parcourir les entraînements PacePartner </h1>
                {
                    displayCreaEntrainement && <CreationEntrainement updateDataTrigger={setUpdateDataTrigger} toggleCreaEntrainement={toggleCreaEntrainement}></CreationEntrainement>
                }

                <div className="activity-filter-container">
                    <h3 className={"filter-title"}>Filtrer vos entrainements !</h3>
                    <div className="filter-container">
                        <div className="distance-max-wrapper">
                            <h3 className={"distance-max-content"}>Distance : {maxDistance} km</h3>
                            <input step={"10"} className={"distance-max-slider"} type="range" max={"300"} min={"0"} defaultValue={"20"} onChange={handleDistance}/>
                        </div>

                        <div className="sport-menu-wrapper">
                            <h3 className={"sport-menu-title"}>Sport</h3>
                            <select onChange={handleSportFilter} className={"sport-menu"}>
                                <option  value="none">Tous les sports</option>
                                <option value="running">Running</option>
                                <option value="trail">Trail</option>
                                <option value="cyclisme">Cyclisme</option>
                            </select>
                        </div>

                        <div className="sport-menu-wrapper">
                            <h3 className={"sport-menu-title"}>Type de séance</h3>
                            <select onChange={handleSeanceFilter} className={"sport-menu"}>
                                <option  value="none">Tous les types</option>
                                <option value="endurance">Endurance</option>
                                <option value="seuil">Seuil</option>
                                <option value="vma">VMA</option>
                                <option value="sortielongue">Sortie longue</option>
                            </select>
                        </div>

                    </div>

                    <button className={"filter-update-btn"} onClick={() => setUpdateDataTrigger(true)}>Update</button>
                </div>




                <div className="new-entrainement-wrapper">
                    {
                        isNewEntrainementHovered ? <MdAddCircle onClick={toggleCreaEntrainement} onMouseLeave={handleHoverIcon} style={newEntrainementIconStyle}/> : <MdAddCircleOutline onMouseEnter={handleHoverIcon} style={newEntrainementIconStyle}/>
                    }
                </div>
                <div className="entrainement-list-wrapper">
                    {
                        entrainementList && entrainementList.map((entrainement, index) => {
                            return <CardEntrainement updateDataTrigger={setUpdateDataTrigger} key={index} entrainement={entrainement}></CardEntrainement>
                        })
                    }
                </div>

            </div>

        </>
    )
}