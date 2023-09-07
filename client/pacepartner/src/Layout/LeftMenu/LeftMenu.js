
import './leftmenu.css'
import TransparentLogo from '../../Assets/logoTransparent.svg'
import ProfilePicture from '../../Assets/profilpicture.png'
import {useUser} from "../../Context/userContext";
import {MdArrowForwardIos, MdHome, MdGroups, MdOutlineHome,MdOutlineLogout, MdOutlineGroups, MdOutlineDirectionsRun, MdOutlineDiversity2, MdOutlineStadium, MdOutlineSettingsInputComponent} from "react-icons/md";
import handleLogout from "../../Api/User/Logout";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import IconLogo from "../../Components/IconLogo/IconLogo";


export default function LeftMenu () {
    const {user, setUser} = useUser();

    const style = {zIndex:"3", color: "black", fontSize: "1.8rem"}

    const navigate = useNavigate();

    const Logout = () => {
        try {
            handleLogout();
            setUser({});
            navigate("/auth");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="left-menu">
            <div className="left-menu-wrapper">
                <Link to={"/home"} className={"home-menu-link"}>
                    <div className="icon-pacepartner">
                        <IconLogo className={"leftmenu"}></IconLogo>

                    </div>
                    <h2 className="pacepartner-texte">PacePartner.</h2>

                </Link>
                <Link to={"/profile"} className="profile-menu-link">
                    <img src={user.photo} alt="Avatar" className={"user-avatar"}/>
                    <h3 className="user-name">{user.pseudo}</h3>
                    <MdArrowForwardIos style={style}/>
                </Link>
                <div className="pages-menu-link">
                    <Link to={"/home"} className="page-link">
                        <MdOutlineHome style={style}/>
                        <h3 className={"link-page-name"}>Accueil</h3>
                    </Link>
                    <Link to={"/communaute"} className="page-link">
                        <MdOutlineDiversity2 style={style}/>
                        <h3 className={"link-page-name"}>Communauté</h3>
                    </Link>
                    <Link to={"/entrainement"} className="page-link">
                        <MdOutlineDirectionsRun style={style}/>
                        <h3 className={"link-page-name"}>Entraînements</h3>
                    </Link>
                    <Link to={"/"} className="page-link">
                        <MdOutlineGroups style={style}/>
                        <h3 className={"link-page-name"}>Clubs</h3>
                    </Link>
                    <Link to={"/"} className="page-link">
                        <MdOutlineStadium style={style}/>
                        <h3 className={"link-page-name"} >Événements</h3>
                    </Link>
                </div>
                <div className="icon-menu-link">
                    <button onClick={Logout} className="icon-link">
                        <MdOutlineLogout style={style}/>
                    </button>


                    <Link to={"/parametres"} className="icon-link">
                        <MdOutlineSettingsInputComponent style={style}/>
                    </Link>

                </div>

            </div>


        </div>
    )
}