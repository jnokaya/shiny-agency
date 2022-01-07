import { combineReducers, createStore } from "redux"
const initialState = {
    darkMode: false
}
const reducer = combineReducers({
    darkMode: darkModeReducer
})
export const store = createStore(reducer, initialState)