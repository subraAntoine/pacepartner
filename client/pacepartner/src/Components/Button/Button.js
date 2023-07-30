import "./Button.css"
export default function Button(props) {
    return (
        <button type="submit" className={`button ${props.className}`} onClick={props.onClick} disabled={props.disabled}>
            {props.text}
        </button>
    )
}