import IconYellow from "../../Assets/Logo carré.png";
import "./IconLogo.css";

export default function IconLogo(props) {
  return (
    <div className="logo">
      <img className={`${props.className}`} src={IconYellow} alt="logo" />
    </div>
  );
}
