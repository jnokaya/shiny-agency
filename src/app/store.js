import { default as themeReducer } from "../features/theme/theme";
import { default as freelancesReducer } from '../features/freelances/freelances.reducer'
import { default as freelanceReducer } from '../features/freelance/freelance.reducer'
import { default as surveyReducer } from '../features/survey/survey.reducer'
import { default as answerReducer } from '../features/anwsers'
import { default as resultsReducer } from '../features/results'

import { configureStore } from '@reduxjs/toolkit'

//debug tool
// const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// export const store = createStore(reducer, reduxDevtools)

// store.subscribe(() => {
//     console.log("Nouveau state:")
//     console.log(store.getState())
// })

const store = configureStore({
    reducer: {
        theme: themeReducer,
        freelances: freelancesReducer,
        freelance: freelanceReducer,
        survey: surveyReducer,
        answers: answerReducer,
        results: resultsReducer
    }
})

store.subscribe(() => {
    console.log("Nouveau state:")
    console.log(store.getState())
})

export default store