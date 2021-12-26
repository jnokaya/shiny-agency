import { useContext, useState, useEffect } from "react"
import { SurveyContext } from "../../utils/context"
import styled from "styled-components"
import ErrorPopup from "../../components/ErrorPopup"
import { Loader } from "../../utils/style/Atoms"

const ResultsContainer = styled.div.attrs(props => ({ className: 'page' }))`
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function Results() {
    const { answers } = useContext(SurveyContext)
    const [isDataLoading, setDataLoading] = useState(false)
    // const [results, setResults] = useState([])
    const [isError, setError] = useState(false)

    // useEffect(() => {
    //     setDataLoading(true)
    //     fetch('http://localhost:8000/results')
    //         .then(response => response.json())
    //         .then(({ resultData }) => {
    //             setResults(resultData)
    //             setDataLoading(false)
    //         })
    //         .catch(error => setError(true))
    // }, [])
    return (
        isError ? (
            <ErrorPopup />
        ) : (
            <ResultsContainer>
                {isDataLoading ? (
                    <Loader />
                ) : (
                    <ul>
                        {Object.keys(answers).map((i) =>
                            (<li key={`answers-${i}`}>Question {i} : {answers[i] ? 'Oui' : 'Non'}</li>)
                        )}
                    </ul>
                )}
            </ResultsContainer>
        )
    )
}