
import "./entrainement.css";
import LeftMenu from "../../Layout/LeftMenu/LeftMenu";
import {MdAddCircle, MdAddCircleOutline} from "react-icons/md";
import {useState} from "react";
export default function Entrainement () {

    const [isNewEntrainementHovered, setIsNewEntrainementHovered] = useState(false);

    const newEntrainementIconStyle = {color: "black", fontSize: "4rem", position: "absolute", bottom: "5%", right: "3%", cursor: "pointer", transition: "all 0.3s ease-in-out"}

    const handleHoverIcon = () => {
        setIsNewEntrainementHovered(!isNewEntrainementHovered);
    }


    return (
        <>
            <LeftMenu></LeftMenu>
            <div className="entrainement-page-content-wrapper">
                <h1> Parcourir les entraînements PacePartner </h1>
                <div className="new-entrainement-wrapper">
                    {
                        isNewEntrainementHovered ? <MdAddCircle onMouseLeave={handleHoverIcon} style={newEntrainementIconStyle}/> : <MdAddCircleOutline onMouseEnter={handleHoverIcon} style={newEntrainementIconStyle}/>
                    }

                </div>
            </div>

        </>
    )
}