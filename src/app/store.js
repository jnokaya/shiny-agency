import { combineReducers, createStore } from "redux";
import { default as themeReducer } from "../features/theme/theme.reducer";
import { default as freelancesReducer } from '../features/freelances/freelances.reducer'

let reducer = combineReducers({
    theme: themeReducer,
    freelances: freelancesReducer
})

//debug tool
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(reducer, reduxDevtools)

store.subscribe(() => {
    console.log("Nouveau state:")
    console.log(store.getState())
})