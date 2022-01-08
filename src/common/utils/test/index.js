import { render as rtlRender } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { default as themeReducer } from '../../../features/theme/theme'
import { default as freelancesReducer } from '../../../features/freelances'
import { default as surveyReducer } from '../../../features/survey'
import { default as freelanceReducer } from '../../../features/freelance'
import { default as resultsReducer } from '../../../features/results'
import { default as answersReducer } from '../../../features/answers'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

export function render(ui, options) {
    const store = configureStore({
        reducer: {
            theme: themeReducer,
            freelances: freelancesReducer,
            survey: surveyReducer,
            freelance: freelanceReducer,
            results: resultsReducer,
            answers: answersReducer,
        },
    })

    function Wrapper({ children }) {
        return (
            <MemoryRouter {...options}>
                <Provider store={store}>{children}</Provider>
            </MemoryRouter>
        )
    }
    rtlRender(ui, { wrapper: Wrapper })
}