import "./Button.css"
export default function Button(props) {
    return (
        <button type="submit" className="button" onClick={props.onClick}>
            {props.text}
        </button>
    )
}