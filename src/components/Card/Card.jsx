import DefaultPicture from "../../assets/profile.png"
import { useContext } from "react"
import { ThemeContext } from "../../utils/context"
import colors from "../../utils/style/colors"

import PropTypes from 'prop-types'
import styled from "styled-components"

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
    const { theme } = useContext(ThemeContext)
    return (
        <CardWrapper $isDarkMode={theme === 'dark'}>
            <CardLabel>{label}</CardLabel>
            <CardImage src={picture} alt="freelance" />
            <h1>{title}</h1>
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