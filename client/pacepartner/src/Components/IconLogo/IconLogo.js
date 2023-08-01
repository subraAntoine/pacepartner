import IconYellow from '../../Assets/IconYellow.png';
import './IconLogo.css';

export default function IconLogo(props) {
    return (
        <div className="logo">
            <img className={`${props.className}`} src={IconYellow} alt="logo" />
        </div>
    )
}