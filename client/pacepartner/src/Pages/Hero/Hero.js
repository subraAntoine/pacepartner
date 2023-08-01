import "./hero.css"
import IconYellow from "../../Assets/IconYellow.png"
import YellowMtn from "../../Assets/yeelow-mtn.svg"

import { Link } from "react-router-dom";
export default function Hero() {
    return (
        <div className="hero">
            <div className="hero-text">
                <div className="left-top-icon">
                    <img className="icon" src={IconYellow} alt="icon" />
                </div>
                <div className="text">
                    <h1 className="hero-title">PacePartner.</h1>
                    <p className="hero-subtitle">Unissez vos forces, repoussez vos limites.</p>
                    <div className="link-container">
                        <Link className="link-btn" to={"/auth"}>Se connecter</Link>
                    </div>

                </div>
                <img src={YellowMtn} alt="yellow-mtn" className="yellow-mtn"/>
            </div>
        </div>
    )
}