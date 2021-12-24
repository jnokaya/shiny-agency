import DefaultPicture from "../../assets/profile.png"
import Card from "../../components/Card"
import styled from "styled-components"
import colors from "../../utils/style/colors"

const freelanceProfiles = [
    {
        name: 'Jane Doe',
        jobTitle: 'Devops',
        picture: DefaultPicture,
    },
    {
        name: 'John Doe',
        jobTitle: 'Developpeur frontend',
        picture: DefaultPicture,
    },
    {
        name: 'Jeanne Biche',
        jobTitle: 'Développeuse Fullstack',
        picture: DefaultPicture,
    },
]

const FreelancesContainer = styled.div.attrs(props=>({className: 'page borderBoxSizing'}))`
    margin: 0 25% 0 25%;
    padding: 50px 0 0 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-around;
`

const StyledH2 = styled.h2`
    color: ${colors.subTitleGrey};
    font-size: 20px;
    padding: 0 0 100px 0;
`

const CardsContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-rows: 350px 350px;
    grid-template-columns: repeat(2, 1fr);
`
export default function Freelances() {
    return (
        <FreelancesContainer>
            <h1>Trouvez votre prestataire</h1>
            <StyledH2>Chez Shiny nous réunissons les meilleurs profils pour vous</StyledH2>
            <CardsContainer>
                {freelanceProfiles.map(({ name, jobTitle, picture }, index) => (
                    <Card key={`${name}-${index}`} label={jobTitle} picture={picture} title={name} />
                ))}
            </CardsContainer>
        </FreelancesContainer>
    )
}