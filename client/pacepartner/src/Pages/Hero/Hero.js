import "./hero.css"
import IconYellow from "../../Assets/IconYellow.png"
import Button from "../../Components/Button/Button";
export default function Hero() {
    return (
        <div className="hero">
            <div className="hero-text">
                <div className="left-top-icon">
                    <img className="icon" src={IconYellow} alt="icon" />
                </div>
                <div className="text">
                    <h1 className="hero-title">PacePartner</h1>
                    <p className="hero-subtitle">A tool for runners to find their perfect running partner.</p>
                    <Button text="Get started" />
                </div>
            </div>
        </div>
    )
}