import Card from "../../components/Card"
import styled from "styled-components"
import colors from "../../utils/style/colors"
import { Loader } from "../../utils/style/Atoms"
import ErrorPopup from "../../components/ErrorPopup"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectTheme } from "../../utils/selector"
import { useQuery } from 'react-query'

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
const CustomizedLink = styled(Link)`
    text-decoration: none;
    height: -webkit-fill-available;
`
export default function Freelances() {
    const theme = useSelector(selectTheme)
    const { data, isLoading, error } = useQuery('freelances', async () => {
        const response = await fetch('http://localhost:8000/freelances')
        const data = await response.json()
        return data
    })
    const freelancersList = data?.freelancersList
    return (
        error ? (
            <ErrorPopup />
        ) : (
            <FreelancesContainer>
                <h1>Trouvez votre prestataire</h1 >
                <StyledH2>Chez Shiny nous réunissons les meilleurs profils pour vous</StyledH2>
                {
                    isLoading ? (
                        <Loader data-testid="loader" />
                    ) : (
                        <CardsContainer>
                            {freelancersList.map(({ name, job, picture, id }, index) => (
                                <CustomizedLink to={`/profile/${id}`} key={`${name}-${index}`}>
                                    <Card label={job} picture={picture} title={name} theme={theme} />
                                </CustomizedLink>
                            ))}
                        </CardsContainer>
                    )
                }
            </FreelancesContainer >
        )
    )
}