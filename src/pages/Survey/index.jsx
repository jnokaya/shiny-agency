import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/style/colors"
import { Loader } from "../../utils/style/Atoms"
import { useContext } from "react"
import { SurveyContext } from "../../utils/context"
import { useFetch, useTheme } from '../../utils/hooks'
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup"

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

  const { theme } = useTheme()
  const { answers, saveAnswers } = useContext(SurveyContext)

  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer })
  }

  const { data, isLoading, error } = useFetch('http://localhost:8000/survey')
  const { surveyData } = data
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