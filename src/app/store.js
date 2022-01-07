import { combineReducers, createStore } from "redux";
import { darkThemeReducer } from "../features/theme/theme.reducer";

let reducer = combineReducers({
    theme: darkThemeReducer
})

//debug tool
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(reducer, reduxDevtools)

store.subscribe(() => {
    console.log("Nouveau state:")
    console.log(store.getState())
})