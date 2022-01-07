import styled from 'styled-components'
import DarkModeButton from '../../../features/darkMode/DarkModeButton'

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 60px 0 60px 0;
    width: -webkit-fill-available;
`

export default function Footer() {
    return (
        <FooterContainer>
            <DarkModeButton />
        </FooterContainer>
    )
}