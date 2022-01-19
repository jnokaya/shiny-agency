import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/style/colors"
import { Loader } from "../../utils/style/Atoms"
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup"
import { useDispatch, useSelector } from "react-redux"
import { selectAnswers, selectTheme } from "../../utils/selector"
import { set } from "../../../features/answers"
import { useQuery } from 'react-query'

const SurveyContainer = styled.div.attrs(props => ({ className: 'page borderBoxSizing' }))`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export default function Survey() {
  let { questionNumber } = useParams()
  questionNumber = Number.parseInt(questionNumber)
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const { data, isLoading, error } = useQuery('survey', async () => {
    const response = await fetch('http://localhost:8000/survey')
    const data = await response.json()
    return data
  })
  const surveyData = data?.surveyData
  const answers = useSelector(selectAnswers)
  function saveReply(answer) {
    dispatch(set(questionNumber, answer))
  }
  if (error) return (<ErrorPopup />)
  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isLoading ? (
        <Loader />
      ) : (
        <QuestionContent>{surveyData && surveyData[questionNumber]}</QuestionContent>
      )}
      <ReplyWrapper>
        <ReplyBox
          onClick={() => saveReply(true)}
          isSelected={answers[questionNumber] === true}
        >
          Oui
        </ReplyBox>
        <ReplyBox
          onClick={() => saveReply(false)}
          isSelected={answers[questionNumber] === false}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>
      <LinkWrapper $isDarkMode={theme === 'dark'}>
        {questionNumber >= 1 && (<Link to={`/survey/${questionNumber - 1}`}>Question précédente</Link>)}
        {surveyData && surveyData[questionNumber + 1] ? (
          <Link to={`/survey/${questionNumber + 1}`}>Question suivante</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}