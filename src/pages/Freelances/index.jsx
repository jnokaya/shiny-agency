import DefaultPicture from "../../assets/profile.png"
import Card from "../../components/Card"
import styled from "styled-components"

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
const CardsContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-rows: 350px 350px;
    grid-template-columns: repeat(2, 1fr);
`
export default function Freelances() {
    return (
        <div>
            <h1>Freelances</h1>
            <CardsContainer>
                {freelanceProfiles.map(({ name, jobTitle, picture }, index) => (
                    <Card key={`${name}-${index}`} label={jobTitle} picture={picture} title={name} />
                ))}
            </CardsContainer>
        </div>
    )
}