import Card from "../../components/Card"
import styled from "styled-components"
import colors from "../../utils/style/colors"
import { Loader } from "../../utils/style/Atoms"
import ErrorPopup from "../../components/ErrorPopup"
import { useState, useEffect } from "react"

const FreelancesContainer = styled.div.attrs(props => ({ className: 'page borderBoxSizing' }))`
    padding: 50px 25% 0 25%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-around;
    align-items: center;
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
    const [freelanceProfiles, setFreelanceProfiles] = useState([])
    const [dataLoading, setDataLoading] = useState(false)
    const [isError, setError] = useState(false)

    useEffect(() => {
        setDataLoading(true)
        fetch(`http://localhost:8000/freelances`)
            .then(response => response.json())
            .then(({ freelancersList }) => {
                setFreelanceProfiles([...freelancersList])
                setDataLoading(false)
            })
            .catch((error) => {
                setError(true)
            })
    }, [])

    return (
        isError ? (
            <ErrorPopup />
        ) : (
            <FreelancesContainer>
                <h1>Trouvez votre prestataire</h1 >
                <StyledH2>Chez Shiny nous réunissons les meilleurs profils pour vous</StyledH2>
                {
                    dataLoading ? (
                        <Loader />
                    ) : (
                        <CardsContainer>
                            {freelanceProfiles.map(({ name, job, picture }, index) => (
                                <Card key={`${name}-${index}`} label={job} picture={picture} title={name} />
                            ))}
                        </CardsContainer>
                    )
                }
            </FreelancesContainer >
        )
    )
}