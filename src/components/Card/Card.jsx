import DefaultPicture from "../../assets/profile.png"
import colors from "../../utils/style/colors"

import PropTypes from 'prop-types'
import styled from "styled-components"
import { useState } from "react"
import { useTheme } from "../../utils/hooks"

const CardLabel = styled.span`
    color: ${colors.primary};
    font-size: 22px;
    font-weight: bold;
    align-self: start;
`
const CardImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
`
const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? colors.backgroundDark : colors.backgroundLight};
    border-radius: 30px;
    width: 350px;
    align-items: center;
    justify-content: space-between;
    transition: 200ms;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px ${({ $isDarkMode }) => $isDarkMode ? '#272638' : '#E2E3E9'};
    }
`
export default function Card({ label, title, picture }) {
    const { theme } = useTheme()
    const [isFavorite, setIsFavorite] = useState(false)
    const star = isFavorite ? '⭐️' : ''
    return (
        <CardWrapper $isDarkMode={theme === 'dark'} onClick={() => { setIsFavorite(!isFavorite) }}>
            <CardLabel>{label}</CardLabel>
            <CardImage src={picture} alt="freelance" />
            <h1>{star}{title}{star}</h1>
        </CardWrapper>
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