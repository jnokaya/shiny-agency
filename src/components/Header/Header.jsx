import { Link } from "react-router-dom"

export default function Header() {
    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/survey/1">Questionnaire</Link>
            <Link to="/freelances">Freelances</Link>
        </nav>
    )
}