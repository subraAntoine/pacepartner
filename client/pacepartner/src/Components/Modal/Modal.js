
import './Modal.css'
import Button from "../Button/Button";
export default function Modal ({modalFunc, textContent, setModalTrigger, modalTrigger}) {
    return (
        <div className={"modal-component"}>
            <div className={"modal-component-content"}>
                <p className={"modal-text"}>{textContent}</p>
                <div className="btn-modal-container">
                    <button className={"modal-btn"} onClick={() => setModalTrigger(!modalTrigger)}>Annuler</button>
                    <button className={"modal-btn2"} onClick={() => {
                        modalFunc();
                        setModalTrigger(!modalTrigger);
                    }}>OK</button>

                </div>




            </div>
        </div>
    )
}