import styled from 'styled-components'
import colors from '../../utils/style/colors'
import ErrorPopup from '../../components/ErrorPopup'
import { Loader } from '../../utils/style/Atoms'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchFreelance } from "../../../features/freelance/freelance.reducer"
import { selectFreelance, selectTheme } from "../../utils/selector"
import { STATUS } from '../../../features/freelances/freelances.reducer'
import surveyReducer from '../../../features/survey/survey.reducer'

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 90px 0;
  margin: 0 90px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

const Picture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`

const Title = styled.h1`
  font-size: 25px;
  margin: 0;
  font-weight: 500;
`

const JobTitle = styled.h2`
  padding-top: 10px;
  font-size: 20px;
  margin: 0;
  font-weight: 500;
`

const Location = styled.span`
  margin-left: 15px;
  color: ${colors.secondary};
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Price = styled.span`
  padding-top: 10px;
  font-weight: 500;
  font-size: 20px;
`

const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
`

const Skill = styled.span`
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
  border: 1px solid
    ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

const Availability = styled.span`
  &:before {
    position: absolute;
    left: 0;
    top: 4px;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${({ available }) => (available ? 'green' : 'red')};
    content: '';
  }
  padding-left: 20px;
  position: relative;
`

export default function Profile() {
  const dispatch = useDispatch()
  const queryId = useParams().id
  useEffect(() => {
    dispatch(fetchFreelance(queryId))
  }, [dispatch, queryId])
  const freelance = useSelector(selectFreelance(queryId))
  const isLoading = [STATUS[0], STATUS[1], STATUS[4]].indexOf(freelance.status) >= 0 && surveyReducer.data
  const error = freelance.status === STATUS[3]
  const { picture, name, location, tjm, job, skills, available, id } = freelance.data ? freelance.data.freelanceData : {}

  const theme = useSelector(selectTheme)
  return error ? (
    <ErrorPopup />
  ) : (
    isLoading || !freelance.data ? (
      <ProfileWrapper theme={theme}>
        <Loader />
      </ProfileWrapper>
    ) : (
      <ProfileWrapper theme={theme}>
        <Picture src={picture} alt={name} height={150} width={150} />
        <ProfileDetails theme={theme}>
          <TitleWrapper>
            <Title>{name}</Title>
            <Location>{location}</Location>
          </TitleWrapper>
          <JobTitle>{job}</JobTitle>
          <SkillsWrapper>
            {skills &&
              skills.map((skill) => (
                <Skill key={`skill-${skill}-${id}`} theme={theme}>
                  {skill}
                </Skill>
              ))}
          </SkillsWrapper>
          <Availability available={available}>
            {available ? 'Disponible maintenant' : 'Indisponible'}
          </Availability>
          <Price>{tjm} € / jour</Price>
        </ProfileDetails>
      </ProfileWrapper>
    )
  )
}