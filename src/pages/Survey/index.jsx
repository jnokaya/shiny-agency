import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/style/colors"
import { Loader } from "../../utils/style/Atoms"

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
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`
export default function Survey() {
    let { questionNumber } = useParams()
    questionNumber = Number.parseInt(questionNumber)
    const [questions, setQuestions] = useState({})
    const [isDataLoading, setDataLoading] = useState(false)
    useEffect(() => {
        setDataLoading(true)
        fetch(`http://localhost:8000/survey`)
            .then((response) => response.json())
            .then(({ surveyData }) => {
                setQuestions({ ...surveyData })
                setDataLoading(false)
            })
            .catch((error) => console.log(error))
    }, [])
    return (
        <SurveyContainer>
            <QuestionTitle>Question {questionNumber}</QuestionTitle>
            {isDataLoading ? (
                <Loader />
            ) : (
                <QuestionContent>{questions[questionNumber]}</QuestionContent>
            )}
            <LinkWrapper>
                {questionNumber >= 1 && (<Link to={`/survey/${questionNumber - 1}`}>Question précédente</Link>)}
                {questions[questionNumber + 1] ? (
                    <Link to={`/survey/${questionNumber + 1}`}>Question suivante</Link>
                ) : (
                    <Link to="/results">Résultats</Link>
                )}
            </LinkWrapper>
        </SurveyContainer>
    )
}