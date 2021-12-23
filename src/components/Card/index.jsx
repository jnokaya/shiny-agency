import DefaultPicture from "../../assets/profile.png"
import "../../styles/Card.css"
import PropTypes from 'prop-types'
import styled from "styled-components"

const CardLabel = styled.span`
    color: #5843e4;
    font-size: 22px;
    font-weight: bold;
`
const CardImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
`
export default function Card({ label, title, picture }) {
    return (
        <div className="lmj-card">
            <span>{label}</span>
            <CardImage src={picture} alt="freelance" />
            <CardLabel>{title}</CardLabel>
        </div>
    )
}

Card.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
}

Card.defaultProps = {
    label: "",
    title: "",
    picture: DefaultPicture
}