
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

export default function Entrainement () {

    const [isNewEntrainementHovered, setIsNewEntrainementHovered] = useState(false);
    const [displayCreaEntrainement, setDisplayCreaEntrainement] = useState(false);
    const {user, setUser} = useUser();
    const [updateDataTrigger, setUpdateDataTrigger] = useState(false);
    const [entrainementList, setEntrainementList] = useState([]);

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
                const entrainementTemp = await GetAllEntrainement();
                setEntrainementList(entrainementTemp.data.entrainements);


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

    return (
        <>
            <LeftMenu></LeftMenu>
            <div className="entrainement-page-content-wrapper">
                <h1> Parcourir les entraînements PacePartner </h1>
                {
                    displayCreaEntrainement && <CreationEntrainement updateDataTrigger={setUpdateDataTrigger} toggleCreaEntrainement={toggleCreaEntrainement}></CreationEntrainement>
                }

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