import './cardEntrainement.css'


export default function CardEntrainement({entrainement}) {

    return (
        <div className="entrainement-card-wrap">
            <div className="entrainement-card-header">
                <h3>{entrainement.typeEntrainement}</h3>
            </div>
        </div>
    )
}