import "../../styles/Card.css"
import PropTypes from 'prop-types'
export default function Card({ label, title, picture }) {
    return (
        <div className="lmj-card">
            <span>{label}</span>
            <img src={picture} alt="freelance" height={80} width={80} />
            <span>{title}</span>
        </div>
    )
}

Card.propTypes = {
    label: PropTypes.string,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string
}

Card.defaultProps = {
    title: "Titre par défaut"
}