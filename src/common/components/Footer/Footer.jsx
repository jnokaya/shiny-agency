import styled from 'styled-components'
import DarkModeButton from '../../../features/theme/DarkModeButton'
import EmailInput from '../EmailInput'

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0 60px 0;
    width: -webkit-fill-available;
`

export default function Footer() {
    return (
        <FooterContainer>
            <EmailInput />
            <DarkModeButton />
        </FooterContainer>
    )
}