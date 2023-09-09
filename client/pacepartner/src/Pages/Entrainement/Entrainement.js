
import "./entrainement.css";
import LeftMenu from "../../Layout/LeftMenu/LeftMenu";
import {MdAddCircle, MdAddCircleOutline} from "react-icons/md";
import {useEffect, useState} from "react";
import CreationEntrainement from "../../Components/CreationEntrainement/CreationEntrainement";
import getUserInfo from "../../Api/User/UserInfo";
import {useUser} from "../../Context/userContext";
import {useNavigate} from "react-router-dom";

export default function Entrainement () {

    const [isNewEntrainementHovered, setIsNewEntrainementHovered] = useState(false);
    const [displayCreaEntrainement, setDisplayCreaEntrainement] = useState(false);
    const {user, setUser} = useUser();
    const [updateDataTrigger, setUpdateDataTrigger] = useState(false);

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
        fetchData();

    }, [updateDataTrigger]);

    const newEntrainementIconStyle = {color: "black", fontSize: "4rem", position: "absolute", bottom: "5%", right: "3%", cursor: "pointer", transition: "all 0.3s ease-in-out"}


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
                    displayCreaEntrainement && <CreationEntrainement toggleCreaEntrainement={toggleCreaEntrainement}></CreationEntrainement>
                }

                <div className="new-entrainement-wrapper">
                    {
                        isNewEntrainementHovered ? <MdAddCircle onClick={toggleCreaEntrainement} onMouseLeave={handleHoverIcon} style={newEntrainementIconStyle}/> : <MdAddCircleOutline onMouseEnter={handleHoverIcon} style={newEntrainementIconStyle}/>
                    }
                </div>
            </div>

        </>
    )
}