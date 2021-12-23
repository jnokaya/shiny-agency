import { useParams, Link } from "react-router-dom"
export default function Survey() {
    let { questionNumber } = useParams()
    questionNumber = Number.parseInt(questionNumber)
    return (
        <div>
            <h1>Questionnaire</h1>
            <h2>Question {questionNumber}</h2>
            {questionNumber >= 1 && (<Link to={`/survey/${questionNumber - 1}`}>Question précédente</Link>)}
            {questionNumber < 10 ? (
                <Link to={`/survey/${questionNumber + 1}`}>Question suivante</Link>
            ) : (
                <Link to="/results">Résultats</Link>
            )}
        </div>
    )
}