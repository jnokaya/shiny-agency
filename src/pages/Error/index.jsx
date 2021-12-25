
import Error404ImageSrc from "../../assets/404.svg"
import styled from "styled-components"

const ErrorPageContainer = styled.div.attrs(props => ({ className: 'page borderBoxSizing' }))`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
`
const Text = styled.span`
    padding: 20px;
    font-size: 31px;
`

export default function Error(){
    return (
        <ErrorPageContainer>
            <Text>Oups...</Text>
            <img src={Error404ImageSrc} alt="404: La page n'existe pas" />
            <Text>Il semblerait qu'il y ait un problème...</Text>
        </ErrorPageContainer>        
    )
}