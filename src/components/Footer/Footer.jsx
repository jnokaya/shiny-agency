import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useTheme } from '../../utils/hooks'

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 60px 0 60px 0;
    width: -webkit-fill-available;
`

const NightModeButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : colors.secondary};
`

export default function Footer() {
    const { theme, toggleTheme } = useTheme()
    return (
        <FooterContainer>
            <NightModeButton onClick={() => toggleTheme()} $isDarkMode={theme === 'light' ? false : true}>Changer de mode à <strong>{theme === 'light' ? `nuit` : `jour`}</strong></NightModeButton>
        </FooterContainer>
    )
}