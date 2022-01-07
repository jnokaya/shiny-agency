import { combineReducers, createStore } from "redux";
import { darkThemeReducer } from "../features/darkMode/theme";

const reducer = combineReducers({
    darkMode: darkThemeReducer
})
export const store = createStore(reducer)

store.subscribe(() => {
    console.log("Nouveau state:")
    console.log(store.getState())
})