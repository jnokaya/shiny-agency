import { Link } from "react-router-dom"
import styled from "styled-components"

import LogoImageSrc from "../../assets/dark-logo.png"
const StyledLink = styled(Link).attrs((props) => {
    return { className: `navItem ${props.$isFullLink ? 'fullLink' : ''}` }
})`
    
`
const HeaderContainer = styled.div.attrs(props => ({className: 'borderBoxSizing'}))`
    position: fixed;
    left: 0px;
    top: 0px;
    width: -webkit-fill-available;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 20000;
`
const LeftContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 30px;
`

const LogoImage = styled.img`
    height: 70px;
    width: 190px;
`

export default function Header() {
    return (
        <HeaderContainer>
            <LeftContent>
                <LogoImage src={LogoImageSrc} alt="Logo" />
            </LeftContent>
            <nav>
                <StyledLink to="/">Accueil</StyledLink>
                <StyledLink to="/freelances" >Profils</StyledLink>
                <StyledLink to="/survey/1" $isFullLink>Faire le test</StyledLink>
            </nav>
        </HeaderContainer>
    )
}