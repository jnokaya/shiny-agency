import DefaultPicture from "../../../assets/profile.png"
import colors from "../../utils/style/colors"

import PropTypes from 'prop-types'
import styled from "styled-components"
import { Component } from "react"

export default class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFavorite: false
        }
    }

    setIsFavorite = (bFav) => {
        this.setState({ isFavorite: bFav })
    }

    getIsFavorite = () => this.state.isFavorite

    render() {
        const { theme, label, picture, title } = this.props
        const isFavorite = this.getIsFavorite()
        const star = isFavorite ? '⭐️' : ''
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
            height: -webkit-fill-available;
            align-items: center;
            justify-content: space-between;
            transition: 200ms;
            &:hover {
                cursor: pointer;
                box-shadow: 2px 2px 10px ${({ $isDarkMode }) => $isDarkMode ? '#272638' : '#E2E3E9'};
            }
        `
        return (
            <CardWrapper $isDarkMode={theme === 'dark'} onClick={() => { this.setIsFavorite(!isFavorite) }}>
                <CardLabel>{label}</CardLabel>
                <CardImage src={picture} alt="freelance" />
                <h1>{star}{title}{star}</h1>
            </CardWrapper>
        )
    }
}

Card.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired
}

Card.defaultProps = {
    label: "",
    title: "",
    picture: DefaultPicture,
    theme: "light"
}