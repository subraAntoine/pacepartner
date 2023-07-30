import IconYellow from '../../Assets/IconYellow.png';
import './IconLogo.css';

export default function IconLogo() {
    return (
        <div className="logo">
            <img className={"iconLogo"} src={IconYellow} alt="logo" />
        </div>
    )
}