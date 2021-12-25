import styled from "styled-components"
import colors from "../../utils/style/colors"
import { Link } from "react-router-dom"

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20001;
    background-color: rgb(0, 0, 0, 0.7);
    height: 100vh;
    width: 100vw;
`

const Popup = styled.div`
    height: 30vh;
    width: 30vw;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1%;
    border-radius: 10px;
    opacity: 1;
`

const ErrorTitle = styled.h1`
    align-self: start;
    color: ${colors.error}
`
const StyledLink = styled(Link).attrs((props) => {
    return { className: `navItem fullLink` }
})``

export default function ErrorPopup() {
    return (
        <ErrorContainer>
            <Popup>
                <ErrorTitle>Error</ErrorTitle>
                <span>Oups... Une erreur est survenue. Veuillez essayez de nouveau ultérieurement. Le cas échéant, veuillez contacter le support.</span>
                <StyledLink to="/">Fermer et retourner à l'accueil</StyledLink>
            </Popup>
        </ErrorContainer>
    )
}