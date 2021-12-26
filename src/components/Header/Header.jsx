import { Link } from "react-router-dom"
import styled from "styled-components"
import { useContext } from "react"
import { ThemeContext } from "../../utils/context"
import colors from "../../utils/style/colors"

import DarkLogoImageSrc from "../../assets/dark-logo.png"
import LightLogoImageSrc from "../../assets/light-logo.png"

const StyledLink = styled(Link).attrs((props) => {
    return { className: `navItem ${props.$isFullLink ? 'fullLink' : ''}` }
})`
    
`
const HeaderContainer = styled.div.attrs(props => ({ className: 'borderBoxSizing' }))`
    position: sticky;
    top: 0px;
    width: -webkit-fill-available;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 2000;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? colors.backgroundDark : colors.backgroundLight};
`
const LeftContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 30px;
`

const LogoImage = styled.img.attrs(({ $isDarkMode }) => {
    return { src: `${$isDarkMode ? LightLogoImageSrc : DarkLogoImageSrc}` }
})`
    height: 70px;
    width: 190px;
`

export default function Header() {
    const { theme } = useContext(ThemeContext)
    return (
        <HeaderContainer $isDarkMode={theme === 'dark'}>
            <LeftContent>
                <LogoImage alt="Logo" $isDarkMode={theme === 'dark'} />
            </LeftContent>
            <nav>
                <StyledLink to="/">Accueil</StyledLink>
                <StyledLink to="/freelances" >Profils</StyledLink>
                <StyledLink to="/survey/1" $isFullLink>Faire le test</StyledLink>
            </nav>
        </HeaderContainer>
    )
}